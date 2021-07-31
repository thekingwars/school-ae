import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LivrosService } from 'src/app/services/admin/livros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-livros',
  templateUrl: './create-livros.component.html',
  styleUrls: ['./create-livros.component.scss']
})
export class CreateLivrosComponent implements OnInit {

  livroForm: FormGroup

  constructor(private fb: FormBuilder, private livroServices: LivrosService, private router: Router) {
    this.formFb()
  }

  ngOnInit(): void {
  }

  formFb(){
    this.livroForm = this.fb.group({
      livro_isbn: new FormControl('', [Validators.required]),
      livro_nome: new FormControl('', [Validators.required]),
      livro_editora: new FormControl('', [Validators.required]),
      livro_ano_edicao: new FormControl('', [Validators.required]),
      livro_programa: new FormControl('', [Validators.required]),
      livro_gr_etario: new FormControl('', [Validators.required]),
      livro_lingua: new FormControl('', [Validators.required]),
      livro_nivel: new FormControl('', [Validators.required]),
      estado_livro_fk: new FormControl('', [Validators.required]),
      livro_valor_venda: new FormControl('', [Validators.required])
    })
  }

  ValidInput(field: string){
    const valid = this.livroForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.livroForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.livroServices.createLivros(this.livroForm.value).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('/admin/profile/livros')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
