import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  departureDate = new Date();
  departureTime = `${this.departureDate.getHours() + 2}:20`;

  returnDate = new Date().setDate(new Date().getDate() + 6);

  auDepartureDate = new Date(this.departureDate.getFullYear(), 11, 5);
  auReturnDate = new Date(this.auDepartureDate).setDate(this.auDepartureDate.getDate() + 14);

  checkinOption = { icon: 'pi pi-sign-in', command: () => { } };

  constructor(
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Lightfoot Traveling')
  }

  signOut() {
    this.router.navigate([ '../travel' ])
  }
}
