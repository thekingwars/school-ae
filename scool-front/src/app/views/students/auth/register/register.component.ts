import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students/students.service';
import sweet from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  age;
  showAge;
  registerForm: FormGroup;
  private reggexEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
  private reggexLetras: RegExp = /^([a-zA-Z ]+)(\s[a-zA-Z ]+)*$/
  public codePhone: Array<string> = []
 

  constructor(private fb: FormBuilder, private studentServices: StudentsService, private router: Router) { 
    this.FormRegister()
  }

  ngOnInit(): void {
    this.codePhone = ['+351', '+358', '+49', '+43', '+32', '34', '+58']
  }

  onFocusOutEvent(event){
    if(this.age){
      const convertAge = new Date(this.age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      this.registerForm.patchValue({
        aluno_idad: this.showAge
      })
    }
 }
  
  FormRegister(): void{
    this.registerForm = this.fb.group({
      aluno_nome: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      aluno_telemovel: new FormControl('', [Validators.required]),
      aluno_habilitacao: new FormControl('', [Validators.required]),
      aluno_email: new FormControl('', [Validators.required, Validators.pattern(this.reggexEmail)]),
      code_phone: new FormControl('+351', [Validators.required]),
      aluno_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      aluno_password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
      aluno_idad: new FormControl('', [Validators.required]),
      aluno_data_nascimento: new FormControl('', [Validators.required])
    }, {
      validators: this.validarQueSeanIguales
    })
  }

  checarSiSonIguales(): boolean {
    return this.registerForm.hasError('noSonIguales') &&
      this.registerForm.get('aluno_password').dirty &&
      this.registerForm.get('aluno_password2').dirty;
  }

  validarQueSeanIguales: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('aluno_password');
    const confirmarPassword = control.get('aluno_password2');
  
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

  isValidField(field: string): boolean {
    const error = this.registerForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(): void{

    const newTelemovel = this.registerForm.controls['code_phone'].value + this.registerForm.controls['aluno_telemovel'].value

    this.registerForm.controls['aluno_telemovel'].setValue(newTelemovel)
    console.log(this.registerForm.value)
    this.studentServices.registerStudents(this.registerForm.value).subscribe(res => {
      sweet.fire('Correcto', res['msg'], 'success')

      this.router.navigateByUrl('/students/verifyCodePhone')
    }, err => {
      sweet.fire('Error', err['error']['err'], 'error');
      this.registerForm.controls['aluno_telemovel'].setValue('')
    })
  }
}
