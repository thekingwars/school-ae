import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Subject } from 'rxjs';
import { Escolas } from 'src/app/models/escolas.models';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import { StudentsService } from 'src/app/services/students/students.service';
import Swal from 'sweetalert2';
declare var id

@Component({
  selector: 'app-index-escolas',
  templateUrl: './index-escolas.component.html',
  styleUrls: ['./index-escolas.component.scss']
})
export class IndexEscolasComponent implements OnInit {

  dtOptions: any = {};
  escolas: Escolas[] = []
  calendarOptions: CalendarOptions
  title
  dateSelected
  dateSelectedEnd
  array = []
  numeros = [1,2,3,4,5,6,7,8,9]


  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private studentServices: StudentsService, private escolasServices: EscolasService, private router: Router) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      searching: true,
      responsive: true,
      info: true,
      colReorder: {
        order: [1, 0, 2],
        fixedColumnsRight: 2
      },
      language: {url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese.json'},
    };
  
    this.getEscolas()
    this.callendarOptions()
  }

  editEscola(id){
    this.router.navigate(['/admin/profile/update/escolas/', id])
  }

  viewEscola(id){
    this.router.navigate(['/admin/profile/get/escolas/', id])
  }

  getEscolas(){
    this.escolasServices.allEscolas().subscribe(res => {
      this.escolas = res['escolas']
      console.log(this.escolas)
    })
  }

  callendarOptions(){
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      weekends: true,
      selectable: true,
      select: async (start) => {
        console.log(start)
        this.dateSelected = start.startStr
        this.dateSelectedEnd = start.endStr
        this.title = await Swal.fire({
          title: 'Input email address',
          input: 'text',
          inputLabel: 'Your email address',
          inputPlaceholder: 'Enter your email address'
        })

        if(!this.title.value){
          Swal.fire('error', 'No puede ir vacio', 'error')
          return false
        }

        let infoArray = {
          "title": this.title.value,
          "start": this.dateSelected,
          "end": this.dateSelectedEnd,
          "id": Date.now()
        }
  
        this.array.push(infoArray)
  
        localStorage.setItem('fecha', JSON.stringify(this.array))
        return this.array
      },
      locale: 'es',
      headerToolbar: {
        left: 'prev,next today,listWeek',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      events: JSON.parse(localStorage.getItem('fecha')),
      dayMaxEventRows: true,
      eventClick: (event) => {
        console.log(event)
        const fecha = JSON.parse(localStorage.getItem('fecha')).filter(fecha => fecha.id !== event.jsEvent.clientY)

        localStorage.setItem('fecha', JSON.stringify(fecha))
        event.event.remove()
      },
      themeSystem: 'bootstrap'
     }
  }
  
  deleteEscola( escola: Escolas, i: number ) {
    Swal.fire({
      title: '¿Tem a certeza?',
      text: `¿Tem a certeza que quer apagar ${escola['escola_nome']}?`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      console.log(resp)
      if ( resp.value ) {
        this.escolas.splice(i, 1);
        this.escolasServices.deleteEscolas(escola.escola_id).subscribe()
      }
    });
  }
}
