import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = `${environment.apiUrl}/v1/tasks`;

  constructor(private http:HttpClient) { }


  getTasks(status:boolean | null): Observable<Task[]>{
    return this.http.post<Task[]>(`${this.apiUrl}/get-by-status`, {status});
  }


  createOrUpdate(task:any){
    return this.http.post(`${this.apiUrl}/store`, task);
  }


  getTotals(){
    return this.http.get(`${this.apiUrl}/get-total`);
  }


  updateStatus(id:number, status = true){
    return this.http.put(`${this.apiUrl}/update-status`, {id, status});
  }


  delete(id:number){
    return this.http.delete(`${this.apiUrl}/destroy/${id}`);
  }
}
