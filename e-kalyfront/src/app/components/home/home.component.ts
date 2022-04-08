import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  restaurants!: any;
  meals!: any;
  orders: any[] = [];
  searchMeal: any;

  constructor(
    private homeService: HomeService,
    private restaurantService: RestaurantService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.homeService.getRestaurant().subscribe({
      next: (allRestaurant) => {
        this.restaurants = allRestaurant.restaurant;
      },
      error: (err) => {
        console.log(err);
        return false;
      },
    });
  }

  onClickRestaurant(id: string) {
    this.restaurantService.getMeal(id).subscribe({
      next: (allMeal) => {
        this.meals = allMeal.meal;
      },
      error: (err) => {
        console.log(err);
        return false;
      },
    });
  }

  addToOrder(meal: any) {
    this.orders.push(meal);
    console.log(this.getOrder());
  }

  getOrder() {
    return this.orders;
  }

  clearOrder() {
    this.orders = [];
    return this.orders;
  }

  removeToOrder(meal: any) {
    const index = this.getOrder().indexOf(meal);
    if (index > -1) {
      this.getOrder().splice(index, 1);
    }
    console.log(this.getOrder());
  }

  validateOrder() {
    if (this.authService.loggedIn()) {
      this.restaurantService.orderMeal(this.getOrder()).subscribe({
        next: () => {},
        error: (err) => {},
      });
    } else {
      this.flashMessages.show('Please authenticate before validate order', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      this.router.navigate(['/login']);
    }
  }
}
