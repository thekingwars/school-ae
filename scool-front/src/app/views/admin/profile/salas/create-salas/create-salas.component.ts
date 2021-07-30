import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Escolas } from 'src/app/models/escolas.models';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-salas',
  templateUrl: './create-salas.component.html',
  styleUrls: ['./create-salas.component.scss']
})
export class CreateSalasComponent implements OnInit {

  model = null
  salasForm: FormGroup
  escolas: Escolas[] = []

  constructor(private fb: FormBuilder, private router: Router, private escolaServices: EscolasService) { }

  ngOnInit(): void {
    this.formSalas()
    this.getEscolas()
  }

  formSalas(){
    this.salasForm = this.fb.group({
      sala_nome: new FormControl('', [Validators.required]),
      sala_capacidade_aconselhada: new FormControl('', [Validators.required]),
      sala_capacidade_maxima: new FormControl('', [Validators.required]),
      sala_equipamento_quantidade: new FormControl('', [Validators.required]),
      sala_foto: new FormControl('', [Validators.required]),
      escolas_fk: new FormControl('', [Validators.required])
    })
  }

  getEscolas(){
    this.escolaServices.allEscolas().subscribe(res => {
      console.log(res['escolas'])
      this.escolas = res['escolas']
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }
  
  getErrorMessage(field: string) {
    let error = this.salasForm.get(field);
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
    const valid = this.salasForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.salasForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    const form: FormData = new FormData()
    const controls = this.salasForm.controls
    this.salasForm.patchValue({sala_foto: this.model})

    form.append('sala_nome', controls['sala_nome'].value)
    form.append('sala_capacidade_aconselhada', controls['sala_capacidade_aconselhada'].value)
    form.append('sala_capacidade_maxima', controls['sala_capacidade_maxima'].value)
    form.append('sala_equipamento_quantidade', controls['sala_equipamento_quantidade'].value)
    form.append('escolas_fk', controls['escolas_fk'].value)
    form.append('sala_foto', this.salasForm.controls['sala_foto'].value, this.salasForm.controls['sala_foto'].value['name'])

    this.escolaServices.createSalas(form).subscribe(res => {
      this.router.navigateByUrl('/admin/profile/salas')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }
}
