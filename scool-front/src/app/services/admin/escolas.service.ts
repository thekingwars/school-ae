import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import format from 'date-fns/format';
import { Observable, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { Aulas } from 'src/app/models/aulas.models';
import { Escolas } from 'src/app/models/escolas.models';
import { environment } from '../../../environments/environment' 
import { StudentsService } from '../students/students.service';

@Injectable({
  providedIn: 'root'
})
export class EscolasService {

  private api: string = environment.apiDev

  constructor(private http: HttpClient, private studentServices: StudentsService) { 

  }

  //Escolas
  createEscolas(escolas: FormData): Observable<Escolas>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });

    return this.http.post<object>(`${this.api}/admin/create/escolas`, escolas, {headers}).pipe(
      map( (res) => {
        return res['escolas']
      } )
    )
  }

  allEscolas(): Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });

    return this.http.get<any>(`${this.api}/admin/all/escolas`, {headers}).pipe(
      map(res => {
        return res['escolas']
      })
    )
  }

  getEscolas(id: number): Observable<Escolas>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });

    return this.http.get<Escolas>(`${this.api}/admin/get/escolas/${id}`, {headers})
  }

  updateEscolas(escolas: FormData, id: number): Observable<Escolas>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });

    return this.http.patch<object>(`${this.api}/admin/update/escolas/${id}`, escolas, {headers}).pipe(
      map( (res) => {
        return res['escolas']
      } )
    )
  }

  deleteEscolas(id: number): Observable<Escolas>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });

    return this.http.delete<Escolas>(`${this.api}/admin/delete/escolas/${id}`, {headers})
  }

  //instalacoes
  createInstalacoes(instalacoes):Observable<object>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });

    return this.http.post<object>(`${this.api}/admin/create/instalacoes`, instalacoes, {headers})
  }

  allInstalacoes():Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });

    return this.http.get<any>(`${this.api}/admin/all/instalacoes`, {headers}).pipe(
      map(res => {
        return res['instalacoes']
      })
    )
  }

  getInstalacoes(id: number):Observable<object>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });

    return this.http.get<object>(`${this.api}/admin/get/instalacoes/${id}`, {headers})
  }

  updateInstalacoes(instalacoes, id: number): Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });

    return this.http.patch<object>(`${this.api}/admin/update/instalacoes/${id}`, instalacoes, {headers})
  }

  deleteInstalacoes(id: number): Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.delete<object>(`${this.api}/admin/delete/instalacoes/${id}`, {headers})
  }


  //salas
  createSalas(salas: FormData): Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.post<object>(`${this.api}/admin/create/salas`, salas, {headers})
  }

  allSalas():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.get<any>(`${this.api}/admin/all/salas`, {headers}).pipe(
      map(res => {
        return res['salas']
      })
    )
  }

  getSalas(id: number):Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.get<object>(`${this.api}/admin/get/salas/${id}`, {headers})
  }

  updateSalas(salas: FormData, id: number): Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.patch<object>(`${this.api}/admin/update/salas/${id}`, salas, {headers})
  }

  deleteSalas(id: number): Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.delete<object>(`${this.api}/admin/delete/salas/${id}`, {headers})
  }

  //Aulas

  createAulas(aulas): Observable<Aulas>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.post<Aulas>(`${this.api}/admin/create/aulas`, aulas, {headers})
  }

  
  allAulas():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.get<any>(`${this.api}/admin/all/aulas`, {headers}).pipe( 
      map( res => {
        return res['aulas']
      } )
     )
  }

  getAulas(id: number):Observable<Aulas>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.get<Aulas>(`${this.api}/admin/get/aulas/${id}`, {headers})
  }

  updateAulas(aula: Aulas, id: number): Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.patch<Aulas>(`${this.api}/admin/update/aulas/${id}`, aula, {headers})
  }

  deleteAulas(id: number): Observable<Aulas>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.studentServices.getToken()}`
    });
    return this.http.delete<Aulas>(`${this.api}/admin/delete/aulas/${id}`, {headers})
  }
}
