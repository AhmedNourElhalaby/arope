import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarInsuranceService } from '../car-insurance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/shared/ui.services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insurance-info',
  templateUrl: './insurance-info.component.html',
  styleUrls: ['./insurance-info.component.css']
})
export class InsuranceInfoComponent implements OnInit, OnDestroy {
  objCovers;
  displayedColumns: string[] = ['cover'];
  loadResObjExcessSub;
  isLoading = false;
  isLoadingSubs: Subscription;
  totalPrice;
  loadPriceSub;
  type;
  brand;
  price;
  brandCar;
  direction: 'rtl' | 'ltr';
  constructor(private http: HttpClient ,private carService: CarInsuranceService, private route: ActivatedRoute, private router: Router, private uiService: UIService) { }

  ngOnInit(){
    
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('brand') && !paramMap.has('product') && !paramMap.has('price')) {
        this.router.navigate(['car-insurance']);
        return;
      }
      
      this.brandCar = paramMap.get('brandCar');
      this.type = paramMap.get('product');
      this.brand = paramMap.get('brand');
      this.price = paramMap.get('price');
      
      
    });
    this.isLoadingSubs = this.uiService.loadingChangedStatus.subscribe(res => {
      this.isLoading = res;
    });

    this.carService.loadCovers.subscribe(covers=> {
      this.objCovers = covers;
    });
    this.carService.getCovers(this.type);
    this.loadPriceSub = this.carService.loadPrice.subscribe(res => {

      this.totalPrice = res;
    });
    const data = {
      paramlist: {
        data: {brand: this.brand, product: this.type, price: parseInt(this.price)}
      }
    };
    this.carService.sendPriceAndGetPrice(data);

    if(this.lang == 'en') {
      this.direction="ltr";
    } else {
      this.direction = "rtl";
    }
  }

  get lang() { return localStorage.getItem("lang"); }


  ngOnDestroy() {
    if(this.loadPriceSub) this.loadPriceSub.unsubscribe();
    if(this.isLoadingSubs) this.isLoadingSubs.unsubscribe();
  }

}
