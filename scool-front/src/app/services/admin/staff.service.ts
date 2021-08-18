import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private api: string = environment.apiDev
  private _refresh$ = new Subject()

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$
  }


  createStaff(staff): Observable<object>{
    return this.http.post<object>(`${this.api}/admin/create/staff`, staff).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }

  getAllStaffs(): Observable<object[]>{
    return this.http.get<object[]>(`${this.api}/admin/all/staff`)
  }

  updateAdmins(staff, id: number): Observable<object>{
    return this.http.patch<object>(`${this.api}/admin/update/staff/${id}`, staff).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }

  deleteStaff(id: number): Observable<object>{
    return this.http.delete<object>(`${this.api}/admin/delete/staff/${id}`).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }
}
