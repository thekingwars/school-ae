import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import { StudentsService } from 'src/app/services/students/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-escolas',
  templateUrl: './index-escolas.component.html',
  styleUrls: ['./index-escolas.component.scss']
})
export class IndexEscolasComponent implements OnInit {
  dtOptions: any = {};
  calendarOptions: CalendarOptions
  title
  dateSelected
  dateSelectedEnd
  array = []
  paginationPageSize: number
  cacheBlockSize: number
  defaultColDef
  rowData = this.escolasServices.allEscolas()
  escolas = []
  estadoLivro
  public selectControl = new FormControl()
  public selectControl2 = new FormControl()
  public selectControl3 = new FormControl()


  columnDefs = [
    { headerName: 'ID', field: 'escola_id', sortable: true, filter: true},
    { headerName: 'Escola nif', field: 'escola_nif', sortable: true, filter: true, },
    { headerName: 'Escola nome', field: 'escola_nome', sortable: true, filter: true },
    { headerName: 'Escola rua', field: 'escola_rua', sortable: true, filter: true},
    { headerName: 'Escola codigo postal', field: 'escola_codigo_postal', sortable: true, filter: true},
    { headerName: 'Escola freguesia', field: 'escola_freguesia', sortable: true, filter: true},
    { headerName: 'Escola concelho', field: 'escola_concelho', sortable: true, filter: true},
    { headerName: 'Escola data nascimento', field: 'escola_data_nascimento', sortable: true, filter: true},
    { headerName: 'Escola telemovel', field: 'escola_telemovel', sortable: true, filter: true},
];

  constructor(private escolasServices: EscolasService, private router: Router) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      floatingFilter: true,
      resizable: true
    }
    this.paginationPageSize = 15
    this.cacheBlockSize = 15
    this.updateEscolas()
    this.viewEscolas()
    this.deleteEscolas()
  }

  ngOnInit(): void {
  
    this.getEscolas()
    //this.callendarOptions()
  }

  getEscolas(){
    this.escolasServices.allEscolas().subscribe(res => {
      res.map( res => {
        this.escolas.push(`${res['escola_nome']} - ${res['escola_id']}`)
      } )
    })
  }

/*   callendarOptions(){
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
  } */
  
  onSelectionChanged(e){
    console.log(e)
  }
  
  updateEscolas(){
    this.selectControl.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/update/escolas/${Number(id[1])}`)
    })
  }

  viewEscolas(){
    this.selectControl2.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/get/escolas/${Number(id[1])}`)
    })
  }

  deleteEscolas(){
    this.selectControl3.valueChanges.subscribe(res => {
      let id
      id = res.split('-')

      if(res.length > 0){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(id)
          this.escolasServices.deleteEscolas(Number(id[1])).subscribe(res => {
            Swal.fire({title: 'Error', text: res['escolas'], icon: 'success', allowOutsideClick: false}).then(result => {
              if(result.isConfirmed){
                window.location.reload()
              }
            })
          })
          }
        })
      }
    })
  }
}
