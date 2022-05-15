import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { finalize, takeWhile } from 'rxjs';

import { QrCodeLoginService } from '../qr-code-login.service';

@Component({
  selector: 'app-doh',
  templateUrl: './doh.component.html',
  styleUrls: [ './doh.component.scss' ],
  providers: [ QrCodeLoginService ],
})
export class DohComponent implements OnInit {

  isSignInVisible = false;

  constructor(
    public login: QrCodeLoginService,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('South African Department of Health')
    this.login.isLoggedIn$.pipe(
      takeWhile(it => !it),
      finalize(() => this.router.navigate([ '/doh/portal' ])),
    ).subscribe()
  }

  showSignIn() {
    this.isSignInVisible = true;
  }
}
