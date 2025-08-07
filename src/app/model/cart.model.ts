import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable()
export class Cart {
  public lines: CartLine[] = []; // state change ...
  public itemCount: number = 0; // 2 items
  public cartPrice: number = 0; // total price

  addLine(product: Product, quantity: number = 1) {
    let line = this.lines.find((line) => line.product.id == product.id);

    if (line != undefined) {
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(product, quantity));
    }

    this.recalculate();
  }

  removeLine(id: number) {
    let index = this.lines.findIndex((line) => line.product.id == id);
    this.lines.splice(index, 1);
    this.recalculate();
  }

  updateQuantity(product: Product, quantity: number) {
    let line = this.lines.find((line) => line.product.id == product.id);

    if (line != undefined) {
      line.quantity = Number(quantity);
    }
    this.recalculate();
  }

  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;

    this.lines.forEach((l) => {
      this.itemCount += l.quantity;
      this.cartPrice += l.LineTotal;
    });
  }
}

export class CartLine {
  constructor(public product: Product, public quantity: number) {}

  get LineTotal() {
    return this.quantity * (this.product.price ?? 0);
  }
}
