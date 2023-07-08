import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

const routes: Routes = [
  {path:'' , component: HomeComponent},
  {path:'home' , component: HomeComponent},
  {path:'cart', component: CartComponent},
  {path:'**' , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
