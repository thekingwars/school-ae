import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-aulas',
  templateUrl: './update-aulas.component.html',
  styleUrls: ['./update-aulas.component.scss']
})
export class UpdateAulasComponent implements OnInit {

  aulasUpdateForm: FormGroup
  salas: object[] = []
  id: number;

  constructor(private fb: FormBuilder, private router: Router, private escolaService: EscolasService, private activateRoute: ActivatedRoute) {
    this.id = Number(this.activateRoute.snapshot.paramMap.get('id'))
    this.formAulas()
  }

  ngOnInit(): void {
    this.getEscolas()
    this.patchValueForm(this.id)
  }

  formAulas(){
    this.aulasUpdateForm = this.fb.group({
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

  getEscolas(){
    this.escolaService.allSalas().subscribe(res => {
      this.salas = res
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

  patchValueForm(id){
    this.escolaService.getAulas(id).subscribe(res => {
      this.aulasUpdateForm.patchValue({
        aulas_num: res['aulas']['aulas_num'],
        aulas_data: format(new Date(res.aulas.aulas_data), 'yyyy-MM-dd'),
        aula_hora_entrada: format(new Date(res.aulas.aula_hora_entrada), `yyyy-MM-dd'T'HH:mm:ss`),
        aula_hora_saida: format(new Date(res.aulas.aula_hora_saida), `yyyy-MM-dd'T'HH:mm:ss`),
        aula_hora_entrada_prevista: res['aulas']['aula_hora_entrada_prevista'],
        aula_hora_saida_prevista: res['aulas']['aula_hora_saida_prevista'],
        aula_unidade: res['aulas']['aula_unidade'],
        aula_obs: res['aulas']['aula_obs'],
        salas_fk: res['aulas']['salas_fk']
      })
    })
  }

  getErrorMessage(field: string) {
    let error = this.aulasUpdateForm.get(field);
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
    const valid = this.aulasUpdateForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.aulasUpdateForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.escolaService.updateAulas(this.aulasUpdateForm.value, this.id).subscribe( res => {
      this.router.navigateByUrl('/admin/profile/aulas')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }
}