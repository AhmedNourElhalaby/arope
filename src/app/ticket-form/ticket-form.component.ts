import { MatSnackBar } from "@angular/material";
import { OdooService } from "src/app/shared/odoo.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ValidationService } from "src/app/shared/validation.service";
import { CarInsuranceService } from '../car-insurance/car-insurance.service';

@Component({
  selector: "app-ticket-form",
  templateUrl: "./ticket-form.component.html",
  styleUrls: ["./ticket-form.component.css"]
})
export class TicketFormComponent implements OnInit {
  breakpoint: number;
  isLoading = false;
  mail: boolean;
  isShow = true;
  pageStr: string;
  brand;
  product;
  price;
  brandCar;
  dateOfBirth;
  job;
  sum_insured;
  plan: string;
  constructor(
    private odoo: OdooService,
    private router: Router,
    private validation: ValidationService,
    private routerActivated: ActivatedRoute,
    private carService: CarInsuranceService
  ) {}
  @ViewChild("fInfo", { static: false }) customForm: NgForm;
  ngOnInit() {
    
    this.routerActivated.paramMap.subscribe(paramMap=> {
      this.pageStr = paramMap.get('page');
      if( paramMap.get('page') == 'car-insurance' ) {
        console.log('sdfsdf');
        this.isShow = false;
       
        this.product = paramMap.get('product');
        this.brand = paramMap.get('brand');
        this.price = paramMap.get('price');
        this.brandCar = paramMap.get('brandCar');
      } else if(
        (paramMap.get('page') == 'find-yourjob') 
      ){
       

          this.isShow = true;
         
          this.dateOfBirth = paramMap.get('dateOfBirth');
          this.job = paramMap.get('job');
          this.sum_insured = paramMap.get('sum_insured'); 
       
      }else if(
        paramMap.get('page') == 'medical-insurance'
      ){
        this.isShow = false;
        this.plan = paramMap.get('plan');
      }

      
    })
  }
  submitForm(form: NgForm) {
    let obj;

    if(this.pageStr == 'car-insurance') {
      this.getTicketCar({
        name: form.value.name,
        phone: form.value.prefixNum + form.value.phoneNumber,
        mail: form.value.emailAddress,
        price: Number(this.price),
        brand: this.brandCar,
        product: this.product
      });

    
    } else if(this.pageStr == 'find-yourjob' && this.dateOfBirth &&  this.job && this.sum_insured) {
      console.log('yes');
      this.getTicketOverPrice({
        type: "pa",
        job: this.job,
        name: form.value.name,
        phone: form.value.prefixNum + form.value.phoneNumber,
        mail: form.value.emailAddress,
        sum_insured: Number(this.sum_insured)
      });
    } 
    else if(this.pageStr == 'medical-insurance') {
      this.getTicketMedicalIsurance({
        
        name: form.value.name,
        phone: form.value.prefixNum + form.value.phoneNumber,
        mail: form.value.emailAddress,
        product: this.plan
      });
    }
    else  {
      this.getTicket({
        type: "pa",
        job: form.value.job,
        name: form.value.name,
        phone: form.value.prefixNum + form.value.phoneNumber,
        mail: form.value.emailAddress
      });
    }
  }

  getTicketMedicalIsurance(dataList) {
    const data = {
      paramlist: {
        data: dataList
      }
    };
    this.odoo
      .call_odoo_function(
        "travel_agency",
        "online",
        "online",
        "ticket.api",
        "create_medical_ticket",
        data
      )
      .subscribe(res => {
        console.log('medical insurance', res);
        this.router.navigate(["/thanks"]);
      });
  }

  getTicketOverPrice(dataList) {
    const data = {
      paramlist: {
        data: dataList
      }
    };
    this.odoo
      .call_odoo_function(
        "travel_agency",
        "online",
        "online",
        "ticket.api",
        "create_ticket",
        data
      )
      .subscribe(res => {
        console.log(res);
        this.router.navigate(["/thanks"]);
      });
  }

  getTicket(dataList) {
    const data = {
      paramlist: {
        data: dataList
      }
    };
    this.odoo
      .call_odoo_function(
        "travel_agency",
        "online",
        "online",
        "ticket.api",
        "create_ticket",
        data
      )
      .subscribe(res => {
        console.log(res);
        this.router.navigate(["/thanks"]);
      });
  }

  getTicketCar(data) {
    console.log('ticket data', data);
    this.carService.getTicketCar(data).subscribe(res => {
      if(res) {
        this.router.navigate(["/thanks"]);
      }
    }, error => console.log(error));
  }

  onResize(event) {
   
    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
  }

  // checkMail(val) {


  //   this.validation.checkMail(val).subscribe(res => {
  //     console.log(res);
  //     const key = 'smtp_check';
  //     this.mail = res[key];
  //     console.log(this.mail);
  //   });
  // }

  goBack() {
    this.router.navigateByUrl("/personal-accident");
  }
}
