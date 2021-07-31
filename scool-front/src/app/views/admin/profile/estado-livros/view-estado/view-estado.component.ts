import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivrosService } from 'src/app/services/admin/livros.service';

@Component({
  selector: 'app-view-estado',
  templateUrl: './view-estado.component.html',
  styleUrls: ['./view-estado.component.scss']
})
export class ViewEstadoComponent implements OnInit {

  id: number
  estadoLivro
  
  constructor(private livroServices: LivrosService, private activatedRoute: ActivatedRoute) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getEstadoLivro(this.id)
  }

  getEstadoLivro(id){
    this.livroServices.getEstadoLivro(id).subscribe(res => {
      this.estadoLivro = res
    })
  }

}
