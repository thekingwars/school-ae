import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentsService } from '../services/students/students.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorGuard implements CanActivate {

  constructor(private studentServices: StudentsService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.studentServices.getUser().subscribe(res => {
        if(res['user']['professores_role'] === 'professore'){
          console.log('tienes acceso')
          return
        }
        else{
          console.log('no tienes acceso')
          this.router.navigateByUrl('')
        }
      })
      return true;
  }
  
}
