import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concelho } from 'src/app/models/concelho.models';
import { CodigoPostal } from 'src/app/models/condigoPostal.models';

@Injectable({
  providedIn: 'root'
})
export class PortugalService {

  constructor(private http: HttpClient) { }

  getCodigoPostal(): Observable<CodigoPostal>{
    return this.http.get<CodigoPostal>('https://ctt-api-service.herokuapp.com/api/v1/codigopostal')
  }

  getConcelho(): Observable<Concelho>{
    return this.http.get<Concelho>('https://ctt-api-service.herokuapp.com/api/v1/concelho')
  }
}
