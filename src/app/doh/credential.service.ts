import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { map, Observable } from 'rxjs';

type Credential = { qrCode: SafeHtml, jwe: string, deepLink: string };
type CredentialResponse = { qrCode: string, jwe: string, deepLink: string };

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  issue$: Observable<Credential | null>;

  constructor(
    private http: HttpClient,
    private sanitiser: DomSanitizer,
  ) {
    this.issue$ = this.getIssuedCredential()
  }

  private getIssuedCredential(): Observable<Credential> {
    return this.http.post<CredentialResponse>('/api/credentials', { type: 'VaccineCertificate' }).pipe(
        map(({ qrCode, ...otherProperties }) => ({
          ...otherProperties,
          qrCode: this.sanitiser.bypassSecurityTrustHtml(qrCode)
        })),
    )
  }
}
