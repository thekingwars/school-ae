import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livros } from 'src/app/models/livros.models';
import { LivrosService } from 'src/app/services/admin/livros.service';

@Component({
  selector: 'app-view-livros',
  templateUrl: './view-livros.component.html',
  styleUrls: ['./view-livros.component.scss']
})
export class ViewLivrosComponent implements OnInit {

  livro: Livros
  id: number

  constructor(private livroService: LivrosService, private activatedRoute: ActivatedRoute) { 
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getLivro(this.id)
  }

  getLivro(id){
    this.livroService.getLivro(id).subscribe(res => {
      this.livro = res
    })
  }

}
