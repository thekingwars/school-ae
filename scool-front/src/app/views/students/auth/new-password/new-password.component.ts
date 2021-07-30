import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  passwordForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private studentServices: StudentsService) { 
    this.formPassword()
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
    const error = this.passwordForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }


  onSubmit(){
    const token = this.studentServices.getToken()
    this.studentServices.newPassword(this.passwordForm.value, token).subscribe(res => {
      console.log(res)
      Swal.fire('Exito', res['msg'], 'success')

      this.router.navigateByUrl('/students/login')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
