import { Component } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [GeneralListComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  showPage: string = 'list';
}
