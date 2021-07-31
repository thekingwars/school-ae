import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminForm: FormGroup
  reggexEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/

  constructor(private adminServices: AdminService, private fb: FormBuilder, private router: Router) {
    this.formFb()
  }

  ngOnInit(): void {
  }

  formFb(){
    this.adminForm = this.fb.group({
      admin_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)]),
      admin_password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  getErrorMessage(field: string) {
    let error = this.adminForm.get(field);
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
    const error = this.adminForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }


  onSubmit(){
    this.adminServices.loginAdmin(this.adminForm.value).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('/admin/profile')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
