import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from './shared/translate-config.service';
import { Router, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'arope';

  constructor(private translateService: TranslateConfigService, private router: Router) {}

  get lang() { return localStorage.getItem('lang'); }
  currentDir: 'rtl' | 'ltr';
  ngOnInit() {
    this.translateService.setLanguage(this.lang);
    this.translateService.setDefault(this.lang);

    // get segments
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
   // const s: UrlSegment[] = g.segments;
    console.log('save', this.router.url);
    this.router.navigateByUrl('/traveler-insurance');
    if (location.pathname === '/') {
      this.router.navigateByUrl('/traveler-insurance');
      console.log('HERE');
    }


    this.currentDir = this.currentDir === 'ltr' ? 'rtl' : 'ltr';

    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'ar');
    }

    if (this.lang === 'ar') {
      this.currentDir = 'rtl';
      this.translateService.setDir('rtl');
    } else {
      this.currentDir = 'ltr';
      this.translateService.setDir('ltr');
    }
  }

  toggleRTL() {
    this.currentDir = this.currentDir === 'ltr' ? 'rtl' : 'ltr';
  }
}
