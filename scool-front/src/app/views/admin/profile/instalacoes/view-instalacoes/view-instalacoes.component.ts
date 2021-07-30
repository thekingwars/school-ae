import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EscolasService } from 'src/app/services/admin/escolas.service';

@Component({
  selector: 'app-view-instalacoes',
  templateUrl: './view-instalacoes.component.html',
  styleUrls: ['./view-instalacoes.component.scss']
})
export class ViewInstalacoesComponent implements OnInit {

  instalacoes
  id: number

  constructor(private escolaService: EscolasService, private activatedRoute: ActivatedRoute) { 
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getEscola(this.id)
    console.log(this.id)
  }

  getEscola(id){
    this.escolaService.getInstalacoes(id).subscribe(res => {
      this.instalacoes = res['instalacoes']
    })
  }
}
