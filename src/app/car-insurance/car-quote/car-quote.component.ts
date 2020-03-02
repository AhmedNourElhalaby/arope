import { Component, OnInit } from '@angular/core';
import { Brand } from '../brand.model';
import { CarInsuranceService } from '../car-insurance.service';

@Component({
  selector: 'app-car-quote',
  templateUrl: './car-quote.component.html',
  styleUrls: ['./car-quote.component.css']
})
export class CarQuoteComponent implements OnInit {
  breakpoint;
  brands: Brand[];
  constructor(private carService: CarInsuranceService) { }

  ngOnInit() {
    
    this.brands = this.carService.Brands;
  }


}
