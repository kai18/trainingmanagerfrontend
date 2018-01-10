import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    console.log("intercepting");

    var token = localStorage.getItem('jwt-token');
    if(token === null || token === undefined){
      return next.handle(req);
    }
		console.log(token);
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json');
    if(req.url === 'http://localhost:9082/authenticate')
      return next.handle(req);
    
		headers = headers.set('jwt-token', token)
    const requestWithJwtAdded = req.clone({ headers: req.headers.set('Content-Type', 'application/json').set('jwt-token', token)});
    // Pass the cloned request instead of the original request to the next handle
    return next.handle(requestWithJwtAdded);
  }
}