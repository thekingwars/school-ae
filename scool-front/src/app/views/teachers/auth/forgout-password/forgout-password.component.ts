import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students/students.service';
import { AuthService } from 'src/app/services/teachers/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgout-password',
  templateUrl: './forgout-password.component.html',
  styleUrls: ['./forgout-password.component.scss']
})
export class ForgoutPasswordComponent implements OnInit {

  emailForm: FormGroup
  reggexEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/

  constructor(private fb: FormBuilder, private authServices: AuthService) { 
    this.formEmail()
  }

  ngOnInit(): void {
  }

  formEmail(){
    this.emailForm = this.fb.group({
      professores_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)])
    })
  }

  getErrorMessage(field: string) {
    let error = this.emailForm.get(field);
    let message;

    if (error.errors.required) {
      message = 'O campo é obrigatório';
    }
    if (error.hasError('pattern')) {
      message = 'O e-mail é inválido';
    }

    return message;
  }

  isValidField(field: string) {
    const error = this.emailForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.authServices.forgoutPassword(this.emailForm.value).subscribe(res => {
      Swal.fire('Exito', res['msg'], 'success')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }
}
