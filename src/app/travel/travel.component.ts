import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: [ './travel.component.scss' ]
})
export class TravelComponent implements OnInit {

  isSignInVisible = false;

  constructor() { }

  ngOnInit() {
  }

  showSignIn() {
    this.isSignInVisible = true;
  }
}
