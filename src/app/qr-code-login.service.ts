import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { BehaviorSubject, delay, EMPTY, finalize, map, Observable, retry, switchMap, take, takeWhile, tap, timer } from 'rxjs'

import { LoadingService } from './loading.service'



@Injectable({
  providedIn: 'root'
})
export class QrCodeLoginService {

  isLoggedIn$: BehaviorSubject<boolean>
  qrCode$: Observable<SafeHtml>

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private sanitise: DomSanitizer,
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.qrCode$ = this.getQrCode()
  }

  private getQrCode(): Observable<SafeHtml> {
    return this.http.get('/api/presentations?type=didauth', { observe: 'response' }).pipe(
      map(({ body }) => !body ? EMPTY : body as any),
      map(({ qrCode }) => qrCode as string),
      map(it => this.sanitise.bypassSecurityTrustHtml(it)),
      tap(() => this.startPollingToCheckIfUserLoggedIn()),
    )
  }

  private startPollingToCheckIfUserLoggedIn() {
    const afterWating = 1000
    const atInterval = 1000
    timer(afterWating, atInterval).pipe(
      switchMap(_ => this.http.get<any>('/api/presentations/status')),
      map(({ status }) => status !== 'Success'),
      takeWhile(Boolean),
      finalize(() => this.transitionToLoggedInState()),
    ).subscribe()
  }

  private transitionToLoggedInState() {
    this.loading.is$.next(true)
    setTimeout(() => {
      this.loading.is$.next(false)
      this.isLoggedIn$.next(true)
    }, 2000)
  }
}
