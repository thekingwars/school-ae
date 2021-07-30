import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Escolas } from 'src/app/models/escolas.models';
import { EscolasService } from 'src/app/services/admin/escolas.service';

@Component({
  selector: 'app-view-escola',
  templateUrl: './view-escola.component.html',
  styleUrls: ['./view-escola.component.scss']
})
export class ViewEscolaComponent implements OnInit {

  escola: Escolas
  id: number

  constructor(private activatedRoute: ActivatedRoute, private escolasServices: EscolasService) { 
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getEscola(this.id)
  }


  getEscola(id){
    this.escolasServices.getEscolas(id).subscribe(res => {
      this.escola = res['escolas']
      console.log(JSON.stringify(this.escola['escola_coordenador_foto']))
    })
  }
}
