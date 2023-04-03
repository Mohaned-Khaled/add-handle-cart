import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface DataModel {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  quantity?: number;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<DataModel[]>('https://fakestoreapi.com/products');
  }

  getJeweleryProds() {
    return this.http.get<DataModel[]>(
      'https://fakestoreapi.com/products/category/jewelery'
    );
  }

  getElecProds() {
    return this.http.get<DataModel[]>(
      'https://fakestoreapi.com/products/category/electronics'
    );
  }
}
