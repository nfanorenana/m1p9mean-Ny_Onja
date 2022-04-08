import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-list-meal',
  templateUrl: './list-meal.component.html',
  styleUrls: ['./list-meal.component.css'],
})
export class ListMealComponent implements OnInit {
  user!: any;
  meals: any;
  restaurant: any;

  constructor(
    private restaurantService: RestaurantService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isRestaurant()) {
      this.user = this.authService.getUserInformation();
      this.restaurantService.getResponsible(this.user.id).subscribe((data) => {
        if (data.success) {
          this.restaurant = data.restaurant;

          this.restaurantService.getMeal(this.restaurant[0]._id).subscribe({
            next: (allMeal) => {
              this.meals = allMeal.meal;
            },
            error: (err) => {
              console.log(err);
              return false;
            },
          });
        } else {
        }
      });
    } else {
    }
  }
}
