import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WelcomeService } from '../../welcome/welcome.service';
import { TravelerService } from '../traveler.service';
import { NgForm } from '@angular/forms';
import { OdooService } from '../../shared/odoo.service';

@Component({
  selector: 'app-price-card-payment',
  templateUrl: './price-card-payment.component.html',
  styleUrls: ['./price-card-payment.component.css']
})
export class PriceCardPaymentComponent implements OnInit {
  totalPrice;
  formList;
  isDisabled = false;

  @Output() clickedDone = new EventEmitter();
  constructor(
    private welService: WelcomeService,
    private travelerService: TravelerService,
    private odoo: OdooService
  ) {}

  ngOnInit() {
    this.formList = this.travelerService.paymentForm;
    console.log('formList', this.formList.cardNumber);
    this.totalPrice = localStorage.getItem('total_price');
    // this.welService.priceLoad.subscribe(result => {
    //   this.totalPrice = result;
    // });

    // this.welService.getValuePrice();
  }

  submitFormPriceCard(form: NgForm) {
    console.log('ay kala,');
    if (form.valid) {
      console.log('ayyy');
      const formData = JSON.parse(localStorage.getItem('formData'));
      const data = { paramlist: {data: formData.data} };
      if (formData.key === 'travel') {
        this.odoo.call_odoo_function(
            'travel_agency',
            'demo',
            'demo',
            'travel.front',
            'create_policy',
            data
          )
          .subscribe(res => {
            console.log('ressss', res);
            this.whenSucceed();
          });
        } else {
      this.odoo.call_odoo_function('travel_agency', 'demo', 'demo',
    'personal.front', 'create_policy', data ).subscribe(res => {
      console.log(res);
      this.whenSucceed();
    });
  }
    }
  }

  whenSucceed() {
    this.clickedDone.emit(true);
    this.isDisabled = true;
    window.scrollTo(0, 0);
  }
}

