import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavData } from './nav-data';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxNepaliDatepickerModule } from 'ngx-nepali-datepicker';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NgxNepaliDatepickerModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  drawerExpandedWidth: number = 200;
  drawerCollapsedWidth: number = 52;
  isOpened: boolean = true;
  calendar = "AD"
  date:any;

  navItems = NavData;

  toggleNav() {
    this.isOpened = !this.isOpened;
  }

  togglesub(item:any) {
    item.expanded = !item.expanded;
  }

  showDate(e:any)
  {
    this.date = e;
  }
}
