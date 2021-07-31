import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EscolasService } from 'src/app/services/admin/escolas.service';
import { PortugalService } from 'src/app/services/admin/portugal.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-create-escolas',
  templateUrl: './create-escolas.component.html',
  styleUrls: ['./create-escolas.component.scss']
})
export class CreateEscolasComponent implements OnInit {

  model = null
  escolaForm: FormGroup
  codigoPostal
  concelhos


  constructor(private fb: FormBuilder, private escolasServices: EscolasService, private router: Router, private portugalService: PortugalService) {
    this.formEscolas()
  }

  ngOnInit(): void {
    this.getCodigoPostal()
    this.getConcelho()
  }

  formEscolas(){
    this.escolaForm = this.fb.group({
      escola_nif: new FormControl('', [Validators.required]),
      escola_nome: new FormControl('', [Validators.required]),
      escola_rua: new FormControl('', [Validators.required]),
      escola_codigo_postal: new FormControl('', [Validators.required]),
      escola_data_nascimento: new FormControl('', Validators.required),
      escola_telemovel: new FormControl('', [Validators.required]),
      escola_freguesia: new FormControl('', [Validators.required]),
      escola_concelho: new FormControl('', [Validators.required]),
      escola_coordenador_foto: new FormControl('', [Validators.required])
    })
  }

  getCodigoPostal(){
    this.portugalService.getCodigoPostal().subscribe(res => {
      this.codigoPostal = res
    })  
  }

  getConcelho(){
    this.portugalService.getConcelho().subscribe(res => {
      this.concelhos = res
    })
  }

  ValidInput(field: string){
    const valid = this.escolaForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.escolaForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.escolaForm.patchValue({escola_coordenador_foto: this.model})

    const form: FormData = new FormData()
    form.append('escola_nif', this.escolaForm.controls['escola_nif'].value)
    form.append('escola_nome', this.escolaForm.controls['escola_nome'].value)
    form.append('escola_rua', this.escolaForm.controls['escola_rua'].value)
    form.append('escola_codigo_postal', this.escolaForm.controls['escola_codigo_postal'].value)
    form.append('escola_freguesia', this.escolaForm.controls['escola_freguesia'].value)
    form.append('escola_concelho', this.escolaForm.controls['escola_concelho'].value)
    form.append('escola_data_nascimento', this.escolaForm.controls['escola_data_nascimento'].value)
    form.append('escola_telemovel', this.escolaForm.controls['escola_telemovel'].value)
    form.append('escola_coordenador_foto', this.escolaForm.controls['escola_coordenador_foto'].value)
    
    this.escolasServices.createEscolas(form).subscribe(res => {
      this.router.navigateByUrl('/admin/profile/escolas')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
