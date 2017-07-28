import { Component, OnInit , Injectable, HostListener } from '@angular/core';
import {ProductService} from '../../Products/product.service';
import {ProductsModel} from '../../Products/product.model';
import {SharedServiceGM} from '../../CommonServices/shared.service';
import {ProductSearchModel} from '../../Products/productsearch.model';
import {productListModel} from '../productList/productlist.model';

@Component({
    moduleId:module.id,
    templateUrl:'productlist.component.html'
})
export class ProductList implements OnInit{
    productSearchModel:ProductSearchModel;
    products: any = [];
    productList: productListModel;
    categoryList : any = [];
    brandList : any = [];
    sortByList : any = [];
    //Dropdown Data
    brandDropdownList = [];
    brandSelectedItems =[];
    brandDropdownSettings = {};
    //Dropdown Data
    categoryDropdownList = [];
    categorySelectedItems =[];
    categoryDropdownSettings = {};
    sortByDropdownList = [];
    sortBySelectedItems =[];
    sortByDropdownSettings = {};

    brandSelections :string = "";

    constructor(private productServe:ProductService,    
    private sharedServe:SharedServiceGM){

    }

    ngOnInit(){
        this.loadHomeProducts(); 
        this.loadProductList();
        this.loadCategoryList();  
        this.loadBrandList();  
        this.loadSortByList();   


        this.brandDropdownSettings = {
            singleSelection: false,
            text: "Select Brand",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "register-search-dropdown"
        };

        this.categoryDropdownSettings = {
            singleSelection: true,
            text: "Select Category",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "register-search-dropdown"
        };

        this.sortByDropdownSettings = {
            singleSelection: true,
            text: "Select SortBy",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "register-search-dropdown"
        };

        this.productSearchModel = this.sharedServe.getProductSearch();
        console.log('ProductSearchModel', this.productSearchModel.searchkeyword);
    }

     private loadHomeProducts()
    {
       this.productServe.getHomeBanner().subscribe(products => this.products = products);
    }

    private loadProductList(brandSelections ?: string){
        if(brandSelections){
            this.productServe.getProductList(brandSelections).subscribe(productList => this.productList= productList.result);            
        }
        else{
            this.productServe.getProductList().subscribe(productList => this.productList= productList.result);
        }

        console.log("prod list", this.productList);
    }

    private loadCategoryList(){
        this.productServe.getCategoryList().subscribe(categoryList => {
             this.categoryList= categoryList.result;
            let tempCategory =  categoryList.result;
            for (let categoryObj of tempCategory) {
                if (categoryObj.is_default) {
                    this.categorySelectedItems.push({ "id": categoryObj.category_id, "itemName": categoryObj.category_name });
                }
                this.categoryDropdownList.push({ "id": categoryObj.category_id, "itemName": categoryObj.category_name });
            }
        });

        console.log("category list", this.categoryList);
    }

    private loadBrandList( categoryId ?: string){
        this.brandDropdownList = [] ;
       if(categoryId){
            this.productServe.getBrandList(categoryId).subscribe(brandList => {
                this.brandList= brandList.result;
                let tempBrand =  brandList.result;
                for (let brandObj of tempBrand) {
                    if (brandObj.is_default) {
                        this.brandSelectedItems.push({ "id": brandObj.brand_id, "itemName": brandObj.brand_name });
                    }
                    this.brandDropdownList.push({ "id": brandObj.brand_id, "itemName": brandObj.brand_name });
                }
            });
        }
        else{
            this.productServe.getBrandList().subscribe(brandList => {
                this.brandList= brandList.result;
                let tempBrand =  brandList.result;
                for (let brandObj of tempBrand) {
                    if (brandObj.is_default) {
                        this.brandSelectedItems.push({ "id": brandObj.brand_id, "itemName": brandObj.brand_name });
                    }
                    this.brandDropdownList.push({ "id": brandObj.brand_id, "itemName": brandObj.brand_name });
                }
            });
        }
        
      

        console.log("Brand list", this.brandList);
    }

    private loadSortByList(){
        this.productServe.getSortByList().subscribe(sortByList => {
             this.sortByList= sortByList.result;
            let tempsort =  sortByList.result.orderlist;
            for (let sortObj of tempsort) {
                if (sortObj.is_default) {
                    this.sortBySelectedItems.push({ "id": sortObj.value, "itemName": sortObj.name });
                }
                this.sortByDropdownList.push({ "id": sortObj.value, "itemName": sortObj.name});
            }
        });

        console.log("SortBy list", this.sortByList);
    }

    onBrandSelectionChange(){
        this.brandSelections = "";

            for(var i=0; i<this.brandSelectedItems.length; i++){
                if(i== this.brandSelectedItems.length-1){
                this.brandSelections += this.brandSelectedItems[i].id; 
 
                }else{
                this.brandSelections += this.brandSelectedItems[i].id +",";                     
                }
            }

        this.loadProductList(this.brandSelections);
    }


    onBrandItemSelect($event) {
        this.onBrandSelectionChange();
    }
    onBrandItemDeSelect($event) {
       this.onBrandSelectionChange();          
    }
    onCategoryItemSelect(item: any) {
        console.log("category select item :" + item);
        // console.log(this.categorySelectedItems[0].id);
        this.loadBrandList(this.categorySelectedItems[0].id);
    }
    onCategoryItemDeSelect(item: any) {
        console.log("category deselect item :" + item);
    }
     onSortByItemSelect(item: any) {
        console.log("sort select item :" + item);
    }
    onSortByItemDeSelect(item: any) {
        console.log("sort deselect item :" + item);
    }

    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }

    getProductDetails(product_id : string){
        console.log(this.productServe.getProductById(product_id));

    }
}