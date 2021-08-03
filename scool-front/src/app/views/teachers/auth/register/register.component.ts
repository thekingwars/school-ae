import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  public codePhone: Array<string> = []

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.FormRegister()
  }

  ngOnInit(): void {
    this.codePhone = ['+351', '+358', '+49', '+43', '+32', '34', '+58']
  }
  
  FormRegister(): void{
    this.registerForm = this.fb.group({
      professor_nome: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      professor_telemovel: new FormControl('', [Validators.required, Validators.pattern(this.reggexNumber)]),
      professor_habilitacao: new FormControl('', [Validators.required]),
      professores_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)]),
      code_phone: new FormControl('+351', [Validators.required]),
      professores_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      professores_password2: new FormControl('',[Validators.required, Validators.minLength(6)])
    }, {
      validators: this.validarQueSeanIguales
    })
  }

  checarSiSonIguales(): boolean {
    return this.registerForm.hasError('noSonIguales') &&
      this.registerForm.get('professores_password').dirty &&
      this.registerForm.get('professores_password2').dirty;
  }

  validarQueSeanIguales: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('professores_password');
    const confirmarPassword = control.get('professores_password2');
  
    return password.value === confirmarPassword.value ? null : { 'noSonIguales': true };
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

    this.registerForm.patchValue({professor_telemovel: this.registerForm.controls['code_phone'].value + this.registerForm.controls['professor_telemovel'].value})

    this.authService.registerTeacher(this.registerForm.value).subscribe(res => {
      Swal.fire('Correcto', res['msg'], 'success')
      console.log(res)

      this.router.navigateByUrl('/teachers/VerifyCode')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error');
      this.registerForm.controls['professor_telemovel'].setValue('')
    })
  }
}
