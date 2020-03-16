import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from './shared/translate-config.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit{
  title = "arope";

  constructor(private translateService: TranslateConfigService) {}

  get lang() { return localStorage.getItem("lang"); }
  currentDir : 'rtl' | 'ltr';
  ngOnInit() {
    this.translateService.setLanguage(this.lang);
    this.translateService.setDefault(this.lang);

    this.currentDir = this.currentDir === 'ltr' ? 'rtl' : 'ltr';

    if(!localStorage.getItem('lang'))
      localStorage.setItem('lang', 'ar'); 

    if(this.lang == 'ar'){
      this.currentDir = 'rtl';
      this.translateService.setDir('rtl');
    }
    else {
      this.currentDir = 'ltr';
      this.translateService.setDir('ltr');
    }
  }

  toggleRTL() {
    this.currentDir = this.currentDir === 'ltr' ? 'rtl' : 'ltr';
  }
}
