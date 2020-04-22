import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  fullName: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName');
    
  }

  back_to_home() {
    this.router.navigate(['/', 'traveler-insurance']).then(() => {
      let myItem = localStorage.getItem('lang');
      localStorage.clear();
      localStorage.setItem('lang', myItem);
  
      let script = document.querySelector("#myscript");
      script.removeAttribute("data-complete");
    });
  }

}
