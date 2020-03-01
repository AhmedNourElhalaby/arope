import { MatSnackBar } from '@angular/material';
import { OdooService } from 'src/app/shared/odoo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/shared/validation.service';


@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  breakpoint: number;
  isLoading = false;
  mail: boolean;
  constructor(private odoo: OdooService, private router: Router, private validation: ValidationService) { }
  @ViewChild('fInfo', {static: false}) customForm: NgForm;
  ngOnInit() {
  }
  submitForm(form: NgForm) {
    const data = {paramlist: {data: {type: 'pa', job: form.value.job,
      name: form.value.name, phone: form.value.prefixNum + form.value.phoneNumber, mail: form.value.emailAddress}}};
    this.odoo.call_odoo_function('travel_agency', 'online', 'online',
    'ticket.api', 'create_ticket', data ).subscribe(res => {
      console.log(res);
      this.router.navigate(['/thanks']);
    });
  }
  onResize(event) {
    console.log('yeah', event);
    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
  }
  checkMail() {
    // let result = true;
    const email = this.customForm.value.emailAddress;
    this.validation.checkMail(email).subscribe(res => {
      const key = 'smtp_check';
      this.mail = res[key];
    });
  }

  goBack() {
    this.router.navigateByUrl("/personal-accident");
  }
}
