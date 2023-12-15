import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//importaciones de componentes primeNG
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule} from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import{ConfirmationService} from 'primeng/api';
import{MessageService} from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';

//importaciones para formato de fechas
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es-SV';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

registerLocaleData(localEs,'es-SV')
//importaciones de componentes creados
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { MarcasComponent } from './marcas/marcas.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './usuarios/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    ProductosComponent,
    MarcasComponent,
    OrdenesComponent,
    SidebarComponent,
    CartComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    TableModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    ToolbarModule,
    SidebarModule,
    MenuModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    CheckboxModule,
    MessagesModule,
    DataViewModule,
    SweetAlert2Module

  ],
  providers: [ConfirmationService,MessageService,{provide:LOCALE_ID, useValue: 'es-SV'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
