import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PortugalService } from 'src/app/services/admin/portugal.service';
import { CandidaturaService } from 'src/app/services/teachers/candidatura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidatura',
  templateUrl: './candidatura.component.html',
  styleUrls: ['./candidatura.component.scss']
})
export class CandidaturaComponent implements OnInit {

  candidaturaForm: FormGroup
  model = null
  id: number
  private reggexLetras: RegExp = /^([a-zA-Z-ñ ]+)(\s[a-zA-Z-ñ ]+)*$/

  constructor(private candidatura: CandidaturaService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router) { 
    this.formCandidatura()
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
  }

  formCandidatura(){
    this.candidaturaForm = this.fb.group({
      professor_lingua_nativa: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      professor_cv:  new FormControl('', [Validators.required])
    })
  }

  ValidInput(field: string){
    const valid = this.candidaturaForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.candidaturaForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.candidaturaForm.patchValue({professor_cv: this.model})
    const form = new FormData()
    const controls = this.candidaturaForm.controls

    form.append('professor_lingua_nativa', controls['professor_lingua_nativa'].value)
    form.append('professor_cv', controls['professor_cv'].value)

    this.candidatura.setCandidatura(form, this.id).subscribe(res => {
      Swal.fire('Enviado', res['msg'], 'success')
      this.router.navigateByUrl(`/teachers/profile/user/${this.id}`)
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
