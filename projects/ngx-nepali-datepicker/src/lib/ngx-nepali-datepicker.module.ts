import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxNepaliDatepickerComponent } from './ngx-nepali-datepicker.component';
import { ToNpPipe } from './pipes/to-np.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfigType } from './interface/interface';

@NgModule({
  declarations: [ToNpPipe, NgxNepaliDatepickerComponent],
  imports: [CommonModule],
  providers: [DatePipe],
  exports: [NgxNepaliDatepickerComponent],
})
export class NgxNepaliDatepickerModule {
  static forRoot(
    config: ConfigType
  ): ModuleWithProviders<NgxNepaliDatepickerModule> {
    return {
      ngModule: NgxNepaliDatepickerModule,
      providers: [
        {
          provide: 'config',
          useValue: config,
        },
      ],
    };
  }
}
