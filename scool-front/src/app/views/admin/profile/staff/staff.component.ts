import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodigoPostal } from 'src/app/models/condigoPostal.models';
import { PortugalService } from 'src/app/services/admin/portugal.service';
import { StaffService } from 'src/app/services/admin/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  providers: [MessageService]
})
export class StaffComponent implements OnInit, OnDestroy {

  formStaff: FormGroup
  unsubscribe: Subscription[] = []
  items: MenuItem[]
  staff: object[]
  selectedStaff: object
  first = 0;
  rows = 10;
  subscription: Subscription
  display: boolean = false
  displayUpdate: boolean = false
  password: string
  codigo_postal$ = this.codigoPostal$()
  concelho

  constructor(private staffServices: StaffService, private messageService: MessageService, private fb: FormBuilder, private portugalServices: PortugalService) {
    this.staffForm()
  }

  ngOnInit(): void {
    this.getAdmins()
    this.items = [
      {label: 'Edição', icon: 'pi pi-user-edit', command: () => this.viewSelectedStaff(this.selectedStaff)},
      {label: 'Eliminar', icon: 'pi pi-trash', command: () => this.deleteSelectStaff(this.selectedStaff)},
    ];

    this._concelho$()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.unsubscribe.forEach(data => {
      data.unsubscribe()
    })
  }

  staffForm(){
    this.formStaff = this.fb.group({
      staff_nome: new FormControl('', [Validators.required, Validators.email]),
      staff_telemovel: new FormControl('', [Validators.required]),
      staff_rua: new FormControl('', [Validators.required]),
      staff_email: new FormControl('', [Validators.required]),
      staff_password: new FormControl(this.password, [Validators.required, Validators.minLength(6)]),
      staff_codigo_postal: new FormControl('', [Validators.required]),
      staff_freguesia: new FormControl('', [Validators.required]),
      staff_concelho: new FormControl('', [Validators.required]),
      staff_nacionalidade: new FormControl('', [Validators.required]),
    })
  }

  
  isValidField(field: string) {
    const error = this.formStaff.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  resetForm(){

  }

  codigoPostal$(){
    return this.portugalServices.getCodigoPostal().pipe(map(res => res.map(res => {
      const obj = {name: res.NumeroCodigoPostal + res.NumeroExtensaoCodigoPostal}
        return obj
    })))
  }

  _concelho$(){
    this.unsubscribe.push(
      this.portugalServices.getConcelho().pipe(map(res => res.map(res => {
        const obj = {name: res.Nome}
        return obj
      }))).subscribe(res => {
        this.concelho = res
        console.log(this.concelho)
      })
    )
  }

  getAdmins(){
    this.unsubscribe.push(
      this.staffServices.getAllStaffs().subscribe(res => {
        this.staff = res['staff']
        console.log(res['staff'])
      })
    )
  }

  viewSelectedStaff(admin){
    this.displayUpdate = true
    /*this.formUpdateAdmins.patchValue({
      admin_email: admin.admin_email,
      admin_nome: admin.admin_nome,
      admin_telemovel: admin.admin_telemovel,
      admin_role: admin.admin_role === 'superadmin' ? this.roles[0]['name'] : this.roles[1]['name']
    })*/
  }

  deleteSelectStaff(admin){
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
          this.staffServices.deleteStaff(admin.admin_id).subscribe(res => Swal.fire({title: 'Error', text: res['msg'], icon: 'success', allowOutsideClick: false}))
        )
      }
    })
  }

  onSubmit(){

  }

}
