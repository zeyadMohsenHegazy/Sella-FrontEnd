import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AboutUSComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { LoginComponent } from './Components/identity/login/login.component';
import { RegisterComponent } from './Components/identity/register/register.component';
import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = [
  {path:'' , component: HomeComponent},
  {path:'home' , component: HomeComponent},
  {path:'cart', component: CartComponent , canActivate:[AuthGuard]},
  {path:'category/:id', component:ProductListComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'AboutUs', component: AboutUSComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path:'**' , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
