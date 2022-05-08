import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-doh',
  templateUrl: './doh.component.html',
  styleUrls: [ './doh.component.scss' ]
})
export class DohComponent implements OnInit {

  isSignInVisible = false;

  constructor(
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('South African Department of Health')
  }

  showSignIn() {
    this.isSignInVisible = true;
  }
}
