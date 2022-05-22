import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { delay, EMPTY, from, map, Observable, of, tap } from "rxjs";

import { simulated } from "./simulated-value";

const { qrCode } = simulated;

type CheckRequest = (request: HttpRequest<any>) => boolean;
type SimulateRequest = (request: HttpRequest<any>) => Observable<HttpEvent<any>>;

const SIMULATE_AFTER = 1000 //ms

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
      else return EMPTY
    };

const isQrCodeLogin: CheckRequest =
    request => request.method === 'GET'
            && request.url === '/api/login/qr-code'

const simulateQrCodeLogin: SimulateRequest =
    _ => of(new HttpResponse({ body: { qrCode }}))
        .pipe(delay(SIMULATE_AFTER))

const isLoginStatus: CheckRequest =
    request => request.method === 'GET'
            && request.url === '/api/login/status'

const simulateLoginStatus: SimulateRequest =
    _ => from(statusGenerator.next()).pipe(
        map(it => !it.value ? 401 : 200),
        map(status => new HttpResponse({ status })),
        delay(800),
    )

const statusGenerator = (async function*() {
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
    request => request.method === 'POST'
            && request.url === '/api/presentations'

const simulatePresentCredential: SimulateRequest =
    _ => of(new HttpResponse({ body: { qrCode }}))
        .pipe(delay(SIMULATE_AFTER))

const isPresentCredentialStatus: CheckRequest =
    request => request.method === 'GET'
            && request.url.startsWith('/api/presentations/')

const simulatePresentCredentialStatus: SimulateRequest =
    _ => from(statusGenerator.next()).pipe(
        map(it => !it.value ? { } : { dummy: 'value' }),
        map(body => new HttpResponse({ body })),
        delay(800),
    )
