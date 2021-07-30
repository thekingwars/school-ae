import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-student',
  templateUrl: './info-student.component.html',
  styleUrls: ['./info-student.component.scss']
})
export class InfoStudentComponent implements OnInit {

  studentForm: FormGroup
  model = null
  id: number
  private reggexLetras: RegExp = /^([a-zA-Z ]+)(\s[a-zA-Z ]+)*$/

  constructor(private studentService: StudentsService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.formFb()
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
  }
  
  formFb(){
    this.studentForm = this.fb.group({
      aluno_sexo: new FormControl('', [Validators.required]),
      aluno_nacionalidade: new FormControl('', [Validators.required, Validators.pattern(this.reggexLetras)]),
      aluno_tipo_doc_ident: new FormControl('', [Validators.required]),
      aluno_num_doc_ident: new FormControl('', [Validators.required]),
      aluno_data_nascimento: new FormControl('', [Validators.required]),
      aluno_nif: new FormControl('', [Validators.required]),
      aluno_foto: new FormControl('', [Validators.required])
    })
  }
  ValidInput(field: string){
    const valid = this.studentForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.studentForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){

    this.studentForm.patchValue({ aluno_foto: this.model })

    const form = new FormData()
    const controls = this.studentForm.controls

    form.append('aluno_sexo', controls['aluno_sexo'].value)
    form.append('aluno_nacionalidade', controls['aluno_nacionalidade'].value)
    form.append('aluno_tipo_doc_ident', controls['aluno_tipo_doc_ident'].value)
    form.append('aluno_num_doc_ident', controls['aluno_num_doc_ident'].value)
    form.append('aluno_data_nascimento', controls['aluno_data_nascimento'].value)
    form.append('aluno_nif', controls['aluno_nif'].value)
    form.append('aluno_foto', controls['aluno_foto'].value)


    this.studentService.updateStudent(form, this.id).subscribe(res => {
      this.router.navigateByUrl(`/students/profile/user/${this.id}`)
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })

  }

}
