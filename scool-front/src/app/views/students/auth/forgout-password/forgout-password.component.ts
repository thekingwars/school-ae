import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgout-password',
  templateUrl: './forgout-password.component.html',
  styleUrls: ['./forgout-password.component.scss']
})
export class ForgoutPasswordComponent implements OnInit {

  emailForm: FormGroup
  reggexEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/

  constructor(private fb: FormBuilder, private studentServices: StudentsService) { 
    this.formEmail()
  }

  ngOnInit(): void {
  }

  formEmail(){
    this.emailForm = this.fb.group({
      aluno_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)])
    })
  }

  getErrorMessage(field: string) {
    let error = this.emailForm.get(field);
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

  isValidField(field: string) {
    const error = this.emailForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.studentServices.fotgoutPassword(this.emailForm.value).subscribe(res => {
      console.log(res)
      Swal.fire('Exito', res['msg'], 'success')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
