import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';



import { AdminRoutingModule } from './admin-routing.module';
import { IndexProfileComponent } from './profile/index-profile/index-profile.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { IndexEscolasComponent } from './profile/escolas/index-escolas/index-escolas.component';
import { CreateEscolasComponent } from './profile/escolas/create-escolas/create-escolas.component';
import { UpdateEscolasComponent } from './profile/escolas/update-escolas/update-escolas.component';
import { ViewEscolaComponent } from './profile/escolas/view-escola/view-escola.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstalacoesComponent } from './profile/instalacoes/instalacoes.component';
import { ViewInstalacoesComponent } from './profile/instalacoes/view-instalacoes/view-instalacoes.component';
import { UpdateInstalacoesComponent } from './profile/instalacoes/update-instalacoes/update-instalacoes.component';
import { CreateInstalacoesComponent } from './profile/instalacoes/create-instalacoes/create-instalacoes.component';
import { SalasIndexComponent } from './profile/salas/salas-index/salas-index.component';
import { CreateSalasComponent } from './profile/salas/create-salas/create-salas.component';
import { UpdateSalasComponent } from './profile/salas/update-salas/update-salas.component';
import { ViewsSalasComponent } from './profile/salas/views-salas/views-salas.component';
import { AulasIndexComponent } from './profile/aulas/aulas-index/aulas-index.component';
import { CreateAulasComponent } from './profile/aulas/create-aulas/create-aulas.component';
import { UpdateAulasComponent } from './profile/aulas/update-aulas/update-aulas.component';
import { ViewAulasComponent } from './profile/aulas/view-aulas/view-aulas.component';
import { EquipamentoIndexComponent } from './profile/equipamento/equipamento-index/equipamento-index.component';
import { CreateEquipamentoComponent } from './profile/equipamento/create-equipamento/create-equipamento.component';
import { UpdateEquipamentoComponent } from './profile/equipamento/update-equipamento/update-equipamento.component';
import { ViewEquipamentoComponent } from './profile/equipamento/view-equipamento/view-equipamento.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list';
import { LoginComponent } from './auth/login/login.component';
import { LivrosComponent } from './profile/livros/livros.component';
import { CreateLivrosComponent } from './profile/livros/create-livros/create-livros.component';
import { UpdateLivrosComponent } from './profile/livros/update-livros/update-livros.component';
import { ViewLivrosComponent } from './profile/livros/view-livros/view-livros.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgxSelectModule } from 'ngx-select-ex';
import { EstadoLivrosComponent } from './profile/estado-livros/estado-livros.component';
import { CreateEstadoComponent } from './profile/estado-livros/create-estado/create-estado.component';
import { UpdateEstadoComponent } from './profile/estado-livros/update-estado/update-estado.component';
import { ViewEstadoComponent } from './profile/estado-livros/view-estado/view-estado.component';
import { CandidaturaComponent } from './profile/candidatura/candidatura/candidatura.component';

import { PrimeNGConfig } from 'primeng/api';
import { TableModule } from 'primeng/table'
import { ContextMenuModule } from 'primeng/contextmenu'
import { PaginatorModule } from 'primeng/paginator'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { AdminsComponent } from './profile/admins/admins.component';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { StaffComponent } from './profile/staff/staff.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listGridPlugin
]);

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};


@NgModule({
  declarations: [
    IndexProfileComponent,
    IndexEscolasComponent,
    CreateEscolasComponent,
    UpdateEscolasComponent,
    ViewEscolaComponent,
    InstalacoesComponent,
    ViewInstalacoesComponent,
    UpdateInstalacoesComponent,
    CreateInstalacoesComponent,
    SalasIndexComponent,
    CreateSalasComponent,
    UpdateSalasComponent,
    ViewsSalasComponent,
    AulasIndexComponent,
    CreateAulasComponent,
    UpdateAulasComponent,
    ViewAulasComponent,
    EquipamentoIndexComponent,
    CreateEquipamentoComponent,
    UpdateEquipamentoComponent,
    ViewEquipamentoComponent,
    LoginComponent,
    LivrosComponent,
    CreateLivrosComponent,
    UpdateLivrosComponent,
    ViewLivrosComponent,
    EstadoLivrosComponent,
    CreateEstadoComponent,
    UpdateEstadoComponent,
    ViewEstadoComponent,
    CandidaturaComponent,
    AdminsComponent,
    StaffComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    NgxMaskModule.forRoot(maskConfigFunction),
    NgxSelectModule,
    ContextMenuModule,
    PaginatorModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    DialogModule,
    PasswordModule,
    ToastModule,
    DropdownModule,
    FullCalendarModule
  ],
  exports: [
    IndexProfileComponent,
    IndexEscolasComponent,
    CreateEscolasComponent,
    UpdateEscolasComponent,
    ViewEscolaComponent,
  ]
})
export class AdminModule implements OnInit{
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
}
