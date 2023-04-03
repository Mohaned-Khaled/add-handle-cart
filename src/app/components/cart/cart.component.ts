import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FilterService } from 'src/app/services/filter.service';
import { DataModel } from 'src/app/services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  isEmpty: boolean;
  cartProducts: DataModel[];
  totalPrice: Observable<number>;
  seachString: string;
  cartSub: Subscription;
  searchSub: Subscription;

  constructor(
    private cartService: CartService,
    private filterService: FilterService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartSub = this.cartService.cartProductsSubject.subscribe(
      (products) => {
        if (products.length === 0 || !products) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
          this.cartProducts = products;
        }
      }
    );

    this.totalPrice = this.cartService.totalPrice;

    this.searchSub = this.filterService.searchSubject.subscribe((s) => {
      this.seachString = s;
    });
  }

  checkout() {
    this.toastr.success('Done', '', {
      positionClass: 'toast-center-center',
      progressBar: true,
    });
  }

  onIncreaseQuant(id: number) {
    this.cartService.onIncreaseQuantity(id);
  }

  onDecreaseQuant(id: number) {
    this.cartService.onDecreaseQuantity(id);
  }

  onDeleteProd(id: number) {
    this.toastr.warning('Removed successfully', '', {
      timeOut: 2000,
    });
    this.cartService.onDelteProd(id);
  }

  onRemoveAllProds() {
    this.cartService.onDeleteAllProds();
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }
}
