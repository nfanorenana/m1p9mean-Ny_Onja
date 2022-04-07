import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  users!: any[];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUser().subscribe({
      next: (allUser) => {
        this.users = allUser.user;
      },
      error: (err) => {
        console.log(err);
        return false;
      },
    });
  }
}
