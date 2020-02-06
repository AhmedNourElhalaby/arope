import { TravelerService } from './../traveler-info/traveler.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { SiteSettingsService } from '../shared/site_settings.service';
import {ErrorStateMatcher} from '@angular/material/core';

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
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private setting: SiteSettingsService, private travelerService: TravelerService) { }
  matcher = new MyErrorStateMatcher();
  @Output() changeStatus = new EventEmitter();
  ngOnInit() {
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
    form.resetForm();
  }
  changeShowValue() {
    this.travelerService.changeStatusShowValue();
  }

}
