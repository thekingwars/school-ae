import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentsService } from '../services/students/students.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoGuard implements CanActivate {

  constructor(private studentServices: StudentsService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.studentServices.getUser().subscribe(res => {
      if(res['user']['aluno_role'] === 'aluno'){
        console.log('tienes acceso')
      }
      else{
        console.log('no tienes acceso')
        this.router.navigateByUrl('')
      }
    })
    return true;
  }
  
}
