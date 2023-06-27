import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Usuario } from '../../modules/auth/model/User.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/v1/user`;
  public user!:Usuario;

  constructor(
    private http: HttpClient,
    private toast:ToastrService
  ) { }

  getInformation():Observable<boolean>{
    return this.http.get(`${this.apiUrl}/get-information`)
      .pipe(
        map( (resp:any) => {
          const {id, name, email} = resp;
          this.user = new Usuario( id, name, email );
          return true;
        }),
        catchError(err => {
          this.user = new Usuario(0, '', '');
          this.toast.error('Token invalido');
          return of(false);
        })
      );
  }

}
