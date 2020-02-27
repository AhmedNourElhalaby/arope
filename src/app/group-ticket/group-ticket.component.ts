import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OdooService } from 'src/app/shared/odoo.service';
import { Router } from '@angular/router';
import { group } from '@angular/animations';
import { ValidationService } from 'src/app/shared/validation.service';


@Component({
  selector: 'app-group-ticket',
  templateUrl: './group-ticket.component.html',
  styleUrls: ['./group-ticket.component.css']
})
export class GroupTicketComponent implements OnInit {
  breakpoint;
  isLoading = false;
  mail: boolean;
  constructor(private odoo: OdooService, private router: Router, private validation: ValidationService) { }
  @ViewChild('fInfo', {static: false}) customForm: NgForm;
  ngOnInit() {
  }
  submitForm(form: NgForm) {
    const groups = JSON.parse(localStorage.getItem('groupMembers'));
    const data = {paramlist: {data: {group: groups, type: 'travel',
      name: form.value.name, phone: form.value.prefixNum + form.value.phoneNumber, mail: form.value.emailAddress}}};
    this.odoo.call_odoo_function('travel_agency', 'online', 'online',
    'ticket.api', 'create_ticket', data ).subscribe(res => {
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

}
