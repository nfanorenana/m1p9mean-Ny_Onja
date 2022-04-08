import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateRegister(user) {
    if (
      user.name === undefined ||
      user.username === undefined ||
      user.email === undefined ||
      user.password === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateNewRestaurant(restaurant) {
    if (restaurant.name === undefined || restaurant.location === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateMeal(meal) {
    if (
      meal.name === undefined ||
      meal.production_cost === undefined ||
      meal.selling_price === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: String) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
}
