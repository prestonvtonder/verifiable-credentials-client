import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { map, Observable } from 'rxjs'


export type Presentation = { qrCode: SafeHtml, jwe: string, challenge: string }
type Credential = { qrCode: SafeHtml, jwe: string, deepLink: string };
type PresentationResponse = { qrCode: string, jwe: string, challenge: string }
type CredentialResponse = { qrCode: string, jwe: any, deepLink: string };

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  presentation$: Observable<Presentation | null>

  constructor(
    private http: HttpClient,
    private sanitiser: DomSanitizer,
  ) {
    this.presentation$ = this.getCredential()
  }

  private getCredential(): Observable<Presentation> {
    return this.http.post<PresentationResponse>('/api/presentations', { messagingDid: 'did:key:z6Mkg56eqRqaW1wfiiiCcbwJgbLTLV99Z7pFdWrKkkBTPp88', type: 'didauth' }).pipe(
        map(({ qrCode, ...otherProperties }) => ({
          ...otherProperties,
          qrCode: this.sanitiser.bypassSecurityTrustHtml(qrCode)
        })),
    )
  }

  issueCredential(): Observable<Credential> {
    return this.http.post<CredentialResponse>('/api/credentials', { type: 'BoardingPassCredential' }).pipe(
        map(({ qrCode, ...otherProperties }) => ({
          ...otherProperties,
          qrCode: this.sanitiser.bypassSecurityTrustHtml(qrCode)
        })),
    )
  }

  sendMessageToWallet(jwe: any): Observable<void> {
    return this.http.post<void>('/api/messages', { subject: 'did:key:z6MkfFKS7R76qRmGcjuDfQuCRxi9tJzTqvbCYfAPoF4kBy4a', message: jwe });
  }
}
