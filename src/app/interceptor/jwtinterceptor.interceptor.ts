import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    console.log("intercepting");

    var token = localStorage.getItem('jwt-token');
		console.log(token);
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json');
		headers = headers.set('jwt-token', token)

    const requestWithJwtAdded = req.clone({ headers: req.headers.set('Content-Type', 'application/json').set('jwt-token', token)});
    // Pass the cloned request instead of the original request to the next handle
    return next.handle(requestWithJwtAdded);
  }
}