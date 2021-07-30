import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EscolasService } from 'src/app/services/admin/escolas.service';

@Component({
  selector: 'app-views-salas',
  templateUrl: './views-salas.component.html',
  styleUrls: ['./views-salas.component.scss']
})
export class ViewsSalasComponent implements OnInit {
  id: number
  sala
  constructor(private escolaServices: EscolasService, private activatedRoute: ActivatedRoute) { 
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getSala(this.id)
  }

  getSala(id){
    this.escolaServices.getSalas(id).subscribe(res => {
      this.sala = res['salas']
    })
  }

}
