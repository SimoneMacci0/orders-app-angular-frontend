import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://orders-backend1.simone-maccio-dev.svc.cluster.local:8080/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response._embedded.orderList.map((order: any) => {
        if (order.status === 'IN_PROGRESS') {
          order._links.cancel = { href: `${this.apiUrl}/${order.id}/cancel` };
          order._links.complete = { href: `${this.apiUrl}/${order.id}/complete` };
        }
        return order;
      }))
    );
  }

  refreshOrders(): Observable<Order[]> {
    return this.getOrders();
  }

  addOrder(description: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { description: description };
    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }

  cancelOrder(order: Order): Observable<any> {
    if (order._links && order._links.cancel) {
      console.log("Sending DELETE request at: ", order._links.cancel.href);
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.delete<any>(order._links.cancel.href);
    }
    else {
      return new Observable<any>();
    }
  }

  completeOrder(order: Order): Observable<any> {
    if (order._links && order._links.complete) {
      console.log("Sending PUT request at: ", order._links.complete.href);
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.put<any>(order._links.complete.href, {}, { headers });
    }
    else {
      return new Observable<any>();
    }
  }
  
}
