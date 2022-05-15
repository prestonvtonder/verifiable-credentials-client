import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CredentialService } from './credential.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  providers: [ CredentialService ],
})
export class PortalComponent implements OnInit {

  events = [
    { status: 'Vaccine Credential Available', date: new Date().toDateString(), icon: 'info-circle', content: 'Your vaccination status is now available as a credential. Scan the QR code below, or click the button, to add it.', credential: true },
    { status: 'Second Dose Received', date: new Date(2021, 10, 6, 8, 37).toDateString(), icon: 'check', content: 'COVID-19 vaccine (Pfizer Inc.) dose with batch number FJ3456 administered and received.' },
    { status: 'Appointment Booked', date: new Date(2021, 9, 25, 12, 51).toDateString(), icon: 'calendar', content: 'Appointment booked at vaccine site 35XGJ for 06/11/21 at 08:25.' },
    { status: 'First Dose Received', date: new Date(2021, 8, 3, 16, 15).toDateString(), icon: 'check', content: 'COVID-19 vaccine (Pfizer Inc.) dose with batch number HD6481 administered and received.' },
    { status: 'Appointment Booked', date: new Date(2021, 7, 15, 10, 1).toDateString(), icon: 'calendar', content: 'Appointment booked at vaccine site 35XGJ for 03/09/21 at 16:00.' }
  ];

  constructor(
    private credentials: CredentialService,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('South African Department of Health')
  }

  signOut() {
    this.router.navigate([ '../doh' ])
  }
}
