import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { delay, EMPTY, from, map, Observable, of } from "rxjs";

import { simulated } from "./simulated-value";

const { qrCode } = simulated;

type CheckRequest = (request: HttpRequest<any>) => boolean;
type SimulateRequest = (request: HttpRequest<any>) => Observable<HttpEvent<any>>;

const SIMULATE_AFTER = 2000 //ms

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isApi(request)) return simulate(request)
    else return next.handle(request)
  }
}

const isApi: CheckRequest =
    request => request.url.startsWith('/api')

const simulate: SimulateRequest =
    request => {
      if (isQrCodeLogin(request)) return simulateQrCodeLogin(request)
      else if (isLoginStatus(request)) return simulateLoginStatus(request)
      else if (isIssueCredential(request)) return simulateIssueCredential(request)
      else if (isPresentCredential(request)) return simulatePresentCredential(request)
      else if (isPresentCredentialStatus(request)) return simulatePresentCredentialStatus(request)
      else if (isAddToWallet(request)) return simulateAddToWallet(request)
      else return EMPTY
    };

const isQrCodeLogin: CheckRequest =
    request => request.method === 'GET'
            && request.urlWithParams === '/api/presentations?type=didauth'

const simulateQrCodeLogin: SimulateRequest =
    _ => of(new HttpResponse({ body: { qrCode }}))
        .pipe(delay(SIMULATE_AFTER))

const isLoginStatus: CheckRequest =
    request => request.method === 'GET'
            && request.url === '/api/presentations/status'

const simulateLoginStatus: SimulateRequest =
    _ => from(statusGenerator.next()).pipe(
        map(({ value }) => {
            if (!value) return new HttpResponse({ status: 200, body: { status: 'Failure' } })
            else return new HttpResponse({ status: 200, body: { status: 'Success' } })
        }),
        delay(800),
    )

const statusGenerator = (async function*() {
  const everyNth = 10
  let i = 1 - everyNth
  while (true) yield i++ % everyNth === 0
})()

const addToWalletGenerator = (async function*() {
  const everyNth = 4
  let i = 1 - everyNth
  while (true) yield i++ % everyNth === 0
})()

const isIssueCredential: CheckRequest =
    request => request.method === 'POST'
            && request.url === '/api/credentials'

const simulateIssueCredential: SimulateRequest =
    _ => of(new HttpResponse({ body: { qrCode }}))
        .pipe(delay(SIMULATE_AFTER))

const isPresentCredential: CheckRequest =
    request => request.method === 'GET'
            && request.url === '/api/presentations?type=vaccine'

const simulatePresentCredential: SimulateRequest =
    _ => of(new HttpResponse({ body: { qrCode }}))
        .pipe(delay(SIMULATE_AFTER))

const isPresentCredentialStatus: CheckRequest =
    request => request.method === 'GET'
            && request.url === '/api/presentations/status'

const simulatePresentCredentialStatus: SimulateRequest =
    _ => from(statusGenerator.next()).pipe(
        map(({ value }) => {
            if (!value) return new HttpResponse({ status: 200, body: { status: 'Failure' } })
            else return new HttpResponse({ status: 200, body: { status: 'Success' } })
        }),
        delay(800),
    )

const isAddToWallet: CheckRequest =
    request => request.method === 'POST'
            && request.url === '/api/messages'

const simulateAddToWallet: SimulateRequest =
    _ => from(addToWalletGenerator.next()).pipe(
        map(({ value }) => {
            if (!value) return new HttpResponse({ status: 200, body: { status: 'Failure' } })
            else return new HttpResponse({ status: 200, body: { status: 'Success' } })
        }),
        delay(800),
    )