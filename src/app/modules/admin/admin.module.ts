import { MatModule } from './../../mat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [AdminComponent, AdminNavComponent],
  imports: [CommonModule, AdminRoutingModule, MatModule],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}]
})
export class AdminModule {}
