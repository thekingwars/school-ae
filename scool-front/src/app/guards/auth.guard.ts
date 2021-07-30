import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentsService } from '../services/students/students.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private studentServices: StudentsService) { 

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = this.studentServices.getToken()

    const userPromise = new Promise<string>((resolve, reject) => {
      if (token) {
        resolve('Tienes acceso a esta zona')
      } else {
        reject('No tienes acceso a esta zona, inicie sesión o registrese')
      }
    })

    userPromise.then(user => {
      console.log(user)
      return true
    })
    .catch(err => {
      console.log(err)
      this.router.navigateByUrl('/students/login')
    })

    return true
  }
}
