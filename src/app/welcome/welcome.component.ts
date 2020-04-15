import { Component, OnInit, AfterViewChecked } from "@angular/core";
declare let Checkout: any;
@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit, AfterViewChecked {
  addScript: boolean = false;

  qnbConfig = {
      merchant: 'TESTQNBAATEST001',
      order: {
          amount: function() {
              //Dynamic calculation of amount
              return 110 + 20;
          },
          currency: 'EGP',
          description: 'Ordered goods',
        id: ''
      },
        interaction: {
          merchant      : {
          name   : 'Your merchant name',
          address: {
                        line1: '200 Sample St',
                        line2: '1234 Example Town'            
          },
          email  : 'order@yourMerchantEmailAddress.com',
          phone  : '+1 123 456 789 012',
          logo   : 'https://imageURL'
          },
          locale        : 'en_US',
          theme         : 'default',
          displayControl: {
              billingAddress  : 'HIDE',
              customerEmail   : 'HIDE',
              orderSummary    : 'SHOW',
              shipping        : 'HIDE'
            }
          }
  };
  constructor() {}
  ngOnInit() {}
  ngAfterViewChecked() {
    // if(!this.addScript) {
    //   this.qnbScript().then(()=> {
        Checkout.configure(this.qnbConfig);
    //   });
    // }
  }

  onClick() {
    Checkout.showLightbox({
      onCancel: function() {
        console.log('error');
      }
    });
  }

  errorCallback() {
    console.log('Payment cancelled');
}
cancelRequest() {
    console.log('Payment cancelled');
}

  qnbScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scriptElement = document.createElement('script');
      scriptElement.src = "https://qnbalahli.test.gateway.mastercard.com/checkout/version/49/checkout.js";
      // scriptElement.setAttribute("data-error", "errorCallback");
      // scriptElement.setAttribute("data-cancel", "cancelRequest");
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

}
