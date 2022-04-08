import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
})
export class AddRestaurantComponent implements OnInit {
  name!: String;
  location!: String;
  responsible!: any;
  meals!: any[];

  restaurantAccount!: any;

  constructor(
    private validateService: ValidateService,
    private adminService: AdminService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminService.getUserByRole('restaurant').subscribe({
      next: (allRestaurantAccount) => {
        this.restaurantAccount = allRestaurantAccount.user;
      },
      error: (err) => {
        console.log(err);
        return false;
      },
    });
  }

  onCreateRestaurantSubmit() {
    const restaurant = {
      name: this.name,
      location: this.location,
      responsible: this.responsible,
    };

    if (!this.validateService.validateNewRestaurant(restaurant)) {
      this.flashMessages.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    this.adminService.addRestaurant(restaurant).subscribe((data) => {
      if (data.success) {
        this.flashMessages.show('Restaurant created', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/admin/addrestaurant']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/admin/addrestaurant']);
      }
    });

    return true;
  }
}
