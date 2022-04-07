import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit {
  deliveries!: any[];

  constructor(private delivaryService: DeliveryService) {}

  ngOnInit(): void {
    this.delivaryService.getOrderToDelivery().subscribe({
      next: (allDelivery) => {
        this.deliveries = allDelivery.delivery;
      },
      error: (err) => {
        console.log(err);
        return false;
      },
    });
  }
}
