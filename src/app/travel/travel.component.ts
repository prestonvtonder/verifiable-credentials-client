import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: [ './travel.component.scss' ]
})
export class TravelComponent implements OnInit {

  isSignInVisible = false;

  constructor(
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Lightfoot Traveling')
  }

  showSignIn() {
    this.isSignInVisible = true;
  }
}
