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

  updateLivros(livros: Livros, id: number): Observable<Livros>{
    return this.http.patch<Livros>(`${this.api}/admin/update/livros/${id}`, livros, {headers: this.headers})
  }

  deleteLivro(id): Observable<any>{
    return this.http.delete<any>(`${this.api}/admin/delete/livros/${id}`, {headers: this.headers})
  }

  getLivro(id): Observable<Livros>{
    return this.http.get<Livros>(`${this.api}/admin/get/livros/${id}`, {headers: this.headers})
  }

  //estadoLivros

  createEstadoLivros(estado_livro): Observable<Livros>{
    return this.http.post<Livros>(`${this.api}/admin/create/estadoLivros`, estado_livro, {headers: this.headers})
  }

  allEstadoLivros(): Observable<any>{
    return this.http.get<any>(`${this.api}/admin/all/estadoLivros`, {headers: this.headers}).pipe(
      map( res => {
        return res['estado_livro']
      } )
    )
  }
  
  getEstadoLivro(id): Observable<Livros>{
    return this.http.get<Livros>(`${this.api}/admin/get/estadoLivros/${id}`, {headers: this.headers})
  }

  updateEstadoLivros(estado_livro, id: number): Observable<Livros>{
    return this.http.patch<Livros>(`${this.api}/admin/update/estadoLivros/${id}`, estado_livro, {headers: this.headers})
  }

  deleteEstadoLivro(id): Observable<any>{
    return this.http.delete<any>(`${this.api}/admin/delete/estadoLivros/${id}`, {headers: this.headers})
  }

}
