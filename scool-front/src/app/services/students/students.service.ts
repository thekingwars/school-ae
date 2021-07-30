import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Students } from '../../models/students.models'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private api = environment.apiDev

  constructor(private http: HttpClient) { }

  setToken(token:string): void{
    return localStorage.setItem('token', token)
  }

  setAge(age:string): void{
    return localStorage.setItem('age', age)
  }

  getAge(): string{
    return localStorage.getItem('age')
  }

  getToken(): string{
    return localStorage.getItem('token')
  }

  logOut(): void{
    localStorage.removeItem('token')
  }

  registerStudents(student: Students): Observable<Students>{
    return this.http.post<Students>(`${this.api}/student/register`, student).pipe(
      map(resp => {
        this.setToken(resp['token'])
        return resp
      })
    )
  }

  loginStudents(student: Students): Observable<Students>{
    return this.http.post<Students>(`${this.api}/student/login`, student).pipe(
      map(resp => {
        this.setToken(resp['token'])
        return resp
      })
    )
  }

  fotgoutPassword(student: Students): Observable<Students>{
    return this.http.post<Students>(`${this.api}/student/forgoutPassword`, student.student.aluno_email).pipe(
      map(resp => {
        this.setToken(resp['token'])

        return resp
      })
    )
  }

  newPassword(student: Students, token: string): Observable<Students>{
    return this.http.patch<Students>(`${this.api}/student/recoverPassword/${token}`, student.student.aluno_password)
  }

  getUser(): Observable<number>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<number>(`${this.api}/student/user`, {headers}).pipe(
      map(resp => {
        return resp['user']
      })
    )
  }

  getStudents(id): Observable<Students>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<Students>(`${this.api}/student/getUser/${id}`, {headers})
  }

  updateStudent(student: FormData, id: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.patch<Students>(`${this.api}/student/profile/${id}/alunoInfo`, student, {headers})
  }

  studentDad(student: Students, id: number): Observable<Students>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.patch<Students>(`${this.api}/student/profile/${id}/dadInfo`, student, {headers})
  }

  studentMom(student: Students, id:number): Observable<Students>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.patch<Students>(`${this.api}/student/profile/${id}/momInfo`, student, {headers})
  }
}
