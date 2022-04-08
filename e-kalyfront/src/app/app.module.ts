import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'flash-messages-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderComponent } from './components/order/order.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AdminComponent } from './components/admin/admin.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { ListUserComponent } from './components/admin/list-user/list-user.component';

import { UserFilterPipe } from './components/admin/list-user/user-filter.pipe';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { AddRestaurantComponent } from './components/admin/add-restaurant/add-restaurant.component';
import { ListOrderComponent } from './components/restaurant/list-order/list-order.component';
import { AddMealComponent } from './components/restaurant/add-meal/add-meal.component';
import { ListMealComponent } from './components/restaurant/list-meal/list-meal.component';
import { RestaurantComponent } from './components/home/restaurant/restaurant.component';
import { MealFilterPipe } from './components/home/meal-filter.pipe';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'restaurant',
    // component: RestaurantComponent,
    children: [
      { path: '', component: RestaurantComponent },
      { path: 'orderlist', component: ListOrderComponent },
      { path: 'addmeal', component: AddMealComponent },
      { path: 'listmeal', component: ListMealComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm/:confirmationCode', component: ConfirmationComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/listuser',
    component: ListUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/adduser',
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/addrestaurant',
    component: AddRestaurantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'delivery',
    component: DeliveryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    OrderComponent,
    ConfirmationComponent,
    AdminComponent,
    AddUserComponent,
    ListUserComponent,
    UserFilterPipe,
    DeliveryComponent,
    AddRestaurantComponent,
    ListOrderComponent,
    AddMealComponent,
    ListMealComponent,
    RestaurantComponent,
    MealFilterPipe,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FlashMessagesModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
