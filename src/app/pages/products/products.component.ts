import { Component } from '@angular/core';
import { ProductList } from '../../data/ProductList';
import { GeneralListComponent } from '../general-list/general-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [GeneralListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  showPage: string = 'list';

  productList: any[] = ProductList;
}
