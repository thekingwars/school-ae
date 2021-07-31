import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrosService } from 'src/app/services/admin/livros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-estado',
  templateUrl: './update-estado.component.html',
  styleUrls: ['./update-estado.component.scss']
})
export class UpdateEstadoComponent implements OnInit {

  estadolivroForm: FormGroup
  id: number
  constructor(private fb: FormBuilder, private livroServices: LivrosService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.estadoForm()
  }

  ngOnInit(): void {
    this.patchValueForm(this.id)
  }

  estadoForm(){
    this.estadolivroForm = this.fb.group({
      estado_livro_nome: new FormControl('', [Validators.required])
    })
  }

  patchValueForm(id){
    this.livroServices.getEstadoLivro(id).subscribe(res => {
      this.estadolivroForm.patchValue({
        estado_livro_nome: res['estado_livro']['estado_livro_nome']
      })
    })
  }

  ValidInput(field: string){
    const valid = this.estadolivroForm.get(field).valid

    return valid
  }

  isValidField(field: string) {
    const error = this.estadolivroForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.livroServices.updateEstadoLivros(this.estadolivroForm.value, this.id).subscribe(res => {
      this.router.navigateByUrl('/admin/profile/estado-livros')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }
}
