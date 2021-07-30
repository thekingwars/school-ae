import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AulasIndexComponent } from './profile/aulas/aulas-index/aulas-index.component';
import { CreateAulasComponent } from './profile/aulas/create-aulas/create-aulas.component';
import { UpdateAulasComponent } from './profile/aulas/update-aulas/update-aulas.component';
import { ViewAulasComponent } from './profile/aulas/view-aulas/view-aulas.component';
import { CreateEscolasComponent } from './profile/escolas/create-escolas/create-escolas.component';
import { IndexEscolasComponent } from './profile/escolas/index-escolas/index-escolas.component';
import { UpdateEscolasComponent } from './profile/escolas/update-escolas/update-escolas.component';
import { ViewEscolaComponent } from './profile/escolas/view-escola/view-escola.component';
import { IndexProfileComponent } from './profile/index-profile/index-profile.component';
import { CreateInstalacoesComponent } from './profile/instalacoes/create-instalacoes/create-instalacoes.component';
import { InstalacoesComponent } from './profile/instalacoes/instalacoes.component';
import { UpdateInstalacoesComponent } from './profile/instalacoes/update-instalacoes/update-instalacoes.component';
import { ViewInstalacoesComponent } from './profile/instalacoes/view-instalacoes/view-instalacoes.component';
import { CreateSalasComponent } from './profile/salas/create-salas/create-salas.component';
import { SalasIndexComponent } from './profile/salas/salas-index/salas-index.component';
import { UpdateSalasComponent } from './profile/salas/update-salas/update-salas.component';
import { ViewsSalasComponent } from './profile/salas/views-salas/views-salas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: IndexProfileComponent,
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
