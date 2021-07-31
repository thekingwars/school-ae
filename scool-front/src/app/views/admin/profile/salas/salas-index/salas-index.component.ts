import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salas-index',
  templateUrl: './salas-index.component.html',
  styleUrls: ['./salas-index.component.scss']
})
export class SalasIndexComponent implements OnInit {

  paginationPageSize: number
  cacheBlockSize: number
  defaultColDef
  rowData = this.escolaServices.allSalas()
  salas = []
  estadoLivro
  public selectControl = new FormControl()
  public selectControl2 = new FormControl()
  public selectControl3 = new FormControl()

  columnDefs = [
    { headerName: 'ID', field: 'sala_id', sortable: true, filter: true},
    { headerName: 'Salas nome', field: 'sala_nome', sortable: true, filter: true, },
    { headerName: 'Salas capacidade aconselhada', field: 'sala_capacidade_aconselhada', sortable: true, filter: true },
    { headerName: 'Salas capacidade maxima', field: 'sala_capacidade_maxima', sortable: true, filter: true},
    { headerName: 'Salas equipamento quantidade', field: 'sala_equipamento_quantidade', sortable: true, filter: true},
  ];

  constructor(private escolaServices: EscolasService) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      floatingFilter: true,
      resizable: true
    }
    this.paginationPageSize = 15
    this.cacheBlockSize = 15
    this.viewSalas()
    this.updateSalas()
    this.deleteSalas()
  }

  ngOnInit(): void {
    this.getSalas()
  }

  getSalas(){
    this.escolaServices.allSalas().subscribe(res => {
      res.map( res => {
        this.salas.push(`${res['sala_nome']} - ${res['sala_id']}`)
      } )
    })
  }

  updateSalas(){
    this.selectControl.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/update/salas/${Number(id[1])}`)
    })
  }

  viewSalas(){
    this.selectControl2.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/get/salas/${Number(id[1])}`)
    })
  }

  deleteSalas(){
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
          this.escolaServices.deleteSalas(Number(id[1])).subscribe(res => {
            Swal.fire({title: 'Error', text: res['salas'], icon: 'success', allowOutsideClick: false}).then(result => {
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
