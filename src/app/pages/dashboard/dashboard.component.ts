import { Component } from '@angular/core';
import { ViewOrderComponent } from '../orders/view-order/view-order.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../orders/orders.service';
import { AmountPipe } from '../../shared/pipes/amount.pipe';
import { ApexNonAxisChartSeries, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { CategoryList } from '../../data/CategoryList';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
};

export type RingChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AmountPipe, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  orderList: any[] = [];
  lineChartOptions: ChartOptions;
  ringChartOptions: RingChartOptions;
  categories = CategoryList.map(data => data.name)

  constructor(
    private _dialog: MatDialog,
    private _orderService: OrderService
  ) {
    this.getAllOrder();

    this.lineChartOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 48, 61, 75]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      }
    };

    this.ringChartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: this.categories.slice(0,4),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  getAllOrder() {
    this._orderService.getOrderList().subscribe(res => {
      this.orderList = res;
    });
  }

  viewOrder(order: any) {
    const dialogRef = this._dialog.open(ViewOrderComponent, {
      width: '800px',
      data: order
    })
  }
}
