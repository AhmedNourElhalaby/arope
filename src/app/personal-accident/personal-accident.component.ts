import { OdooService } from 'src/app/shared/odoo.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {SiteSettingsService} from '../shared/site_settings.service';

// FORMATE DATE
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS} from '../date.adapter';
@Component({
  selector: 'app-personal-accident',
  templateUrl: './personal-accident.component.html',
  styleUrls: ['./personal-accident.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class PersonalAccidentComponent implements OnInit {
  breakpoint: number;
  jobs;
  basicCovers;
  optionalCovers;
  isDeath = false;
  isLoading = false;
  isOn = true;
  maxDate: Date;
  minDate: Date;
  type;
  isShow = true;
  constructor(private odoo: OdooService, private router: Router, private site: SiteSettingsService, private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    /* max and min date */
    this.maxDate = this.site.getDateInYears(18);
    this.minDate = this.site.getDateInYears(75);
    /* end max and min date */

    this.activateRouter.paramMap.subscribe(param => {
      console.log('param', param.get('page'));
      if (param.get('page') === 'find-yourjob') {
        this.isOn = false;
      } else if (param.get('page') == null) {
        this.isOn = true;
      }
    });
    this.isShow = false;

    const data = {paramlist: {filter: [],
      need: []}};
    const basicData = {paramlist: {filter: [['basic', '=', true]],
      need: []}};
    const optionalData = {paramlist: {filter: [['basic', '=', false]],
    need: []}};
    this.odoo.call_odoo_function('travel_agency', 'online', 'online',
    'job.table', 'search_read', data ).subscribe(res => {
      this.jobs = res;
    });
    this.odoo.call_odoo_function('travel_agency', 'online', 'online',
    'cover.table', 'search_read', basicData ).subscribe(res => {
      console.log(res);
      this.basicCovers = res;
      this.isShow = true;

    });
    this.odoo.call_odoo_function('travel_agency', 'online', 'online',
    'cover.table', 'search_read', optionalData ).subscribe(res => {
      console.log(res);
      this.optionalCovers = res;
      this.isShow = true;
    });
  }
  onResize(event) {
    console.log('yeah', event);
    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
  }


  submitForm(form: NgForm) {
    const covers = [];
    const tableCovers = [];
    for (const item of this.basicCovers) {
      if (item.id === Number(form.value.type)) {
        tableCovers.push(item.cover_id);
      }
    }
    covers.push(Number(form.value.type));
    for (const cover of this.optionalCovers) {
      if (cover.taken === true) {
        covers.push(cover.id);
        tableCovers.push(cover.cover_id);
      }
    }
    console.log(covers, form.value.job);
    // const covers_id = JSON.stringify(covers);
    // const storageCovers = JSON.stringify(tableCovers);
    const personalAccData = {job_id: form.value.job, sum_insured: form.value.rate};
    localStorage.setItem('personalAccData', JSON.stringify(personalAccData));
    const objCovers = JSON.stringify({name: tableCovers, id: covers});
    localStorage.setItem('covers', objCovers);
    localStorage.setItem('date', this.convertDate(form.value.indAge));
    const data  = {paramlist: {data: {j: form.value.job,
      sum_insured: form.value.rate, cover: covers}}};
    this.odoo.call_odoo_function('travel_agency', 'online', 'online',
  'policy.personal', 'get_qouate', data ).subscribe(res => {
    console.log(res);
    localStorage.setItem('total_price', res.toFixed(2).toString());
    this.router.navigate(['/personal-result']);
  });
  }
  showField(event) {
    const valueField = event.value;
    this.type = valueField;
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
}