import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css'],
})
export class AddMealComponent implements OnInit {
  name!: String;
  production_cost!: Number;
  selling_price!: Number;
  published!: Boolean;
  user!: any;
  restaurant!: any;

  constructor(
    private restaurantService: RestaurantService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private validateService: ValidateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserInformation();
    this.restaurantService.getResponsible(this.user.id).subscribe((data) => {
      if (data.success) {
        this.restaurant = data.restaurant;
      } else {
      }
    });
  }

  onCreateMealSubmit() {
    const meal = {
      name: this.name,
      name_lower: this.name.toLowerCase(),
      production_cost: this.production_cost,
      selling_price: this.selling_price,
      restaurant: this.restaurant._id,
      published: true,
    };

    if (!this.validateService.validateMeal(meal)) {
      this.flashMessages.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    this.restaurantService.addMeal(meal).subscribe((data) => {
      if (data.success) {
        this.flashMessages.show('Meal created', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/restaurant/listmeal']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/restaurant/addmeal']);
      }
    });

    return true;
  }
}
