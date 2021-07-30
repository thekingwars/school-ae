import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-escolas',
  templateUrl: './update-escolas.component.html',
  styleUrls: ['./update-escolas.component.scss']
})
export class UpdateEscolasComponent implements OnInit {

  escolaUpdateForm: FormGroup
  model = null
  id: number

  constructor(private fb: FormBuilder, private escolaServices: EscolasService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.formEscolas()
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.patchFormValue(this.id)
  }

  formEscolas(){
    this.escolaUpdateForm = this.fb.group({
      escola_rua: new FormControl('', [Validators.required]),
      escola_data_nascimento: new FormControl('', Validators.required),
      escola_telemovel: new FormControl('', [Validators.required]),
      escola_freguesia: new FormControl('', [Validators.required]),
      escola_coordenador_foto: new FormControl(null)
    })
  }

  patchFormValue(id){
    this.escolaServices.getEscolas(id).subscribe(res => {
      this.escolaUpdateForm.patchValue({
        escola_rua: res['escolas']['escola_rua'],
        escola_data_nascimento: res['escolas']['escola_data_nascimento'],
        escola_telemovel: res['escolas']['escola_telemovel'],
        escola_freguesia: res['escolas']['escola_freguesia'],
      })
    })
  }

  getErrorMessage(field: string) {
    let error = this.escolaUpdateForm.get(field);
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
    const valid = this.escolaUpdateForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.escolaUpdateForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.escolaUpdateForm.patchValue({escola_coordenador_foto: this.model})

    const form: FormData = new FormData()
    form.append('escola_rua', this.escolaUpdateForm.controls['escola_rua'].value)
    form.append('escola_freguesia', this.escolaUpdateForm.controls['escola_freguesia'].value)
    form.append('escola_data_nascimento', this.escolaUpdateForm.controls['escola_data_nascimento'].value)
    form.append('escola_telemovel', this.escolaUpdateForm.controls['escola_telemovel'].value)
    form.append('escola_coordenador_foto', this.escolaUpdateForm.controls['escola_coordenador_foto'].value)
    
    this.escolaServices.updateEscolas(form, this.id).subscribe(res => {
      this.router.navigateByUrl('admin/profile/escolas')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
