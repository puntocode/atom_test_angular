import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environments';
import { Usuario } from '../model/User.model';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/v1/auth`;
  constructor(private http: HttpClient) { }

  login(email:string, password :string){
    return this.http.post(`${this.apiUrl}/login`, {email, password})
      .pipe(
        map( (resp:any) => this.updateToken(resp)),
        catchError(err => { throw 'Credenciales incorrectas'})
      );
  }


  register(data:any){
    return this.http.post(`${this.apiUrl}/register`, data)
      .pipe( map( (resp:any) => this.updateToken(resp)) );
  }


  updateToken(resp:any){
    localStorage.setItem('token', resp.access_token);
    return true;
  }

}
