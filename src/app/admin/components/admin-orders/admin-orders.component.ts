import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderService } from 'shared/services/order-service/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  ordersMap: any[] = [];
  displayedColumns: string[] = ['name', 'date', 'view'];
  dataSource;
  orderSubscription: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService) {
    this.orderSubscription = this.orderService
      .getOrders()
      .subscribe((ordersMap) => {
        this.ordersMap = ordersMap;
        this.initializeTable(this.ordersMap);
      });
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private initializeTable(ordersMap) {
    // date format params
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const ordersFiltered = ordersMap.map((order) => {
      const orderValue = order.payload.val();
      return {
        name: orderValue.shippingDetails.nameControl,
        date: new Date(orderValue.datePlaced).toLocaleDateString(
          'en-US',
          options
        ),
        key: order.key,
      };
    });
    console.log(ordersFiltered);

    this.dataSource = new MatTableDataSource(ordersFiltered);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // filter only the name and date columns (dont filter key)
    this.dataSource.filterPredicate = (data, filter: string) => {
      return (
        data.name.trim().toLowerCase().indexOf(filter) !== -1 ||
        data.date.trim().toLowerCase().indexOf(filter) !== -1
      );
    };
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }
}
