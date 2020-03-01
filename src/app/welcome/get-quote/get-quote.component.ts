import { GroupAgeComponent } from './groupAge.component';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AgeTravelerComponent } from './ageTraveler.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { WelcomeService } from '../welcome.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.services';
import { OdooService } from '../../shared/odoo.service';

// FORMATE DATE
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS} from '../../date.adapter';


@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class GetQuoteComponent implements OnInit, OnDestroy {
  countries = [];
  isLoading = false;
  maxDate;
  minDate;
  breakpoint: number;
  isIndividual = true;
  isFamly = false;
  isGroup = false;
  agesString: string;
  ageLoadSubs: Subscription;
  loadingSubs: Subscription;
  familyDataString: string;
  groupData;
  checked = true;
  isEgyption = false;
  isActive = true;
  groupAge;
  priceValue;

  formFields = {
    typeTraveler : 'individual',
    dates: '',
    zone: '',
    date: '',
    when: '',
    till: ''
  };






  // @Output() change: EventEmitter<MatRadioChange>;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private welcomeService: WelcomeService,
    private uiService: UIService,
    private odoo: OdooService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get query params
    this.route.queryParamMap.subscribe(paramMap => {
      if (!paramMap.has('type')) {
        return;
      }

      if (paramMap.get('type') === 'individual') {
        this.formFields.typeTraveler = paramMap.get('type');
        this.formFields.date = this.convertDate(paramMap.get('date'));
        this.isFamly = false;
        this.isIndividual = true;

      } else if (paramMap.get('type') === 'family') {
        this.formFields.typeTraveler = paramMap.get('type');
        this.formFields.dates = paramMap.get('dates');
        this.isFamly = true;
        this.isIndividual = false;
        this.familyDataString = localStorage.getItem('typesDates');
      }
      console.log('dates ==> ', paramMap.get('dates'));
      this.formFields.zone = paramMap.get('zone');
      this.formFields.date = this.convertDate(paramMap.get('date'));
      this.formFields.till = this.convertDate(paramMap.get('till'));
      this.formFields.when = this.convertDate(paramMap.get('when'));
    });

    this.breakpoint = window.innerWidth <= 700 ? 1 : 2;
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() - 0);
    this.minDate = this.welcomeService.getMinDateBefore30Days();

    this.loadingSubs = this.uiService.loadingChangedStatus.subscribe(res => {
      this.isLoading = res;
    });

    this.countries = this.welcomeService.getAllCountries();
  }




  onResize(event) {

    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
  }

  showPopup() {
    console.log(this.familyDataString);
    const dialogRef = this.dialog.open(AgeTravelerComponent, {
      data : {
        datesList: this.familyDataString
      },


      width: '550px',

    });
    dialogRef.afterClosed().subscribe(result => {

      const arr = [];
      this.familyDataString = JSON.stringify(this.welcomeService.getListDates());
      if (this.familyDataString) {
        const new_json = JSON.parse(this.welcomeService.getListDates());
        for (const i in new_json.dates) {
          arr.push(new_json.dates[i]);
        }

        this.formFields.dates = arr.join(', ');
      }

    });
  }
  showGrpupPopup() {
    console.log(this.groupData);
    const dialogRef = this.dialog.open(GroupAgeComponent, {
      data : {
        sizesList: this.groupData
      },


      width: '550px',

    });
    dialogRef.afterClosed().subscribe(result => {
      this.groupData = JSON.stringify(this.welcomeService.getListDates());
      let data = 0;
      if (this.groupData) {
        const new_json = JSON.parse(this.welcomeService.getListDates());
        for (const i in new_json.sizes) {
          data += Number(new_json.sizes[i]);
        }
        this.groupAge = String(data);
      }

    });
  }

  showField(event) {
    const valueField = event.value;
    if (valueField === 'family') { this.isIndividual = false; } else { this.isIndividual = true; }
    if (valueField === 'family') {
      this.isIndividual = false;
      this.isFamly = true;
      this.isGroup = false;
    } else if (valueField === 'group') {
      this.isIndividual = false;
      this.isFamly = false;
      this.isGroup = true;
    } else if (valueField === 'individual') {
      this.isIndividual = true;
      this.isFamly = false;
      this.isGroup = false;
    }
  }

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

  convertDateForDatePicker(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [day, month, year].join('/');
  }

  submitForm(form: NgForm) {
    const when = this.convertDate(form.value.dateWhen);
    const till = this.convertDate(form.value.dateTill);
    if (form.value.type === 'family') {
      const object = JSON.parse(this.welcomeService.getListDates());
      const data = [];
      const list = Object.values(object.types);
      let i = 1;
      for (const val of list) {
        if (val === 'kid') {
              const list2 = object.dates['date-' + i];
              data.push(list2);
            }
        i ++;
        }
      // console.log(data);
      const familyData = {paramlist: {data: {z: form.value.zone, p_from: when,
      p_to: till, kid_dob: data}}};
      // const oldfamilyData = {paramlist: {zone: {z: form.value.zone}, whens: {p_from: when},
      //  tills: {p_to: till}, ages: {kid_dob: data} }};
      this.saveDataInLocalStorage(form).then(res =>
        this.welcomeService.sendQuoteResult('get_family', familyData)
      );
    } else if (form.value.type === 'individual') {
      const age = this.convertDate(form.value.indAge);
      const data = {paramlist: {data: {z: form.value.zone, d: [age],
      p_from: when, p_to: till}}};
      // const olddata = {paramlist: {zone: {z: form.value.zone}, ages: {d: [age]},
      //  whens: {p_from: when}, tills: {p_to: till} }};
      this.saveDataInLocalStorage(form).then(res =>
        this.welcomeService.sendQuoteResult('get_individual', data)
      );
    } else if (form.value.type === 'group') {
      const object = JSON.parse(this.welcomeService.getListDates());
      const groups = [];
      const listSizes = Object.values(object.sizes);
      // const listAges = Object.values(object.ranges);
      let i = 0;
      for (const val of listSizes) {
        const list2 = {size: Number(object.sizes['size-' + i]), age: object.ranges['range-' + i]};
        groups.push(list2);
        i ++;
      }
      const data = {paramlist: {data: {zone: form.value.zone, p_from: when, p_to: till,
      group: groups}}};
      // this.saveDataInLocalStorage(form);
      // this.odoo.call_odoo_function('travel_agency', 'online', 'online', 'policy.travel',
      // 'get_group', data).subscribe(res => {
      //   console.log(res);
      // });
      localStorage.setItem('type', form.value.type);
      this.odoo.call_odoo_function('travel_agency', 'online', 'online', 'policy.travel',
      'get_group', data).subscribe(res => {
        const x = res.gross;
        console.log(res);
        localStorage.setItem('total_price', parseInt(x.toString(), 10).toString());
        const groubLocal = JSON.stringify(groups);
        localStorage.setItem('groupMembers', groubLocal);
        localStorage.setItem('groupDetails', groubLocal);
        this.priceValue = res;
        this.uiService.loadingChangedStatus.next(false);
        this.router.navigate(['/group-travel']);
     }, error => this.welcomeService.handleError(error.statusText));
    }
  }

  typeAges(type: string, ageArgs) {
    if (type === 'individual') {
      return [this.convertDate(ageArgs)];
   } else {
      return ageArgs.split(', ');
   }
  }

  saveDataInLocalStorage(form) {
    return new Promise((resolve, reject) => {
      const zone = '';
      console.log(form);

      localStorage.setItem('zone', form.value.zone);
      let ageArgs;
      const type = form.value.type;
      let valArgLength = 0;
      if (type === 'individual') {
        ageArgs = form.value.indAge;
        valArgLength = this.typeAges(type, ageArgs).length ;
        localStorage.setItem('date', this.convertDate(form.value.indAge));
      } else {
        ageArgs = form.value.familyAges;
        valArgLength = this.typeAges(type, ageArgs).length;
        localStorage.setItem('typesDates', form.value.types);
      }
      const valArgs = this.typeAges(type, ageArgs);
      localStorage.setItem('type', type);

      this.getAge(valArgs[0]);

      localStorage.setItem('numOfTraveler', valArgLength.toString());

      localStorage.setItem('when', form.value.dateWhen);
      localStorage.setItem('till', form.value.dateTill);

      if (form.value.numOfGroup) {
        localStorage.setItem('numOfGroup', form.value.numOfGroup);
      }


      console.log('yearBirth', localStorage.getItem('age'));
      resolve();
    });
  }

  getAge(dateString) {
    const data = {paramlist: {age: [dateString]}};
    this.odoo.call_odoo_function('travel_agency', 'online', 'online', 'policy.travel',
    'calculate_age', data).subscribe(res => {
      const age = res[0];
      localStorage.setItem('age', age.toString());
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();

  }
}
