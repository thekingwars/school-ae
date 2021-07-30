import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/services/students/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-family',
  templateUrl: './edit-family.component.html',
  styleUrls: ['./edit-family.component.scss']
})
export class EditFamilyComponent implements OnInit {

  dadForm: FormGroup
  momForm: FormGroup
  userId: number
  private reggexEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
  private reggexNumber: RegExp = /^([0-9])*$/
  private reggexLetras: RegExp = /^([a-zA-Z ]+)(\s[a-zA-Z ]+)*$/

  constructor(private studentService: StudentsService, private fb: FormBuilder, private activatedRouter: ActivatedRoute) {  
    this.FormMom()
    this.FormDad()
   }

  ngOnInit(): void {
    this.getId()
  }

  FormDad() {
    this.dadForm = this.fb.group({
      aluno_pai_habilitacao: new FormControl('', [Validators.required, Validators.minLength(5)]),
      aluno_pai_formacao: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      aluno_pai_profissao: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      aluno_pai_contacto: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(this.reggexNumber)]),
      aluno_pai_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)]),
      aluno_pai_nome: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)])
    })
  }

  FormMom() {
    this.momForm = this.fb.group({
      aluno_mae_habilitacao: new FormControl('', [Validators.required, Validators.minLength(5)]),
      aluno_mae_formacao: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      aluno_mae_profissao: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      aluno_mae_contacto: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(this.reggexNumber)]),
      aluno_mae_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)]),
      aluno_mae_nome: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)])
    })
  }

  getId(): void {
    this.activatedRouter.params.subscribe(params => {
      this.userId = Number(params['id'])
      console.log(this.userId)
    })
  }


  onSubmit(){
    this.studentService.studentDad(this.dadForm.value, this.userId).subscribe(res => {
      Swal.fire('Success', 'Información del padre insertada con exito', 'success')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

  ValidInputDad(field: string){
    const valid = this.dadForm.get(field).valid

    return valid
  }

  isValidFieldDad(field: string) {
    const error = this.dadForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmitMom(){
    this.studentService.studentMom(this.momForm.value, this.userId).subscribe(res => {
      Swal.fire('Success', 'Información de la madre insertada con exito', 'success')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

  
  ValidInputMom(field: string){
    const valid = this.momForm.get(field).valid

    return valid
  }

  isValidFieldMom(field: string) {
    const error = this.momForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

}
