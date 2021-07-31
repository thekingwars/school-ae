import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import format from 'date-fns/format';
import { LivrosService } from 'src/app/services/admin/livros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-livros',
  templateUrl: './update-livros.component.html',
  styleUrls: ['./update-livros.component.scss']
})
export class UpdateLivrosComponent implements OnInit {

  livroForm: FormGroup
  estadoLivro: any;
  id: number

  constructor(private fb: FormBuilder, private livroServices: LivrosService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.formFb()
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getAllEstadoLivros()
    this.getLivro(this.id)
  }

  formFb(){
    this.livroForm = this.fb.group({
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

  getAllEstadoLivros(){
    this.livroServices.allEstadoLivros().subscribe(res => {
      this.estadoLivro = res
    })
  }

  getLivro(id){
    this.livroServices.getLivro(id).subscribe(res => {
      this.livroForm.patchValue({
        livro_nome: res.livros.livro_nome,
        livro_editora: res.livros.livro_editora,
        livro_ano_edicao: format(new Date(res.livros.livro_ano_edicao), 'yyyy-MM-dd'),
        livro_programa: res.livros.livro_programa,
        livro_gr_etario: res.livros.livro_gr_etario,
        livro_lingua: res.livros.livro_lingua,
        livro_nivel: res.livros.livro_nivel,
        estado_livro_fk: res.livros.estado_livro_fk,
        livro_valor_venda: res.livros.livro_valor_venda
      })
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
    this.livroServices.updateLivros(this.livroForm.value, this.id).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('/admin/profile/livros')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
