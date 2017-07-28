import { Component, OnInit , Injectable, HostListener } from '@angular/core';
import {ProductService} from '../../Products/product.service';
import {ProductsModel} from '../../Products/product.model';
import {SharedServiceGM} from '../../CommonServices/shared.service';
import {ProductSearchModel} from '../../Products/productsearch.model';
import {productListModel} from '../productList/productlist.model';
import {Routes, ActivatedRoute,Params} from '@angular/router';

@Component({
    moduleId:module.id,
    templateUrl:'productSelection.html'
})
export class ProductSelection{

        id: number;
        productlist: productListModel;
        productQty :number;
  private sub: any;
    constructor(private routes: ActivatedRoute, private service:ProductService) {
        this.productlist = service.getProductById("8");
        this.productQty = 1;

  }
    ngOnInit() {

        this.routes.params.subscribe(
   (params : Params) => {
      this.id = params["id"]; 
   }
);
}

incrementQty(){
    this.productQty++;

}
decrementQty(){
  if(this.productQty>1){
      this.productQty--;
  }
}

// addToCart(){
  
// }

}