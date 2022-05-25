import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { MenuItem } from 'primeng/api'

import { EMPTY, finalize, map, Observable, switchMap, takeWhile, tap, timer } from 'rxjs'

import { CredentialService, Presentation } from './credential.service'
import { LoadingService } from '../loading.service'

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

  presentation$: Observable<Presentation | null> = EMPTY

  isAddToWalletLoading = false

  constructor(
    public credentials: CredentialService,
    private http: HttpClient,
    private loading: LoadingService,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Lightfoot Traveling')
    this.presentation$ = this.credentials.presentation$.pipe(
        tap(it => !!it ? this.startPollingToCheckIfCredentialIsVerified() : null),
    )
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
    this.isAddToWalletLoading = false
  }

  finaliseCheckIn() {
    this.isAddToWalletLoading = true
    this.credentials.issueCredential().pipe(
      switchMap(({ jwe }) => this.credentials.sendMessageToWallet(jwe)),
      finalize(() => this.hideCheckIn()),
    ).subscribe()
  }

  private showCheckInFinalise() {
    this.isCheckInVerifyVisible = false
    this.isCheckInFinaliseVisible = true
    this.checkInStepIndex = 1
  }

  private startPollingToCheckIfCredentialIsVerified() {
    const afterWating = 1000
    const atInterval = 1000
    timer(afterWating, atInterval).pipe(
      switchMap(_ => this.http.get<any>(`/api/presentations/status`)),
      map(({ status }) => status !== 'Success'),
      takeWhile(Boolean),
      finalize(() => this.transitionToVerifiedState()),
    ).subscribe()
  }

  private transitionToVerifiedState() {
    this.loading.is$.next(true)
    setTimeout(() => {
      this.loading.is$.next(false)
      this.showCheckInFinalise()
    }, 2000)
  }
}
