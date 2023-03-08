import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../order';
import { OrderService } from '../orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService) { };

  ngOnInit(): void {
    this.orderService.getOrders()
    .subscribe((orders: any) => {
      this.orders = orders
    });
  }

  onListUpdated(success: boolean) {
    if(success) {
      this.orderService.refreshOrders().subscribe((orders: any) => {
        this.orders = orders;
      });
    }
  };

  cancelOrder(order: Order) {
    if (order._links.cancel) {
      console.log(`Canceling order ${order.id}...`);
      this.orderService.cancelOrder(order).subscribe({
        next: this.onListUpdated.bind(this),
        error: this.handleError.bind(this) 
      });
    }
  }

  completeOrder(order: Order) {
    if (order._links.complete) {
      console.log(`Completing order ${order.id}...`);
      this.orderService.completeOrder(order).subscribe({
        next: this.onListUpdated.bind(this),
        error: this.handleError.bind(this) 
      });
    }
  }

  handleError() {
    console.log("Error while performing requested action!");
  }
}


