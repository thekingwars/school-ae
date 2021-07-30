import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/teachers/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  reggexEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
  private reggexNumber: RegExp = /^([0-9])*$/
  private reggexLetras: RegExp = /^([a-zA-Z ]+)(\s[a-zA-Z ]+)*$/

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.FormRegister()
  }

  ngOnInit(): void {
  }
  
  FormRegister(): void{
    this.registerForm = this.fb.group({
      professor_nome: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      professor_telemovel: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(this.reggexNumber)]),
      professor_habilitacao: new FormControl('', [Validators.required]),
      professor_formacao: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      professores_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)]),
      professores_password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  getErrorMessage(field: string): string {
    let error = this.registerForm.get(field);
    let message;

    if (error.errors.required) {
      message = 'Campo é obrigatório';
    }
    if (error.hasError('minlength')) {
      message = 'Deve colocar o minimo de 6 carateres';
    }
    if (error.hasError('pattern')) {
      message = 'Email é invalido';
    }

    return message;
  }

  
  getErrorMessageLetras(field: string): string {
    let error = this.registerForm.get(field);
    let message;

    if (error.errors.required) {
      message = 'Campo é obrigatório';
    }
    if (error.hasError('pattern')) {
      message = 'Não são permitidos caracteres e números especiais';
    }

    return message;
  }

  
  getErrorMessageNumber(field: string): string {
    let error = this.registerForm.get(field);
    let message;

    if (error.errors.required) {
      message = 'Campo é obrigatório';
    }
    if (error.hasError('minlength')) {
      message = 'Deve colocar o minimo de 9 carateres';
    }
    if (error.hasError('pattern')) {
      message = 'Só são permitidos números';
    }

    return message;
  }

  isValidField(field: string): boolean {
    const error = this.registerForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(): void{
    this.authService.registerTeacher(this.registerForm.value).subscribe(res => {
      Swal.fire('Correcto', res['msg'], 'success')
      console.log(res)

      this.router.navigateByUrl('/teachers/VerifyCode')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error');
    })
  }
}
