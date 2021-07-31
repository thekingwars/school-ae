import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JSONLivros, Livros } from 'src/app/models/livros.models';
import { environment } from 'src/environments/environment';
import { StudentsService } from '../students/students.service';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private api: string = environment.apiDev
  private headers: HttpHeaders

  constructor(private http: HttpClient, private studentServices: StudentsService) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
  }

  //Livros
  createLivros(livros: Livros): Observable<Livros>{
    return this.http.post<Livros>(`${this.api}/admin/create/livros`, livros, {headers: this.headers})
  }

  allLivros(): Observable<any>{
    return this.http.get<any>(`${this.api}/admin/all/livros`, {headers: this.headers}).pipe(
      map( res => {
        return res['livros']
      } )
    )
  }

  deleteLivro(id): Observable<any>{
    return this.http.delete<any>(`${this.api}/admin/delete/livros/${id}`, {headers: this.headers})
  }
}
