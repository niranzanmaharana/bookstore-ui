import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.cartDetails();
  }

  cartDetails() {
    this.cartItems = this._cartService.cartItems;
    // Subscribe to the events published by cart service
    this._cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this._cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

    this._cartService.calculateTotalPrice();
  }

}
