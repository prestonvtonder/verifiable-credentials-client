import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { BehaviorSubject, EMPTY, finalize, map, Observable, switchMap, takeWhile, tap, timer } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class QrCodeLoginService {

  isLoggedIn$: Observable<boolean>
  qrCode$: Observable<SafeHtml>

  constructor(http: HttpClient, sanitise: DomSanitizer) {
    this.isLoggedIn$ = new BehaviorSubject(false);
    this.qrCode$ = this.getQrCodeUsing(http, sanitise)
  }

  private getQrCodeUsing(http: HttpClient, sanitise: DomSanitizer): Observable<SafeHtml> {
    return http.get('/api/login/qr-code', { observe: 'response' }).pipe(
      map(({ body }) => !body ? EMPTY : body as any),
      map(({ qrCode }) => qrCode as string),
      map(it => sanitise.bypassSecurityTrustHtml(it)),
      tap(() => this.startPollingToCheckIfUserLoggedInUsing(http)),
    )
  }

  private startPollingToCheckIfUserLoggedInUsing(http: HttpClient) {
    const afterWating = 1000
    const atInterval = 1000
    timer(afterWating, atInterval).pipe(
      switchMap(_ => http.get('/api/login/status', { observe: 'response' })),
      map(({ status }) => status !== 200),
      takeWhile(Boolean),
      finalize(() => (this.isLoggedIn$ as BehaviorSubject<boolean>).next(true))
    ).subscribe()
  }
}
