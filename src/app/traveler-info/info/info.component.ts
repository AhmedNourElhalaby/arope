import { WelcomeService } from './../../welcome/welcome.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators, AbstractControl} from '@angular/forms';
import { SiteSettingsService } from 'src/app/shared/site_settings.service';
import { OdooService } from 'src/app/shared/odoo.service';
import { TravelerService } from '../traveler.service';
import { ValidationService } from 'src/app/shared/validation.service';
// import { saveAs } from 'file-saver';
// FORMATE DATE
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS} from '../../date.adapter';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class InfoComponent implements OnInit {
  constructor(
    private setting: SiteSettingsService,
    private odoo: OdooService,
    private welService: WelcomeService,
    private travelerService: TravelerService,
    private validation: ValidationService,
    private dateAdapter: DateAdapter<Date>
    // private save: saveAs
  ) {
  }
  @ViewChild('fInfo', {static: false}) customForm: NgForm;
  // @ViewChild('fInfo', {static: true}) form: NgForm;
  numOfTravelers = [];
  types = [
    { value: 'spouse', viewValue: 'Spouse' },
    { value: 'kid', viewValue: 'Kid' }
  ];
  minDateKid;
  maxDateKid;
  dataJson;
  typesList;
  datesList;
  checked;
  check = true;
  isValidFormSubmitted = false;
  isConfrim = false;
  mail: boolean;
  type;
  date;
  indi;
  cid: boolean;
  national = 'egyptian';
  isEgyptian: boolean = true;
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  //   // this.checkMailValidator

  // ]);

  // emailFormControl = new FormControl(null, [this.checkMailValidator]);

  matcher = new MyErrorStateMatcher();
  @Output() changeStatus = new EventEmitter();



  ngOnInit() {
    if(this.lang == 'en') {
      this.dateAdapter.setLocale('en');   
    } else if(this.lang == 'ar') {
      this.dateAdapter.setLocale('ar');   
    }
    // this.mail = false;
    // this.checkMail('ahmednourelhalaby@gmail.com');
    this.minDateKid = this.setting.getDateInYears(18);
    this.maxDateKid = this.welService.getMinDateBefore30Days();
    const emptyArr = new Array(
      parseInt(localStorage.getItem('numOfTraveler'))
    );

    for (let i = 0; i < emptyArr.length; i++) {

      console.log('count', i);
      this.numOfTravelers.push(i);
   }
    this.type = localStorage.getItem('type');
    if (this.type === 'individual') {
      this.indi = true;
      this.date = localStorage.getItem('date');
    }
    const fJson = JSON.parse(localStorage.getItem('typesDates'));
    this.dataJson = JSON.parse(fJson);
    this.typesList = this.dataJson.types;
    this.datesList = this.dataJson.dates;
  }

  get lang() { return localStorage.getItem('lang'); }


  fullNameText(firstName, middleName , LastName) {
    return firstName + ' '  + middleName + ' ' + LastName;
  }
  goEmptyDate() {
    const selectElement = document.querySelector('.selectOptionType');
    selectElement.addEventListener('change', (event) => {
      console.log('show event value', event);
    });

  }

  setLocale(val){
    console.log(val);
    this.dateAdapter.setLocale(val); 
  }

  submitTravelerInfo(form: NgForm) {
    console.log(form.value.additionalTravelers);
    this.isValidFormSubmitted = false;
    const age = this.setting.convertDate(form.value.dateBirth);
    const when = this.setting.convertDate(localStorage.getItem('when'));
    const till = this.setting.convertDate(localStorage.getItem('till'));

    const fullName = this.fullNameText(form.value.firstName, form.value.middleName, form.value.lastName);
    localStorage.setItem('fullName', fullName);
    // console.log(this.emailFormControl);
    if (localStorage.getItem('type') === 'individual') {
      const formData = {data: {
        source: 'online',
        package: localStorage.getItem('type'),
        c_name: this.fullNameText(form.value.firstName, form.value.middleName, form.value.lastName),
        add: form.value.address,
        pass: form.value.Passport,
        dob: age,
        gender: form.value.gender,
        phone: form.value.phoneNumber,
        zone: localStorage.getItem('zone'),
        p_from: when,
        p_to: till,
        family: [],
        id: form.value.id,
        mail: form.value.emailAddress
      }, key: 'travel'};
      localStorage.setItem('formData', JSON.stringify(formData));
      const data = {paramlist: {data: {z: localStorage.getItem('zone'), d: [age],
        p_from: when, p_to: till}}};
      this.odoo.call_odoo_function('travel_agency', 'online', 'online', 'policy.travel',
        'get_individual', data).subscribe(res => {
          const x = res.gross.toFixed(2);
          localStorage.setItem('total_price', parseInt(x.toString(), 10).toString());
          this.changeShowValue();
          this.changeStatus.emit(true);
        });
      const caching = {
        fname: form.value.firstName,

        lname: form.value.lastName,
        gender: form.value.gender,
        email: form.value.emailAddress,
        phone: form.value.phoneNumber,

      };
      // this.welService.sendQuoteResult('get_individual', data);
    } else {
      const object = form.value.additionalTravelers;
      const objectKeys = Object.keys(object);
      const objectKeysLen = objectKeys.length / 6;
      let index = 1;
      const emptyArr = [];
      const kidAges = [];
      while (index <= objectKeysLen) {
        const types = object['type' + index];
        const firstName = object['tfirstName' + index];
        const middleName = object['tmiddleName' + index];
        const lastName = object['tlastName' + index];
        const dateBirth = object['tbirthDate' + index];
        const passports = object['tpassport' + index];
        const fullName = ''.concat(' ', firstName, ' ', middleName, ' ', lastName);
        const jsonData = {
          name: fullName,
          dob: dateBirth,
          type: types,
          passport_num: passports
        };
        emptyArr.push(jsonData);
        if (types === 'kid') {
          kidAges.push(dateBirth);
        }

        index ++;
        }
      const data = {paramlist: {data: {z: localStorage.getItem('zone'), p_from: when,
        p_to: till, kid_dob: kidAges}}};
      const familyD = emptyArr;
      const formData = {data: {
        source: 'online',
        package: localStorage.getItem('type'),
        c_name: this.fullNameText(form.value.firstName, form.value.middleName, form.value.lastName),
        add: form.value.address,
        pass: form.value.Passport,
        gender: form.value.gender,
        phone: form.value.phoneNumber,
        dob: age,
        zone: localStorage.getItem('zone'),
        p_from: when,
        p_to: till,
        family: familyD,
        mail: form.value.emailAddress,
        id: form.value.id

      }, key: 'travel'};
      localStorage.setItem('formData', JSON.stringify(formData));
      this.odoo.call_odoo_function('travel_agency', 'online', 'online', 'policy.travel',
      'get_family', data).subscribe(res => {
        const x = res.gross.toString();
        console.log(x);
        // console.log(res);
        localStorage.setItem('total_price', x);
        this.changeShowValue();
        this.changeStatus.emit(true);
      });
      this.welService.sendQuoteResult('get_family', data);
    }
    this.isValidFormSubmitted = true;
    // form.resetForm();
  }

  changeShowValue() {
    this.travelerService.changeStatusShowValue();

  }
  // checkMail() {
  //   // let result = true;
  //   const email = this.customForm.value.emailAddress;
  //   this.validation.checkMail(email).subscribe(res => {
  //     const key = 'smtp_check';
  //     this.mail = res[key];
  //   });
  // }
  convertDate(dateAge) {
    let d = new Date(dateAge),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
  }
  checkId() {
    const dob = this.convertDate(this.customForm.value.dateBirth);
    const id = this.customForm.value.id.toString();
    const dyear = dob.substring(2, 4);
    const idYear = id.substring(1, 3);
    const dmonth = dob.substring(5, 7);
    const dday = dob.substring(8, 10);
    const idMonth = id.substring(3, 5);
    const idDay = id.substring(5, 7);
    if (idYear !== dyear || idMonth !== dmonth || idDay !== dday) {
      this.cid = false;
    } else {
      this.cid = true;
    }
  }
  showField(event) {
    const valueField = event.value;
    if (valueField === 'egyptian') {
      this.isEgyptian = true;

    } else {
      this.isEgyptian = false;
    }
  }

}
