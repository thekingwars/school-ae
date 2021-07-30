import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { StudentsService } from '../students/students.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api: string = environment.apiDev

  constructor(private http: HttpClient, private studentServices: StudentsService) { }

  registerTeacher(teacher): Observable<object>{
    return this.http.post<object>(`${this.api}/teacher/registerTeachers`, teacher)
  }

  loginTeacher(teacher): Observable<object>{
    return this.http.post<object>(`${this.api}/teacher/loginTeachers`, teacher).pipe(
      map((resp) => {
        this.studentServices.setToken(resp['token'])
        return resp
      })
    )
  }
}
