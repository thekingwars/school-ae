import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Escolas } from 'src/app/models/escolas.models';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-salas',
  templateUrl: './update-salas.component.html',
  styleUrls: ['./update-salas.component.scss']
})
export class UpdateSalasComponent implements OnInit {

  model = null
  salasUpdateForm: FormGroup
  escolas: Escolas[] = []
  id: number

  constructor(private fb: FormBuilder, private router: Router, private escolaServices: EscolasService, private activatedRoute: ActivatedRoute) { 
    this.formSalas()
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getEscolas()
    this.patchValueForm(this.id)
  }

  formSalas(){
    this.salasUpdateForm = this.fb.group({
      sala_nome: new FormControl('', [Validators.required]),
      sala_capacidade_aconselhada: new FormControl('', [Validators.required]),
      sala_capacidade_maxima: new FormControl('', [Validators.required]),
      sala_equipamento_quantidade: new FormControl('', [Validators.required]),
      sala_foto: new FormControl(null),
      escolas_fk: new FormControl('', [Validators.required])
    })
  }

  patchValueForm(id){
    this.escolaServices.getSalas(id).subscribe(res => {
      this.salasUpdateForm.patchValue({
        sala_nome: res['salas']['sala_nome'],
        sala_capacidade_aconselhada: res['salas']['sala_capacidade_aconselhada'],
        sala_capacidade_maxima: res['salas']['sala_capacidade_maxima'],
        sala_equipamento_quantidade: res['salas']['sala_equipamento_quantidade'],
        escolas_fk: res['salas']['escolas_fk']
      })
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
    let error = this.salasUpdateForm.get(field);
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
    const valid = this.salasUpdateForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.salasUpdateForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    const form: FormData = new FormData()
    const controls = this.salasUpdateForm.controls
    this.salasUpdateForm.patchValue({sala_foto: this.model})

    form.append('sala_nome', controls['sala_nome'].value)
    form.append('sala_capacidade_aconselhada', controls['sala_capacidade_aconselhada'].value)
    form.append('sala_capacidade_maxima', controls['sala_capacidade_maxima'].value)
    form.append('sala_equipamento_quantidade', controls['sala_equipamento_quantidade'].value)
    form.append('escolas_fk', controls['escolas_fk'].value)
    form.append('sala_foto', this.salasUpdateForm.controls['sala_foto'].value)

    this.escolaServices.updateSalas(form, this.id).subscribe(res => {
      this.router.navigateByUrl('/admin/profile/salas')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }
}
