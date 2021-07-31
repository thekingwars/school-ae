import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Aulas } from 'src/app/models/aulas.models';
import { Livros } from 'src/app/models/livros.models';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aulas-index',
  templateUrl: './aulas-index.component.html',
  styleUrls: ['./aulas-index.component.scss']
})
export class AulasIndexComponent implements OnInit {
  paginationPageSize: number
  cacheBlockSize: number
  defaultColDef
  rowData = this.escolaServices.allAulas()
  aulas = []
  estadoLivro
  public selectControl = new FormControl()
  public selectControl2 = new FormControl()
  public selectControl3 = new FormControl()

  columnDefs = [
    { headerName: 'ID', field: 'aulas_id', sortable: true, filter: true},
    { headerName: 'Aulas num', field: 'aulas_num', sortable: true, filter: true, },
    { headerName: 'Aulas data', field: 'aulas_data', sortable: true, filter: true },
    { headerName: 'Aulas hora entrada prevista', field: 'aula_hora_entrada_prevista', sortable: true, filter: true},
    { headerName: 'Aulas hora entrada', field: 'aula_hora_entrada', sortable: true, filter: true},
    { headerName: 'Aulas hora saida prevista', field: 'aula_hora_saida_prevista', sortable: true, filter: true},
    { headerName: 'Aulas hora saida', field: 'aula_hora_saida', sortable: true, filter: true},
    { headerName: 'Aulas unidade', field: 'aula_unidade', sortable: true, filter: true},
    { headerName: 'Aulas obs', field: 'aula_obs', sortable: true, filter: true},
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
    this.updateLivro()
    this.viewLivro()
    this.deleteLivro()
  }

  ngOnInit(): void {
    this.getAulas()
  }

  getAulas(){
    this.escolaServices.allAulas().subscribe(res => {
      res.map( res => {
        this.aulas.push(`${res['aula_obs']} - ${res['aulas_id']}`)
      } )
    })
  }

  updateLivro(){
    this.selectControl.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/update/aulas/${Number(id[1])}`)
    })
  }

  viewLivro(){
    this.selectControl2.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/get/aulas/${Number(id[1])}`)
    })
  }

  deleteLivro(){
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
          this.escolaServices.deleteAulas(Number(id[1])).subscribe(res => {
            Swal.fire({title: 'Error', text: 'Aulas removido com êxito', icon: 'success', allowOutsideClick: false}).then(result => {
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
