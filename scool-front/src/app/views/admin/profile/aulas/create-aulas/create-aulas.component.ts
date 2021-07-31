import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Escolas } from 'src/app/models/escolas.models';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-aulas',
  templateUrl: './create-aulas.component.html',
  styleUrls: ['./create-aulas.component.scss']
})
export class CreateAulasComponent implements OnInit {

  aulasForm: FormGroup
  salas: object[] = []

  constructor(private fb: FormBuilder, private router: Router, private escolaService: EscolasService) { 

  }

  ngOnInit(): void {
    this.formAulas()
    this.getSalas()
  }

  formAulas(){
    this.aulasForm = this.fb.group({
      aulas_num: new FormControl('', [Validators.required]),
      aulas_data: new FormControl('', [Validators.required]),
      aula_hora_entrada_prevista: new FormControl('', [Validators.required]),
      aula_hora_entrada: new FormControl('', [Validators.required]),
      aula_hora_saida_prevista: new FormControl('', [Validators.required]),
      aula_hora_saida: new FormControl('', [Validators.required]),
      aula_unidade: new FormControl('', [Validators.required]),
      aula_obs: new FormControl('', [Validators.required]),
      salas_fk: new FormControl('', [Validators.required])
    })
  }

  getSalas(){
    this.escolaService.allSalas().subscribe(res => {
      console.log(res)
      this.salas = res
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

  getErrorMessage(field: string) {
    let error = this.aulasForm.get(field);
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
    const valid = this.aulasForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.aulasForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.escolaService.createAulas(this.aulasForm.value).subscribe(res => {
      this.router.navigateByUrl('/admin/profile/aulas')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
