import { Component } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';
import { BrandList } from '../../data/BrandList';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [GeneralListComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {
  showPage: string = 'list';

  brandList: any[] = BrandList;

}
