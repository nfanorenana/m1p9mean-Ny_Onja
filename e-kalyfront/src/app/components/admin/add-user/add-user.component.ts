import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  name!: String;
  username!: String;
  email!: String;
  role!: String;
  password: String = 'ekalyMDG!';

  constructor(
    private adminService: AdminService,
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCreateUserSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      role: this.role,
      password: this.password,
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessages.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show('Please use a valid email', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    this.adminService.addUser(user).subscribe((data) => {
      if (data.success) {
        this.flashMessages.show('User created', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/admin/listuser']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/admin/adduser']);
      }
    });

    return true;
  }
}
