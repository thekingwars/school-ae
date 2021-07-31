import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instalacoes',
  templateUrl: './instalacoes.component.html',
  styleUrls: ['./instalacoes.component.scss']
})
export class InstalacoesComponent implements OnInit {
  paginationPageSize: number
  cacheBlockSize: number
  defaultColDef
  rowData = this.escolaService.allInstalacoes()
  instalacoes = []
  estadoLivro
  public selectControl = new FormControl()
  public selectControl2 = new FormControl()
  public selectControl3 = new FormControl()

  columnDefs = [
    { headerName: 'ID', field: 'instalacoes_id', sortable: true, filter: true},
    { headerName: 'Instalacoes nome', field: 'instalacoes_nome', sortable: true, filter: true, },
  ];
  constructor(private escolaService: EscolasService) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      floatingFilter: true,
      resizable: true
    }
    this.paginationPageSize = 15
    this.cacheBlockSize = 15
    this.viewInstalacoes()
    this.updateInstalacoes()
    this.deleteInstalacoes()
  }

  ngOnInit(): void {
    this.getInstalacoes()
  }

  getInstalacoes(){
    this.escolaService.allInstalacoes().subscribe(res => {
      res.map( res => {
        this.instalacoes.push(`${res['instalacoes_nome']} - ${res['instalacoes_id']}`)
      } )
    })
  }

  updateInstalacoes(){
    this.selectControl.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/update/instalacoes/${Number(id[1])}`)
    })
  }

  viewInstalacoes(){
    this.selectControl2.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/get/instalacoes/${Number(id[1])}`)
    })
  }

  deleteInstalacoes(){
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
          this.escolaService.deleteInstalacoes(Number(id[1])).subscribe(res => {
            Swal.fire({title: 'Error', text: res['instalacoes'], icon: 'success', allowOutsideClick: false}).then(result => {
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
