import { SalesDetailComponent } from './components/sales/sales-detail/sales-detail.component';
import { SalesCreateComponent } from './components/sales/sales-create/sales-create.component';
import { SalesIndexComponent } from './components/sales/sales-index/sales-index.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteIndexComponent } from './components/clientes/cliente-index/cliente-index.component';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

const appRoute: Routes = [
  //Ruta Dashboard y Login
  {path:'',component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  //Rutas Productos
  {path:'productos', component: ProductoIndexComponent},
  {path:'producto/registrar', component: ProductoCreateComponent},
  {path:'producto/editar/:id', component: ProductoCreateComponent},
  //Rutas Clientes
  {path:'clientes', component: ClienteIndexComponent},
  {path:'cliente/registrar', component: ClienteCreateComponent},
  {path:'cliente/editar/:id', component: ClienteCreateComponent},
  //Rutas Usuarios
  {path:'usuarios', component: UserIndexComponent},
  {path:'usuario/registrar', component: UserCreateComponent},
  {path:'usuario/editar/:id', component: UserCreateComponent},
  //Rutas Usuarios
  {path:'ventas', component: SalesIndexComponent},
  {path:'ventas/registrar', component: SalesCreateComponent},
  {path:'ventas/:id', component: SalesDetailComponent},
]

export const appRoutingProviders : any [] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
