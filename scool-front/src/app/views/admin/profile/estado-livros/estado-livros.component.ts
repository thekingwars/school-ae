import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LivrosService } from 'src/app/services/admin/livros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-livros',
  templateUrl: './estado-livros.component.html',
  styleUrls: ['./estado-livros.component.scss']
})
export class EstadoLivrosComponent implements OnInit {

  paginationPageSize: number
  cacheBlockSize: number
  defaultColDef
  rowData:any = this.livroServices.allEstadoLivros()
  livros = []
  public selectControl = new FormControl();
  public selectControl2 = new FormControl()
  public selectControl3 = new FormControl()

  columnDefs = [
    { headerName: 'ID', field: 'estado_livro_id', sortable: true, filter: true},
    { headerName: 'Estado livro nome', field: 'estado_livro_nome', sortable: true, filter: true, },
  ];

  constructor(private livroServices: LivrosService) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      floatingFilter: true,
      resizable: true
    }
    this.paginationPageSize = 15
    this.cacheBlockSize = 15
    this.updateEstadoLivro()
    this.viewEstadoLivro()
    this.deleteEstadoLivro()
  }

  ngOnInit(): void {
    this.livroServices.allEstadoLivros().subscribe(res => {
      res.map( res => {
        this.livros.push(`${res['estado_livro_nome']} - ${res['estado_livro_id']}`)
      } )
    })
  }

  updateEstadoLivro(){
    this.selectControl.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/update/estado-livros/${Number(id[1])}`)
    })
  }

  viewEstadoLivro(){
    this.selectControl2.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/get/estado-livros/${Number(id[1])}`)
    })
  }

  deleteEstadoLivro(){
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
          this.livroServices.deleteEstadoLivro(Number(id[1])).subscribe(res => {
            Swal.fire({title: 'Error', text: res['livros'], icon: 'error', allowOutsideClick: false}).then(result => {
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
