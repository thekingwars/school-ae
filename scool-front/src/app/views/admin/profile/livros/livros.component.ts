import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LivrosService } from 'src/app/services/admin/livros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})
export class LivrosComponent implements OnInit {

  paginationPageSize: number
  cacheBlockSize: number
  defaultColDef
  rowData:any = this.livroServices.allLivros()
  livros = []
  estadoLivro
  public selectControl = new FormControl();
  public selectControl2 = new FormControl()
  public selectControl3 = new FormControl()

  columnDefs = [
      { headerName: 'ID', field: 'livro_id', sortable: true, filter: true},
      { headerName: 'Livro nome', field: 'livro_nome', sortable: true, filter: true, },
      { headerName: 'Livro isbn', field: 'livro_isbn', sortable: true, filter: true },
      { headerName: 'Livro ano edicao', field: 'livro_ano_edicao', sortable: true, filter: true},
      { headerName: 'Livro gr etario', field: 'livro_gr_etario', sortable: true, filter: true},
      { headerName: 'Livro lingua', field: 'livro_lingua', sortable: true, filter: true},
      { headerName: 'Livro nivel', field: 'livro_nivel', sortable: true, filter: true},
      { headerName: 'Livro programa', field: 'livro_programa', sortable: true, filter: true},
      { headerName: 'Livro valor venda', field: 'livro_valor_venda', sortable: true, filter: true},
  ];

  constructor(private livroServices: LivrosService, private router: Router, private fb: FormBuilder) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      floatingFilter: true,
      resizable: true
    }
    this.paginationPageSize = 15
    this.cacheBlockSize = 15
    this.deleteLivro()
    this.updateLivro()
    this.viewLivro()
  }

  ngOnInit(): void {
    this.livroServices.allLivros().subscribe(res => {
      res.map( res => {
        this.livros.push(`${res['livro_nome']} - ${res['livro_id']}`)
      } )
    })
  }

  updateLivro(){
    this.selectControl.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/update/livros/${Number(id[1])}`)
    })
  }

  viewLivro(){
    this.selectControl2.valueChanges.subscribe(res => {
      let id
      id = res.split('-')
      window.open(`/admin/profile/get/livros/${Number(id[1])}`)
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
          this.livroServices.deleteLivro(Number(id[1])).subscribe(res => {
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
