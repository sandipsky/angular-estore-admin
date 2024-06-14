import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { provideToastr } from 'ngx-toastr';

const defaultDialogOptions: MatDialogConfig = {
  width: '600px',
  disableClose: true,
  autoFocus: true,
  position: { top: '48px' },
  panelClass: 'dialog-slide-down'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: defaultDialogOptions }
  ]
};
