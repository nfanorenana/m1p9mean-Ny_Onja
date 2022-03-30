import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
// import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name!: String;
  username!: String;
  email!: String;
  password!: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    if (!this.validateService.validateRegister(user)) {
      // this.flashMessagesService.show('Please fill in all fields', {
      //   cssClass: 'alert-danger',
      //   timeout: 3000,
      // });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      // this.flashMessagesService.show('Please use a valid email', {
      //   cssClass: 'alert-danger',
      //   timeout: 3000,
      // });
      return false;
    }

    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        // this.flashMessagesService.show('You are now registered and can log in', {
        //   cssClass: 'alert-success',
        //   timeout: 3000,
        // });
        this.router.navigate(['/login']);
      } else {
        // this.flashMessagesService.show('Something went wrong', {
        //   cssClass: 'alert-danger',
        //   timeout: 3000,
        // });
        this.router.navigate(['/register']);
      }
    });

    return true;
  }
}
