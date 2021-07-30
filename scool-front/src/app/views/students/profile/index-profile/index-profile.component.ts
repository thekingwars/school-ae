import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Students } from 'src/app/models/students.models';
import { StudentsService } from 'src/app/services/students/students.service';

@Component({
  selector: 'app-index-profile',
  templateUrl: './index-profile.component.html',
  styleUrls: ['./index-profile.component.scss']
})
export class IndexProfileComponent implements OnInit {

  id: number
  student: Students
  image: string = '../../../../../assets/images/avatar-01.jpg'

  constructor(private activatedRouter: ActivatedRoute, private studentServices: StudentsService) {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getStudent(this.id)
  }


  getStudent(id){
    this.studentServices.getStudents(id).subscribe(res => {
      this.student = res
      console.log(res)
    })
  }
}
