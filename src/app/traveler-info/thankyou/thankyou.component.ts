import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  fullName: string;
  constructor() { }

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName');
  }

}
