import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter, take } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  totalProdInCart: number;
  prodSub: Subscription;
  searchString: string;

  constructor(
    private cartService: CartService,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prodSub = this.cartService.cartProductsSubject.subscribe((data) => {
      this.totalProdInCart = data.length;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.searchString = null;
        this.filterService.onSeachingProduct(this.searchString);
      });
  }

  onSearch() {
    this.filterService.onSeachingProduct(this.searchString);
  }

  ngOnDestroy(): void {
    this.prodSub?.unsubscribe();
  }
}
