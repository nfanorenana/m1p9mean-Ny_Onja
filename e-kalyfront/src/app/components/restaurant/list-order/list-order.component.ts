import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent implements OnInit {
  user: any;
  orders: any;

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserInformation();

    this.restaurantService.getOrder(this.user.id).subscribe({
      next: (allOrder) => {
        this.orders = allOrder.order;
      },
      error: (err) => {
        console.log(err);
        return false;
      },
    });
  }
}
