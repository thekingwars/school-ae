import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  private api = environment.apiDev

  constructor(private htpp: HttpClient) { }

  codePhone(code: string): Observable<object>{
    return this.htpp.post<object>(`${this.api}/student/verifyPhone`, code)
  }

  codeEmail(code: string): Observable<object>{
    return this.htpp.post<object>(`${this.api}/student/verifyEmail`, code)
  }
}
