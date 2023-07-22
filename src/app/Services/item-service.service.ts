import { Injectable } from '@angular/core';
import { Item } from '../Model/pagination';

@Injectable({ providedIn: 'root' })
export class ItemService {
  items: Item[] = []; // This should be your data from the server.
  currentPage = 1;
  itemsPerPage = 16;
  totalPages = 0;

  constructor() { 
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
  }

  getItemsForPage(page: number): Item[] {
    const startIndex = (page - 1) * this.itemsPerPage;
    return this.items.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}