import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CandidaturaService } from 'src/app/services/admin/candidatura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidatura',
  templateUrl: './candidatura.component.html',
  styleUrls: ['./candidatura.component.scss']
})
export class CandidaturaComponent implements OnInit, OnDestroy {

  unsubscribe: Subscription[] = []
  items: MenuItem[]
  teachers: object[]
  selectedTeacher: object
  icons
  first = 0;
  rows = 10;
  confirm: object
  subscription: Subscription
  display: boolean = false

  constructor(private candidaturaService: CandidaturaService) {
    this.icons = {
        verificado: '<i class="pi pi-check"></i>',
        noVerificado: '<i class="pi pi-check"></i>'
    }
  }

  ngOnInit(): void {
    this.getCandidatura()
    this.items = [
        {label: 'Aprovar', icon: 'pi pi-fw pi-search', command: () => this.display = true },
    ];

    this.subscription = this.candidaturaService.refresh$.subscribe(() => this.getCandidatura())
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.unsubscribe.forEach(data => {
      data.unsubscribe()
    })
  }

  getCandidatura(){
    this.unsubscribe.push(this.candidaturaService.getAllCandidatura().subscribe(data => this.teachers = data))
  }

  validar(event, id){

    if(event){
      this.confirm = {
        confirm: true
      }
    }
    else{
      this.confirm = {
        confirm: false
      }
    }

    this.unsubscribe.push(this.candidaturaService.verifyCandidatura(this.confirm, id).subscribe(res => {
      Swal.fire('Great', res['msg'], 'success')
      this.display = false
    }, err => {
       Swal.fire('Error', err['error']['err'], 'error')
    }))
  }

}
