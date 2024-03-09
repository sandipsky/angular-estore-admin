import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavData } from './nav-data';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  drawerExpandedWidth: number = 180;
  drawerCollapsedWidth: number = 52;
  isOpened: boolean = true;
  calendar = "AD"
  date:any;

  navItems = NavData;

  toggleNav() {
    this.isOpened = !this.isOpened;
    this.navItems = this.navItems.map(items => {
      items.expanded = false
      return items;
    });
  }

  togglesub(item:any) {
    item.expanded = !item.expanded;
    this.isOpened = true;
  }

  showDate(e:any)
  {
    this.date = e;
  }
}
