import { TravelerService } from './../traveler-info/traveler.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { SiteSettingsService } from '../shared/site_settings.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { ValidationService } from 'src/app/shared/validation.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  isValidFormSubmitted = false;
  isConfrim = false;
  mail: boolean;
  cid: boolean;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private setting: SiteSettingsService, private travelerService: TravelerService, private validation: ValidationService) { }
  @ViewChild('fInfo', {static: false}) customForm: NgForm;
  matcher = new MyErrorStateMatcher();
  maxDate: Date;
  minDate: Date;
  @Output() changeStatus = new EventEmitter();
  ngOnInit() {
    /* max and min date */
    this.maxDate = this.setting.getDateInYears(75);
    this.minDate = this.setting.getDateInYears(18);
    /* end max and min date */
  }
  fullNameText(firstName, LastName) {
    return firstName + ' ' + LastName;
  }

  submitPersonalInfo(form: NgForm) {
    const data = JSON.parse(localStorage.getItem('personalAccData'));
    const sum = data.sum_insured;
    const Job = data.job_id;
    const coversData = JSON.parse(localStorage.getItem('covers'));
    const coversId = coversData.id;
    const formData = {data: {
      c_name: this.fullNameText(form.value.firstName, form.value.lastName),
      mail: this.emailFormControl.value,
      phone: form.value.phoneNumber,
      id: form.value.id,
      sum_insured: sum,
      job: Job,
      cover: coversId
    }, key: 'personal'};
    localStorage.setItem('formData', JSON.stringify(formData));
    this.changeShowValue();
    this.changeStatus.emit(true);
    this.isValidFormSubmitted = true;
    // form.resetForm();
  }
  changeShowValue() {
    this.travelerService.changeStatusShowValue();
  }
  checkMail() {
    // let result = true;
    const email = this.customForm.value.emailAddress;
    this.validation.checkMail(email).subscribe(res => {
      const key = 'smtp_check';
      this.mail = res[key];
    });
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

}
