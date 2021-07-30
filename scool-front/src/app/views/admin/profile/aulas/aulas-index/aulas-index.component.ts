import { Component, OnInit } from '@angular/core';
import { EscolasService } from 'src/app/services/admin/escolas.service';

@Component({
  selector: 'app-aulas-index',
  templateUrl: './aulas-index.component.html',
  styleUrls: ['./aulas-index.component.scss']
})
export class AulasIndexComponent implements OnInit {
  aulas: object[]

  constructor(private escolaServices: EscolasService) { }

  ngOnInit(): void {
    this.getAulas()
  }

  getAulas(){
    this.escolaServices.allAulas().subscribe(res => {
      this.aulas = res['aulas']
      console.log(res['aulas'])
    })
  }

}
