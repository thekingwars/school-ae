import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CodesService } from 'src/app/services/students/codes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-code-phone',
  templateUrl: './verify-code-phone.component.html',
  styleUrls: ['./verify-code-phone.component.scss']
})
export class VerifyCodePhoneComponent implements OnInit {

  codeForm: FormGroup
  code: string

  constructor(private codeServices: CodesService, private fb: FormBuilder, private router: Router) {
    this.formCode()
  }

  ngOnInit(): void {
  }

  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.code = code
  }

  formCode(){
    this.codeForm = this.fb.group({
      PhoneCode: new FormControl('')
    })
  }

  onSubmit(){
    this.codeForm.setValue({PhoneCode: this.code})
    
    this.codeServices.codePhone(this.codeForm.value).subscribe(res => {
      Swal.fire('Correcto', res['mgs'], 'success')

      this.router.navigateByUrl('/teachers/login')
    },err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
