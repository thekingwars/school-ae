import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { StudentsService } from '../students/students.service';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {

  private api: string = environment.apiDev

  constructor(private http: HttpClient, private studentServices: StudentsService) { }

  setCandidatura(teacher: FormData, id: number): Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.patch<object>(`${this.api}/teacher/candidatura/${id}`, teacher, {headers})
  }
}
