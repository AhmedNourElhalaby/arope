import { WelcomeService } from './../../welcome/welcome.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { SiteSettingsService } from 'src/app/shared/site_settings.service';
import { OdooService } from 'src/app/shared/odoo.service';
import { TravelerService } from '../traveler.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  constructor(
    private setting: SiteSettingsService,
    private odoo: OdooService,
    private welService: WelcomeService,
    private travelerService: TravelerService
  ) {
  }
  numOfTravelers = [];
  types = [
    { value: 'spouse', viewValue: 'Spouse' },
    { value: 'kid', viewValue: 'Kid' }
  ];
  dataJson;
  typesList;
  datesList;
  checked;
  check = true;
  isValidFormSubmitted = false;
  isConfrim = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  @Output() changeStatus = new EventEmitter();



  ngOnInit() {
    const emptyArr = new Array(
      parseInt(localStorage.getItem('numOfTraveler'))
    );

    for (let i = 0; i < emptyArr.length; i++) {

      console.log('count', i);
      this.numOfTravelers.push(i);
   }

    const fJson = JSON.parse(localStorage.getItem('typesDates'));
    this.dataJson = JSON.parse(fJson);
    this.typesList = this.dataJson.types;
    this.datesList = this.dataJson.dates;
  }


  fullNameText(firstName, LastName) {
    return firstName + ' ' + LastName;
  }

  submitTravelerInfo(form: NgForm) {
    console.log(form.value.additionalTravelers);
    this.isValidFormSubmitted = false;
    const age = this.setting.convertDate(form.value.dateBirth);
    const when = this.setting.convertDate(localStorage.getItem('when'));
    const till = this.setting.convertDate(localStorage.getItem('till'));
    console.log(this.emailFormControl);
    if (localStorage.getItem('type') === 'individual') {
      const formData = {data: {
        package: localStorage.getItem('type'),
        c_name: form.value.firstName + ' ' + form.value.lastName,
        add: form.value.address,
        passport_num: form.value.Passport,
        dob: age,
        zone: localStorage.getItem('zone'),
        p_from: when,
        p_to: till,
        family: [],
        id: form.value.id,
        mail: this.emailFormControl.value
      }, key: 'travel'};
      localStorage.setItem('formData', JSON.stringify(formData));
      const data = {paramlist: {data: {z: localStorage.getItem('zone'), d: [age],
        p_from: when, p_to: till}}};
      this.odoo.call_odoo_function('travel_agency', 'demo', 'demo', 'policy.travel',
        'get_individual', data).subscribe(res => {
          const x = res.gross.toFixed(2);
          localStorage.setItem('total_price', x.toString());
          this.changeShowValue();
          this.changeStatus.emit(true);
        });
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
        const lastName = object['tlastName' + index];
        const dateBirth = object['tbirthDate' + index];
        const passports = object['tpassport' + index];
        const fullName = this.fullNameText(firstName, lastName);
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
        package: localStorage.getItem('type'),
        c_name: form.value.firstName + ' ' + form.value.lastName,
        add: form.value.address,
        passport_num: form.value.Passport,
        dob: age,
        zone: localStorage.getItem('zone'),
        p_from: when,
        p_to: till,
        family: familyD,
        mail: this.emailFormControl.value

      }, key: 'travel'};
      localStorage.setItem('formData', JSON.stringify(formData));
      this.odoo.call_odoo_function('travel_agency', 'demo', 'demo', 'policy.travel',
      'get_family', data).subscribe(res => {
        const x = res.gross.toFixed(2);
        localStorage.setItem('total_price', x.toString());
        this.changeShowValue();
        this.changeStatus.emit(true);
      });
      // this.welService.sendQuoteResult('get_family', data);
    }
    this.isValidFormSubmitted = true;
    form.resetForm();
  }

  changeShowValue() {
    this.travelerService.changeStatusShowValue();

  }
}
