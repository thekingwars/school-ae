import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/teachers/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  studentForm: FormGroup
  reggexEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/

  constructor(private fb: FormBuilder, private authServices: AuthService, private router: Router) {
    this.studentFormValidate()
  }

  ngOnInit(): void {
 
  }

  studentFormValidate(){
    this.studentForm = this.fb.group({
      professores_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)]),
      professores_password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  getErrorMessage(field: string) {
    let error = this.studentForm.get(field);
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
    const error = this.studentForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  loginStudent(){
    this.authServices.loginTeacher(this.studentForm.value).subscribe(res => {
      Swal.fire('ok', 'Todo bien', 'success')
      console.log(res)
      this.router.navigateByUrl(`/teachers/profile/user/${res['professor']['professor_id']}`)
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }
}
