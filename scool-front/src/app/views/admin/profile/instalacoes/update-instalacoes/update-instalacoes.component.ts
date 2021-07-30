import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-instalacoes',
  templateUrl: './update-instalacoes.component.html',
  styleUrls: ['./update-instalacoes.component.scss']
})
export class UpdateInstalacoesComponent implements OnInit {

  instalacoesForm: FormGroup
  id: number
  escolas

  constructor(private fb: FormBuilder, private router: Router, private escolaService: EscolasService, private activatedRoute: ActivatedRoute) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id')  )
  }

  ngOnInit(): void {
    this.formInstalacoes()
    this.getEscolas()
    this.getInstalacoes(this.id)
  }

  formInstalacoes(){
    this.instalacoesForm = this.fb.group({
      instalacoes_nome: new FormControl('', [Validators.required]),
      escolas_fk: new FormControl('', [Validators.required])
    })
  }

  getInstalacoes(id){
    this.escolaService.getInstalacoes(id).subscribe(res => {
      this.instalacoesForm.patchValue({
        instalacoes_nome: res['instalacoes']['instalacoes_nome'],
        escolas_fk: res['instalacoes']['escola_id']
      })
    })
  }

  getEscolas(){
    this.escolaService.allEscolas().subscribe(res => {
      this.escolas = res['escolas']
      console.log(this.escolas)
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

  ValidInput(field: string){
    const valid = this.instalacoesForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.instalacoesForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.escolaService.updateInstalacoes(this.instalacoesForm.value, this.id).subscribe(res => {
      this.router.navigateByUrl('/admin/profile/instalacoes')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
