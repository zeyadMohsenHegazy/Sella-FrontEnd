import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/Footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { BannerComponent } from './Components/banner/banner.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { CartComponent } from './Components/cart/cart.component';
import { HomeComponent } from './Components/home/home.component';
import { CategoryComponent } from './Components/category/category.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AboutUSComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AuthenticationInterceptor } from './Services/interceptor';
import { LoginComponent } from './Components/identity/login/login.component';
import { RegisterComponent } from './Components/identity/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorInterceptor } from './Interceptors/token-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    ProductListComponent,
    BannerComponent,
    ReviewsComponent,
    CartComponent,
    HomeComponent,
    CategoryComponent,
    ProductDetailsComponent,
    ContactUsComponent,
    AboutUSComponent,
    LoginComponent,
    RegisterComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  //   {provide: HTTP_INTERCEPTORS,
  //   useClass: TokenInterceptorInterceptor,
  //   multi : true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
