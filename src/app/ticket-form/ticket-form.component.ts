import { MatSnackBar } from '@angular/material';
import { OdooService } from 'src/app/shared/odoo.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  breakpoint: number;
  constructor(private odoo: OdooService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  submitForm(form: NgForm) {
    const data = {paramlist: {data: {job: form.value.job,
      name: form.value.name, phone: form.value.phoneNumber}}};
    this.odoo.call_odoo_function('travel_agency', 'demo', 'demo',
    'personal.front', 'create_ticket', data ).subscribe(res => {
      console.log(res);
      this.openSnackBar();
    });
  }
  openSnackBar() {
    this.snackBar.open('We will call you very soon', 'Done', {
      duration: 5000,
    });
  }
  onResize(event) {
    console.log('yeah', event);
    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
  }

}
