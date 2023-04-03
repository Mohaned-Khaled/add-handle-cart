import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FilterService } from 'src/app/services/filter.service';
import { DataModel, HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productsData: DataModel[];
  prodSub: Subscription;
  searchSub: Subscription;
  searchKey: string = '';
  loading: boolean;

  constructor(
    private httpService: HttpService,
    private cartService: CartService,
    private filterService: FilterService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onAllProds();

    this.searchSub = this.filterService.searchSubject.subscribe((seachWord) => {
      this.searchKey = seachWord;
    });
  }

  onAllProds() {
    this.loading = true;
    this.prodSub = this.httpService.getProducts().subscribe((data) => {
      this.loading = false;
      this.productsData = data;
    });
  }

  onJeweleryProds() {
    this.loading = true;

    this.prodSub = this.httpService.getJeweleryProds().subscribe((data) => {
      this.loading = false;
      this.productsData = data;
    });
  }

  onElecProds() {
    this.loading = true;

    this.prodSub = this.httpService.getElecProds().subscribe((data) => {
      this.loading = false;
      this.productsData = data;
    });
  }

  onAddProduct(product: DataModel) {
    this.cartService.onAddToCart(product);
    this.toastr.success('Product Add To Cart', '', {
      progressBar: true,
      timeOut: 3000,
    });
  }

  ngOnDestroy(): void {
    this.prodSub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }
}
