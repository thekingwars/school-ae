import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students/students.service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {
  user: number;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private studentServices: StudentsService) {
  }

  ngOnInit(): void {
  }
}
