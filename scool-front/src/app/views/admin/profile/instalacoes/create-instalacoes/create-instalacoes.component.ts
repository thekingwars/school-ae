import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-instalacoes',
  templateUrl: './create-instalacoes.component.html',
  styleUrls: ['./create-instalacoes.component.scss']
})
export class CreateInstalacoesComponent implements OnInit {

  instalacoesForm: FormGroup
  escolas

  constructor(private fb: FormBuilder, private router: Router, private escolaService: EscolasService) { }

  ngOnInit(): void {
    this.formInstalacoes()
    this.getEscolas()
  }

  formInstalacoes(){
    this.instalacoesForm = this.fb.group({
      instalacoes_nome: new FormControl('', [Validators.required]),
      escolas_fk: new FormControl('', [Validators.required])
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

  getErrorMessage(field: string) {
    let error = this.instalacoesForm.get(field);
    let message;

    if (error.errors.required) {
      message = 'El campo es requerido';
    }
    if (error.hasError('minlength')) {
      message = 'Debe colocar un minimo de 6 caracteres';
    }
    if (error.hasError('pattern')) {
      message = 'El email es invalido';
    }

    return message;
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
    this.escolaService.createInstalacoes(this.instalacoesForm.value).subscribe(res => {
      this.router.navigateByUrl('/admin/profile/instalacoes')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
