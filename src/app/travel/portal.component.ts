import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  tickets = [
    { },
    { },
    { },
    { },
    { },
    { },
  ];

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
