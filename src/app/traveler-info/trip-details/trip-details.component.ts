import { WelcomeService } from '../../welcome/welcome.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  zone;
  type;
  age;
  when;
  till;
  numOfTraveler;
  constructor(private welService: WelcomeService, private router: Router) { }

  ngOnInit() {

    const zoneValue = localStorage.getItem('zone');

    const countries = this.welService.getAllCountries();
    countries.forEach(x => {
      if (x.value === zoneValue) {
        this.zone = x.viewValue;
      }
    });

    this.type = localStorage.getItem('type');
    this.age = localStorage.getItem('age');
    this.when = localStorage.getItem('when');
    this.till = localStorage.getItem('till');
    this.numOfTraveler = localStorage.getItem('numOfTraveler');


  }
  get lang() { return localStorage.getItem("lang"); }


  getFromLocalStorage(name: string)  {
    return localStorage.getItem(name);
  }

  onClick() {
    let type = this.getFromLocalStorage('type');
    console.log('type => ', type);
    let dataList = {};
    if(type == 'individual') {
      console.log('Here => ');
      dataList = {
        type: type,
        zone: this.getFromLocalStorage('zone'),
        date: new Date(this.getFromLocalStorage('date')),
        when: new Date(this.getFromLocalStorage('when')),
        till: new Date(this.getFromLocalStorage('till'))
      };
      console.log('Here 2 => ', dataList);
    } else if(type == 'family') {
      let typesDates = JSON.parse(this.getFromLocalStorage('typesDates'));
      let dates;
      if(typesDates) {
        dates = Object.values(JSON.parse(typesDates).dates).join(', ');
      }

      console.log('Dates => ',  dates);
      dataList = {
        type: type,
        zone: this.getFromLocalStorage('zone'),
        dates: dates,
        when: new Date(this.getFromLocalStorage('when')),
        till: new Date(this.getFromLocalStorage('till'))
      };
      console.log('Here 2 => ', dataList);
    }

    console.log('data list  => ', dataList);

   this.router.navigate(['/'], {queryParams: dataList});
  }

}

