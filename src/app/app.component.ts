import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (localStorage.getItem('products')) {
      const productsData = JSON.parse(localStorage.getItem('products'));
      this.cartService.onAddCartsFromLocalStorage(productsData);
    }
  }
}
