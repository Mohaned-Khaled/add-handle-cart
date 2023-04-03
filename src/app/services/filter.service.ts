import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterService {
  searchSubject = new BehaviorSubject<string>('');

  constructor() {}

  onSeachingProduct(searchString: string) {
    this.searchSubject.next(searchString);
  }
}
