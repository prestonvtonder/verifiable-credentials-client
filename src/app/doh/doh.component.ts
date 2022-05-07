import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doh',
  templateUrl: './doh.component.html',
  styleUrls: [ './doh.component.scss' ]
})
export class DohComponent implements OnInit {

  isSignInVisible = false;

  constructor() { }

  ngOnInit() {
  }

  showSignIn() {
    this.isSignInVisible = true;
  }
}
