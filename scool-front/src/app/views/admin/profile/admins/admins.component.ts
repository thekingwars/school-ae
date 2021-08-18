import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Admins } from 'src/app/models/admins.models';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [MessageService]
})
export class AdminsComponent implements OnInit {

  unsubscribe: Subscription[] = []
  items: MenuItem[]
  admins: Admins[]
  selectedAdmins: Admins
  first = 0;
  rows = 10;
  subscription: Subscription
  display: boolean = false
  displayUpdate: boolean = false
  formAdmins: FormGroup
  password: string
  roles: object[]
  formUpdateAdmins: FormGroup

  constructor(private adminServices: AdminService, private fb: FormBuilder, private messageServices: MessageService) {
    this.AdminForm()
    this.adminUpdateForm()

    this.roles = [
      {name: 'superadmin', value: 'superadmin'},
      {name: 'admin', value: 'admin'}
    ]
  }

  ngOnInit(): void {
    this.getAdmins()
    this.items = [
        {label: 'Edição', icon: 'pi pi-user-edit', command: () => this.viewSelectedAdmin(this.selectedAdmins)},
        {label: 'Eliminar', icon: 'pi pi-trash', command: () => this.deleteSelectAdmin(this.selectedAdmins)},
    ];

    this.subscription = this.adminServices.refresh$.subscribe(() => this.getAdmins())
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.unsubscribe.forEach(data => {
      data.unsubscribe()
    })
  }

  AdminForm(){
    this.formAdmins = this.fb.group({
      admin_email: new FormControl('', [Validators.required, Validators.email]),
      admin_password: new FormControl(this.password, [Validators.required]),
      admin_nome: new FormControl('', [Validators.required]),
      admin_telemovel: new FormControl('', [Validators.required])
    })
  }

  adminUpdateForm(){
    this.formUpdateAdmins = this.fb.group({
      admin_email: new FormControl('', [Validators.required, Validators.email]),
      admin_password: new FormControl(this.password),
      admin_nome: new FormControl('', [Validators.required]),
      admin_telemovel: new FormControl('', [Validators.required]),
      admin_role: new FormControl('superadmin')
    })
  }

  isValidField(field: string) {
    const error = this.formAdmins.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  viewSelectedAdmin(admin){
    this.displayUpdate = true
    this.formUpdateAdmins.patchValue({
      admin_email: admin.admin_email,
      admin_nome: admin.admin_nome,
      admin_telemovel: admin.admin_telemovel,
      admin_role: admin.admin_role === 'superadmin' ? this.roles[0]['name'] : this.roles[1]['name']
    })
  }

  deleteSelectAdmin(admin){
    Swal.fire({
      title: 'Tem a certeza?',
      text: "Não será possível reverter isto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apague-o!',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.unsubscribe.push(
          this.adminServices.deleteAdmins(admin.admin_id).subscribe(res => Swal.fire({title: 'Error', text: res['msg'], icon: 'success', allowOutsideClick: false}))
        )
      }
    })
  }

  resetForm(){
    this.formUpdateAdmins.reset()
    this.formAdmins.reset()
  }

  getAdmins(){
    this.unsubscribe.push(
      this.adminServices.getAllAdmins().subscribe(res => {
        this.admins = res['admins']
        console.log(res['admins'])
      })
    )
  }

  onSubmit(){
    this.unsubscribe.push(
      this.adminServices.createAdmins(this.formAdmins.value).subscribe(res => {
        this.messageServices.add({severity: 'success', summary: 'êxito', detail: 'Administração criada com sucesso'})
        this.display = false
      }, err => {
        this.messageServices.add({severity: 'error', summary: 'error', detail: err['error']['err']})
        this.display = false
      })
    )
  }

  onSubmitUpdate(){
    const { name } = this.formUpdateAdmins.get('admin_role').value

    this.formUpdateAdmins.patchValue({ admin_role: name })

    this.unsubscribe.push(
      this.adminServices.updateAdmins(this.formUpdateAdmins.value, this.selectedAdmins['admin_id']).subscribe(res => {
        this.messageServices.add({severity: 'success', summary: 'êxito', detail: 'administrador actualizado com sucesso'})
        this.displayUpdate = false
      }, err => {
        this.messageServices.add({severity: 'error', summary: 'error', detail: err['error']['err']})
        this.displayUpdate = false
      })
    )
  }
}
