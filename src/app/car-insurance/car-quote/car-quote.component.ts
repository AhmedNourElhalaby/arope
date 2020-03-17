import { Component, OnInit } from '@angular/core';
import { Brand } from '../brand.model';
import { CarInsuranceService } from '../car-insurance.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-quote',
  templateUrl: './car-quote.component.html',
  styleUrls: ['./car-quote.component.css']
})
export class CarQuoteComponent implements OnInit {
  breakpoint;
  brands: Brand[];
  constructor(private carService: CarInsuranceService, private router: Router){ }

  ngOnInit() {
    this.brands = this.carService.Brands;
  }

  submitForm(form: NgForm){
    
    if(!form.valid) {
      return;
    }
    console.log(form.value.type, form.value.brand, form.value.price);
    
    this.router.navigate(['/', 'car-insurance','insurance-info', this.carService.getValueBrand(Number(form.value.brandCar)),form.value.brand, form.value.type, form.value.price]);
  }


}
