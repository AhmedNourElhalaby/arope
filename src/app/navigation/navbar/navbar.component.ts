import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  travel = true;
  personal = false;
  constructor(private router: Router) { }
  ngOnInit() {
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }
  goToPersonalAccident() {
    this.travel = false;
    this.router.navigate(['/personal-accident']);
    this.personal = true;
  }
  goToTravel() {
    this.personal = false;
    this.router.navigate(['']);
    this.travel = true;
  }
}
