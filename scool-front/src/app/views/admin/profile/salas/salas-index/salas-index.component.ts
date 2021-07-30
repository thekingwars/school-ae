import { Component, OnInit } from '@angular/core';
import { EscolasService } from 'src/app/services/admin/escolas.service';

@Component({
  selector: 'app-salas-index',
  templateUrl: './salas-index.component.html',
  styleUrls: ['./salas-index.component.scss']
})
export class SalasIndexComponent implements OnInit {

  constructor(private escolaServices: EscolasService) { }

  ngOnInit(): void {
    this.getSalas()
  }

  getSalas(){
    this.escolaServices.allSalas().subscribe(res => {
      console.log(res)
    })
  }
}
