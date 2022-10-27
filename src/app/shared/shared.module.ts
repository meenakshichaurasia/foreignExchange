import { NgModule } from '@angular/core';
import {MaterialModule} from "./material/material.module";
import {DialogComponent} from "./dialog/dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


const sharedImports = [
  ReactiveFormsModule,
  FormsModule,
  MaterialModule
];

@NgModule({
  declarations: [
    DialogComponent,
  ],
  imports: sharedImports,
  exports: sharedImports,
})
export class SharedModule { }
