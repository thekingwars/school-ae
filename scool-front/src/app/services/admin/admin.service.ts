import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment' 
import { StudentsService } from '../students/students.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api: string = environment.apiDev

  constructor(private http: HttpClient, private stundetServices: StudentsService) { }

  loginAdmin(admin): Observable<object>{
    return this.http.post<object>(`${this.api}/admin/login`, admin).pipe(
      map( res => {
        this.stundetServices.setToken(res['token'])
        return res
      })
    )
  }
}
