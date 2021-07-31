import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LivrosService } from 'src/app/services/admin/livros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-estado',
  templateUrl: './create-estado.component.html',
  styleUrls: ['./create-estado.component.scss']
})
export class CreateEstadoComponent implements OnInit {

  estadolivroForm: FormGroup

  constructor(private fb: FormBuilder, private livroServices: LivrosService, private router: Router) {
    this.estadoForm()
  }

  ngOnInit(): void {
  }

  estadoForm(){
    this.estadolivroForm = this.fb.group({
      estado_livro_nome: new FormControl('', [Validators.required])
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
    this.livroServices.createEstadoLivros(this.estadolivroForm.value).subscribe(res => {
      this.router.navigateByUrl('/admin/profile/estado-livros')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }
}
