import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {

  private api: string = environment.apiDev
  private _refresh$ = new Subject()

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$
  }

  getAllCandidatura(): Observable<object[]>{
    return this.http.get<object[]>(`${this.api}/admin/all/candidatura`).pipe(
      map( res => res['professor'])
    )
  }

  verifyCandidatura(data, id: number): Observable<object[]>{
    return this.http.patch<object[]>(`${this.api}/admin/update/candidatura/${id}`, data).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }
}
