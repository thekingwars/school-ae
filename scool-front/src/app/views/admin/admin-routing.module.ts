import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { AulasIndexComponent } from './profile/aulas/aulas-index/aulas-index.component';
import { CreateAulasComponent } from './profile/aulas/create-aulas/create-aulas.component';
import { UpdateAulasComponent } from './profile/aulas/update-aulas/update-aulas.component';
import { ViewAulasComponent } from './profile/aulas/view-aulas/view-aulas.component';
import { CreateLivrosComponent } from './profile/livros/create-livros/create-livros.component';
import { CreateEscolasComponent } from './profile/escolas/create-escolas/create-escolas.component';
import { IndexEscolasComponent } from './profile/escolas/index-escolas/index-escolas.component';
import { UpdateEscolasComponent } from './profile/escolas/update-escolas/update-escolas.component';
import { ViewEscolaComponent } from './profile/escolas/view-escola/view-escola.component';
import { CreateInstalacoesComponent } from './profile/instalacoes/create-instalacoes/create-instalacoes.component';
import { InstalacoesComponent } from './profile/instalacoes/instalacoes.component';
import { UpdateInstalacoesComponent } from './profile/instalacoes/update-instalacoes/update-instalacoes.component';
import { ViewInstalacoesComponent } from './profile/instalacoes/view-instalacoes/view-instalacoes.component';
import { LivrosComponent } from './profile/livros/livros.component';
import { CreateSalasComponent } from './profile/salas/create-salas/create-salas.component';
import { SalasIndexComponent } from './profile/salas/salas-index/salas-index.component';
import { UpdateSalasComponent } from './profile/salas/update-salas/update-salas.component';
import { ViewsSalasComponent } from './profile/salas/views-salas/views-salas.component';
import { UpdateLivrosComponent } from './profile/livros/update-livros/update-livros.component';
import { ViewLivrosComponent } from './profile/livros/view-livros/view-livros.component';
import { CreateEstadoComponent } from './profile/estado-livros/create-estado/create-estado.component';
import { EstadoLivrosComponent } from './profile/estado-livros/estado-livros.component';
import { UpdateEstadoComponent } from './profile/estado-livros/update-estado/update-estado.component';
import { ViewEstadoComponent } from './profile/estado-livros/view-estado/view-estado.component';
import { CandidaturaComponent } from './profile/candidatura/candidatura/candidatura.component';
import { AdminsComponent } from './profile/admins/admins.component';
import { StaffComponent } from './profile/staff/staff.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuard, AdminGuard],
        component: SidebarComponent,
        children: [
          {
            path: 'escolas',
            component: IndexEscolasComponent
          },
          {
            path: 'create/escolas',
            component: CreateEscolasComponent
          },
          {
            path: 'get/escolas/:id',
            component: ViewEscolaComponent
          },
          {
            path: 'update/escolas/:id',
            component: UpdateEscolasComponent
          },
          {
            path: 'instalacoes',
            component: InstalacoesComponent
          },
          {
            path: 'create/instalacoes',
            component: CreateInstalacoesComponent
          },
          {
            path: 'update/instalacoes/:id',
            component: UpdateInstalacoesComponent
          },
          {
            path: 'get/instalacoes/:id',
            component: ViewInstalacoesComponent
          },
          {
            path: 'salas',
            component: SalasIndexComponent
          },        
          {
            path: 'create/salas',
            component: CreateSalasComponent
          },
          {
            path: 'update/salas/:id',
            component: UpdateSalasComponent
          },
          {
            path: 'get/salas/:id',
            component: ViewsSalasComponent
          },
          {
            path: 'aulas',
            component: AulasIndexComponent
          },
          {
            path: 'create/aulas',
            component: CreateAulasComponent
          },
          {
            path: 'get/aulas/:id',
            component: ViewAulasComponent
          },
          {
            path: 'update/aulas/:id',
            component: UpdateAulasComponent
          },
          {
            path: 'livros',
            component: LivrosComponent
          },
          {
            path: 'create/livros',
            component: CreateLivrosComponent
          },
          {
            path: 'get/livros/:id',
            component: ViewLivrosComponent
          },
          {
            path: 'update/livros/:id',
            component: UpdateLivrosComponent
          },
          {
            path: 'estado-livros',
            component: EstadoLivrosComponent
          },
          {
            path: 'create/estado-livros',
            component: CreateEstadoComponent
          },
          {
            path: 'update/estado-livros/:id',
            component: UpdateEstadoComponent
          },
          {
            path: 'get/estado-livros/:id',
            component: ViewEstadoComponent
          },
          {
            path: 'candidaturas',
            component: CandidaturaComponent
          },
          {
            path: 'admins',
            component: AdminsComponent
          },
          {
            path: 'staffs',
            component: StaffComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
