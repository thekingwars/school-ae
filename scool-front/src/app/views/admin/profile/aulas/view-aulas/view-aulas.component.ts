import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EscolasService } from 'src/app/services/admin/escolas.service';

@Component({
  selector: 'app-view-aulas',
  templateUrl: './view-aulas.component.html',
  styleUrls: ['./view-aulas.component.scss']
})
export class ViewAulasComponent implements OnInit {

  id: number
  aulas

  constructor(private escolaServices: EscolasService, private activatedRoute: ActivatedRoute) {

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))

  }

  ngOnInit(): void {
    this.getAula(this.id)
  }

  getAula(id){
    this.escolaServices.getAulas(id).subscribe(res => {
      this.aulas = res['aulas']
      console.log(res)
    })
  }
}
