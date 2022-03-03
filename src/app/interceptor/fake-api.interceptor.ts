import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable()
export class FakeApiInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if(req.method=="POST"  && req.url=="http://localhost:4200/login")
      {
        console.log(req.body)
        if(req.body.email==localStorage.getItem('username')&& req.body.password==localStorage.getItem('password'))
        {
          console.log('authenticated')
          return of(new HttpResponse({
            status:200 , 
            body:{
              success:true,
              data:{id:1, name:'username', email:localStorage.getItem('username'),role:'softwareE'},
              token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiQWhtZWQiLCJlbWFpbCI6ImFAYS5jb20ifQ.2RxoWmDADR8sLfW6CGRcthcuXDk5jQCqxx7kx8rLzjA'
              ,}
            
          }))
        }
        else {
          return of (new HttpResponse({
            status:401,
            body:{
              success:false,
              data:{error:'mail or password is not correct '}
            }
          }))
        }
      } 
        return next.handle(req);
    }
    
}