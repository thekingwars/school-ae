import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students/students.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: number
  private edad: number
  sidebarItems: Array<object> = []
  role: string;
  age: number;
  professore_verificado: boolean;

  constructor(private studentServices:StudentsService, private router: Router, private activatedRouter: ActivatedRoute) {  
  }

  ngOnInit(): void {
    this.getUser()
    this.sidebarElements()
  }

  getUser(): void {
    this.studentServices.getUser().subscribe(res => {
      this.user = res['id']
      this.role = res['user']['aluno_role'] || res['user']['professores_role']
      this.age = res['user']['aluno_idad']
      this.professore_verificado = res['user']['professore_verificado']
      this.sidebarElements()
    })
  } 

  sidebarElements(){
    switch(this.role){
      case 'aluno':
        if(this.age > 18){
          this.sidebarItems = [
            {
              title: 'Profile',
              icon: 'nav-icon fas fa-users',
              children: [
                {
                  title: 'Profile User',
                  icon: 'nav-icon far fa-user',
                  routerLink:(id) => {
                    return `/students/profile/user/${id}`
                  }
                  
                },
                {
                  title: 'Profile User Update',
                  icon: 'nav-icon far fa-user',
                  routerLink:(id) => {
                    return `/students/profile/user/infoStudent/${id}`
                  }
                  
                },
              ]
            },
            {
              title: 'Equis cosa',
              icon: ''
            }
          ]
        }
        else{
          this.sidebarItems = [
            {
              title: 'Profile',
              icon: 'nav-icon fas fa-users',
              children: [
                {
                  title: 'Profile User',
                  icon: 'nav-icon far fa-user',
                  routerLink:(id) => {
                    return `/students/profile/user/${id}`
                  }
                  
                },
                {
                  title: 'Family User',
                  icon: 'nav-icon far fa-user',
                  routerLink: (id) => {
                    return `/students/profile/family/user/${id}`
                  }
                },
                {
                  title: 'Profile User Update',
                  icon: 'nav-icon far fa-user',
                  routerLink:(id) => {
                    return `/students/profile/user/infoStudent/${id}`
                  }
                  
                },
              ]
            },
            {
              title: 'Equis cosa',
              icon: ''
            }
          ]
        }
        break;
      case 'professore':
        if(this.professore_verificado == false){
          this.sidebarItems = [
            {
              title: 'Profile',
              icon: 'nav-icon fas fa-users',
              children: [
                {
                  title: 'Perfil Professore',
                  icon: 'nav-icon far fa-user',
                  routerLink:(id) => {
                    return `/teachers/profile/user/${id}`
                  }
                  
                },
                {
                  title: 'Candidatura Professore',
                  icon: 'nav-icon far fa-user',
                  routerLink:(id) => {
                    return `/teachers/profile/candidatura/user/${id}`
                  }
                },
              ]
            },
          ]
        }
        else{
          this.sidebarItems = [
            {
              title: 'Perfil',
              icon: 'nav-icon fas fa-users',
              children: [
                {
                  title: 'Perfil Professore',
                  icon: 'nav-icon far fa-user',
                  routerLink:(id) => {
                    return `/teachers/profile/user/${id}`
                  }
                },
              ]
            },
          ]
        }
    }

  }

/*   profileUser(): void {
    this.router.navigate(['/students/profile/user', this.user])
  } */
}

