import { Injectable } from '@angular/core';
import { DataModel } from './http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartProducts: DataModel[] = [];
  cartProductsSubject = new BehaviorSubject<DataModel[]>([]);
  totalPrice = new BehaviorSubject<number>(0);

  constructor() {}

  onAddCartsFromLocalStorage(products: DataModel[]) {
    this.cartProducts = products;
    this.cartProductsSubject.next(this.cartProducts);

    this.onEditTotalPrice();
  }

  onAddToCart(product: DataModel) {
    const existedProduct = this.cartProducts.find(
      (prod) => prod.id === product.id
    );

    if (!existedProduct) {
      this.cartProducts.push({ ...product, quantity: 1 });
      this.cartProductsSubject.next(this.cartProducts);

      localStorage.setItem('products', JSON.stringify(this.cartProducts));
    } else {
      this.cartProducts.forEach((prod) => {
        if (prod.id === existedProduct.id && prod.quantity < 10) {
          prod.quantity += 1;
          localStorage.setItem('products', JSON.stringify(this.cartProducts));
        }
      });
    }

    this.onEditTotalPrice();
  }

  onIncreaseQuantity(id: number) {
    const edittedProd: DataModel = this.cartProducts.find(
      (prod) => prod.id === id
    );
    if (edittedProd.quantity < 10) {
      edittedProd.quantity += 1;
      localStorage.setItem('products', JSON.stringify(this.cartProducts));
    }
    this.onEditTotalPrice();
  }

  onDecreaseQuantity(id: number) {
    const edittedProd: DataModel = this.cartProducts.find(
      (prod) => prod.id === id
    );
    if (edittedProd.quantity >= 1) {
      edittedProd.quantity -= 1;
      localStorage.setItem('products', JSON.stringify(this.cartProducts));
    }

    this.onEditTotalPrice();
  }

  onDelteProd(id: number) {
    this.cartProducts = this.cartProducts.filter((prod) => prod.id !== id);

    if (this.cartProducts.length === 0) {
      localStorage.removeItem('products');
    } else {
      localStorage.setItem('products', JSON.stringify(this.cartProducts));
    }

    this.cartProductsSubject.next(this.cartProducts);

    this.onEditTotalPrice();
  }

  onDeleteAllProds() {
    this.cartProducts = [];
    this.cartProductsSubject.next(this.cartProducts);

    localStorage.removeItem('products');

    this.onEditTotalPrice();
  }

  onEditTotalPrice() {
    const totalP = this.cartProducts?.reduce((acc, curr) => {
      return +acc + +curr.quantity * +curr.price;
    }, 0);

    this.totalPrice.next(totalP);
  }
}
