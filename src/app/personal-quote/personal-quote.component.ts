import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-quote',
  templateUrl: './personal-quote.component.html',
  styleUrls: ['./personal-quote.component.css']
})
export class PersonalQuoteComponent implements OnInit {
  covers;
  displayedColumns: string[] = ['cover'];
  constructor() { }
  ngOnInit() {
    this.covers = JSON.parse(localStorage.getItem('covers'));
    console.log(this.covers.name);
  }

}
