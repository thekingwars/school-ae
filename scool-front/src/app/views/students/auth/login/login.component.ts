import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students/students.service';
import Swal from 'sweetalert2';
import '@sweetalert2/themes/dark/dark.scss';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  studentForm: FormGroup
  reggexEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/

  constructor(private fb: FormBuilder, private studentServices: StudentsService, private router: Router) {
    this.studentFormValidate()
  }

  ngOnInit(): void {
 
  }

  studentFormValidate(){
    this.studentForm = this.fb.group({
      aluno_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)]),
      aluno_password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  getErrorMessage(field: string) {
    let error = this.studentForm.get(field);
    let message;

    if (error.errors.required) {
      message = 'O campo é obrigatório';
    }
    if (error.hasError('minlength')) {
      message = 'Deve introduzir um mínimo de 6 caracteres';
    }
    if (error.hasError('pattern')) {
      message = 'O e-mail é inválido';
    }

    return message;
  }

  isValidField(field: string) {
    const error = this.studentForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  loginStudent(){
    this.studentServices.loginStudents(this.studentForm.value).subscribe(res => {
      Swal.fire('ok', 'Todo bien', 'success')
      console.log(res)
      this.router.navigateByUrl(`/students/profile/user/${res['student']['aluno_id']}`)
    }, err => {

      console.log(err)

      if(err.status === 406){
        Swal.fire('Error', 'Deve validar o seu e-mail e número de telefone a fim de iniciar sessão.', 'error').then(result => {
          if(result.isConfirmed){
            this.router.navigateByUrl(`/students/verifyCodePhone`)
          }
        })
        return
      }
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }
}
