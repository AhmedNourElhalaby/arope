import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AgeTravelerComponent } from './ageTraveler.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { WelcomeService } from '../welcome.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.services';
import { OdooService } from '../../shared/odoo.service';
@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css']
})
export class GetQuoteComponent implements OnInit, OnDestroy {
  countries = [];
  isLoading = false;
  maxDate;
  minDate;
  breakpoint: number;
  isIndividual = true;
  agesString: string;
  ageLoadSubs: Subscription;
  loadingSubs: Subscription;
  familyDataString: string;
  checked = true;
  isEgyption = false;
  isActive = true;
  // @Output() change: EventEmitter<MatRadioChange>;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private welcomeService: WelcomeService,
    private uiService: UIService,
    private odoo: OdooService
  ) {}

  ngOnInit() {
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
    console.log('yeah', event);
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

        this.agesString = arr.join(', ');
      }

    });
  }

  showField(event) {
    const valueField = event.value;
    if (valueField === 'family') { this.isIndividual = false; } else { this.isIndividual = true; }
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
      this.saveDataInLocalStorage(form);
      this.welcomeService.sendQuoteResult('get_family', familyData);
    } else {
      const age = this.convertDate(form.value.indAge);
      const data = {paramlist: {data: {z: form.value.zone, d: [age],
      p_from: when, p_to: till}}};
      // const olddata = {paramlist: {zone: {z: form.value.zone}, ages: {d: [age]},
      //  whens: {p_from: when}, tills: {p_to: till} }};
      this.saveDataInLocalStorage(form);
      this.welcomeService.sendQuoteResult('get_individual', data);
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
    const zone = '';
    console.log(form);

    localStorage.setItem('zone', form.value.zone);
    let ageArgs;
    const type = form.value.type;
    let valArgLength = 0;
    if (type === 'individual') {
      ageArgs = form.value.indAge;
      valArgLength = this.typeAges(type, ageArgs).length ;
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
    console.log('yearBirth', localStorage.getItem('age'));
  }

  getAge(dateString) {
    const data = {paramlist: {age: [dateString]}};
    this.odoo.call_odoo_function('travel_agency', 'demo', 'demo', 'policy.travel',
    'calculate_age', data).subscribe(res => {
      const age = res[0];
      localStorage.setItem('age', age.toString());
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();

  }
}

