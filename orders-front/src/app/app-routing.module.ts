import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { MarcasComponent } from './marcas/marcas.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
{path: 'categorias', component:CategoriasComponent},
{path: 'marcas', component: MarcasComponent},
{path: 'productos', component: ProductosComponent},
{path: 'ordenes', component: OrdenesComponent},
{path: 'cart', component: CartComponent},
{path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
