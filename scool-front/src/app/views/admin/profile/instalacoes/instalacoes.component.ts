import { Component, OnInit } from '@angular/core';
import { EscolasService } from 'src/app/services/admin/escolas.service';

@Component({
  selector: 'app-instalacoes',
  templateUrl: './instalacoes.component.html',
  styleUrls: ['./instalacoes.component.scss']
})
export class InstalacoesComponent implements OnInit {

  constructor(private escolaService: EscolasService) { }

  ngOnInit(): void {
    this.getInstalacoes()
  }

  getInstalacoes(){
    this.escolaService.allInstalacoes().subscribe(res => {
      console.log(res['instalacoes'])
    })
  }

}
