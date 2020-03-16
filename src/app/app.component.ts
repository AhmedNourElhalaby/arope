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

  ngOnInit() {
    this.translateService.setLanguage('en');
    this.translateService.setDefault('en');
  }
}
