import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CodesService } from 'src/app/services/students/codes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-email',
  templateUrl: './code-email.component.html',
  styleUrls: ['./code-email.component.scss']
})
export class CodeEmailComponent implements OnInit {

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
      EmailCode: new FormControl('')
    })
  }

  onSubmit(){
    this.codeForm.setValue({EmailCode: this.code})
    this.codeServices.codeEmail(this.codeForm.value).subscribe(res => {
      console.log(res)
      Swal.fire('Correcto', res['mgs'], 'success')

      this.router.navigateByUrl('/students/login')
    },err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
