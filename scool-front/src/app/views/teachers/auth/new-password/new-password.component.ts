import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students/students.service';
import { AuthService } from 'src/app/services/teachers/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  passwordForm: FormGroup
  token: string

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) { 
    this.formPassword()
    this.token = this.activatedRoute.snapshot.paramMap.get('token')
   }

  ngOnInit(): void {
  }

  formPassword(){
    this.passwordForm = this.fb.group({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  getErrorMessage(field: string) {
    let error = this.passwordForm.get(field);
    let message;

    if (error.errors.required) {
      message = 'O campo é obrigatório';
    }
    if (error.hasError('minlength')) {
      message = 'Deve introduzir um mínimo de 6 caracteres';
    }

    return message;
  }

  isValidField(field: string) {
    const error = this.passwordForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }


  onSubmit(){
    this.authService.newPassword(this.passwordForm.value, this.token).subscribe(res => {
      console.log(res)
      Swal.fire('Exito', res['msg'], 'success')

      this.router.navigateByUrl('/teachers/login')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
