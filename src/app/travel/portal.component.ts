import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { MenuItem } from 'primeng/api'

import { CredentialService } from './credential.service'

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  providers: [ CredentialService ],
})
export class PortalComponent implements OnInit {

  departureDate = new Date()
  departureTime = `${this.departureDate.getHours() + 2}:20`

  returnDate = new Date().setDate(new Date().getDate() + 6)

  auDepartureDate = new Date(this.departureDate.getFullYear(), 11, 5)
  auReturnDate = new Date(this.auDepartureDate).setDate(this.auDepartureDate.getDate() + 14)

  checkinOption: MenuItem = {
    icon: 'pi pi-sign-in',
    command: () => { this.showCheckIn() },
  }

  isCheckInVisible = false
  isCheckInVerifyVisible = false
  isCheckInFinaliseVisible = false

  checkInStepIndex = 0

  constructor(
    private credentials: CredentialService,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Lightfoot Traveling')
  }

  signOut() {
    this.router.navigate([ '../travel' ])
  }

  showCheckIn() {
    this.isCheckInVisible = true
    this.isCheckInVerifyVisible = true
    this.checkInStepIndex = 0
  }

  hideCheckIn() {
    this.isCheckInVisible = false
    this.isCheckInVerifyVisible = false
    this.isCheckInFinaliseVisible = false
    this.checkInStepIndex = 0
  }

  finaliseCheckIn() {
    this.hideCheckIn()
  }

  private showCheckInFinalise() {
    this.isCheckInVerifyVisible = false
    this.isCheckInFinaliseVisible = true
    this.checkInStepIndex = 1
  }
}
