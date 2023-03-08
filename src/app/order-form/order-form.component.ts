import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../orders.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  description: string = "";
  successMessage: string | undefined;
  errorMessage: string | undefined;

  @Output() listUpdated = new EventEmitter<boolean>();

  constructor(private orderService: OrderService) {}

  handleResponse() {
    var msg: string = "Order added successfully!";
    console.log(msg);
    this.successMessage = msg;
    this.listUpdated.emit(true);
    this.description = "";
    setTimeout(() => {
      this.successMessage = undefined;
    }, 1500);
  }

  handleError() {
    var msg: string = "Error adding new order!";
    console.log(msg);
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = undefined;
    }, 1500);
  }

  onSubmit() {
    if(this.description != "") {
      this.orderService.addOrder(this.description).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
  }
}
