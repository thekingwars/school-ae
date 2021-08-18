import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Admins } from 'src/app/models/admins.models';
import { environment } from '../../../environments/environment' 
import { StudentsService } from '../students/students.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api: string = environment.apiDev
  private _refresh$ = new Subject()

  constructor(private http: HttpClient, private stundetServices: StudentsService) { }

  get refresh$(){
    return this._refresh$
  }


  loginAdmin(admin): Observable<Admins>{
    return this.http.post<Admins>(`${this.api}/admin/login`, admin).pipe(
      map( res => {
        this.stundetServices.setToken(res['token'])
        return res
      })
    )
  }

  createAdmins(admin: Admins): Observable<Admins>{
    return this.http.post<Admins>(`${this.api}/admin/create/admin`, admin).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }

  getAllAdmins(): Observable<Admins[]>{
    return this.http.get<Admins[]>(`${this.api}/admin/all/admin`)
  }

  updateAdmins(admin: Admins, id: number): Observable<Admins>{
    return this.http.patch<Admins>(`${this.api}/admin/update/admin/${id}`, admin).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }

  deleteAdmins(id: number): Observable<Admins>{
    return this.http.delete<Admins>(`${this.api}/admin/delete/admin/${id}`).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }
}