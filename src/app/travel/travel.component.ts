import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { finalize, takeWhile } from 'rxjs';

import { QrCodeLoginService } from '../qr-code-login.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: [ './travel.component.scss' ],
  providers: [ QrCodeLoginService ]
})
export class TravelComponent implements OnInit {

  isSignInVisible = false;

  constructor(
    public login: QrCodeLoginService,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Lightfoot Traveling')
    this.login.isLoggedIn$.pipe(
      takeWhile(it => !it),
      finalize(() => this.router.navigate([ '/travel/portal' ])),
    ).subscribe()
  }

  showSignIn() {
    this.isSignInVisible = true;
  }
}
