import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';



import { AdminRoutingModule } from './admin-routing.module';
import { IndexProfileComponent } from './profile/index-profile/index-profile.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { IndexEscolasComponent } from './profile/escolas/index-escolas/index-escolas.component';
import { CreateEscolasComponent } from './profile/escolas/create-escolas/create-escolas.component';
import { UpdateEscolasComponent } from './profile/escolas/update-escolas/update-escolas.component';
import { ViewEscolaComponent } from './profile/escolas/view-escola/view-escola.component';
import { DataTablesModule } from 'angular-datatables';
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

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listGridPlugin
]);

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
    ViewEquipamentoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DataTablesModule,
    AdminRoutingModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    ReactiveFormsModule,
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
export class AdminModule { }
