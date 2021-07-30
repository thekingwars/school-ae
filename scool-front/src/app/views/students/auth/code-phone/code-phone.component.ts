import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CodesService } from 'src/app/services/students/codes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-phone',
  templateUrl: './code-phone.component.html',
  styleUrls: ['./code-phone.component.scss']
})
export class CodePhoneComponent implements OnInit {

  code: string
  codeForm: FormGroup

  constructor(private codeServices: CodesService, private fb: FormBuilder, private router: Router) {
    this.Formcode()
  }

  ngOnInit(): void {

  }

  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string): string {
    return this.code = code
  }

  Formcode(): void{
    this.codeForm = this.fb.group({
      PhoneCode: new FormControl('')
    })
  }

  onSubmit(): void{
    this.codeForm.setValue({PhoneCode: this.code})
    
    this.codeServices.codePhone(this.codeForm.value).subscribe(res => {
      Swal.fire('Correcto', res['mgs'], 'success')

      this.router.navigateByUrl('/students/verifyCodeEmail')
    },err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
