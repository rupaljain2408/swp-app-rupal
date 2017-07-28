import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {ProductsModel} from './product.model';

import {ConfigurationData} from '../CommonServices/configuration.model';
import {SharedServiceGM} from '../CommonServices/shared.service';
import {productListModel } from "app/Products/productList/productlist.model";

@Injectable()
export class ProductService{
    productsList : productListModel[];
    constructor(private http:Http,
    private sharedServe:SharedServiceGM){
        this.productsList = [];
    }
    
    getHomeOffer(){
        var tokenKey = this.sharedServe.getTokenKey();

        let rawData = {token:tokenKey};  
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        return this.http.post(ConfigurationData.appBLURL + 'product/homepageoffer', rawData, options)
        .map((response : Response) => {
            console.log('Product list ', response.json());
            return response.json()
        });
    }

    getHomeCategory(){
        var tokenKey = this.sharedServe.getTokenKey();

        let rawData = {token:tokenKey};  
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        return this.http.post(ConfigurationData.appBLURL + 'product/homepagecategory', rawData, options)
        .map((response : Response) => {            
            return response.json()
        });
    }

    getHomeBanner(){
        var tokenKey = this.sharedServe.getTokenKey();

        let rawData = {token:tokenKey};  
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        return this.http.post(ConfigurationData.appBLURL + 'product/homepagebanner', rawData, options)
        .map((response : Response) => {            
            return response.json()
        });
    }    

    getAllProductList(sortOrder, brandId, categoryId, searchKeyword){
        var tokenKey = this.sharedServe.getTokenKey();        
        this.productsList=[];
        let rawData = {orderby : sortOrder, brandid:brandId, categoryid:categoryId, searchkey:searchKeyword, token:tokenKey};  
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        return this.http.post(ConfigurationData.appBLURL + 'product/prodlist', rawData, options)
        .map((response : Response) => { 
            
            this.productsList= response.json().result;           
            return response.json()
        });
    }
    
    getProductList(brandSelections ?: string){
        var tokenKey = this.sharedServe.getTokenKey();

         let rawData={};
        if(brandSelections){
             rawData = {token:tokenKey,orderby:"product_name", brandid : brandSelections};
        }
        else{
             rawData = {token:tokenKey,orderby:"product_name"};
        }
  
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});
        

        return this.http.post(ConfigurationData.appBLURL + 'product/prodlist', rawData, options)
        .map((response : Response) => {            
            return response.json()
        });
    }

    getCategoryList(){
        var tokenKey = this.sharedServe.getTokenKey();

        let rawData = {token:tokenKey};  
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});
        

        return this.http.post(ConfigurationData.appBLURL + 'master/categorylist', rawData, options)
        .map((response : Response) => {            
            return response.json()
        });
    } 

    getBrandList(categoryId ?: string){
        var tokenKey = this.sharedServe.getTokenKey();

         let rawData={};
        if(categoryId){
             rawData = {token:tokenKey, categoryId : categoryId};
        }
        else{
             rawData = {token:tokenKey};
        }
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});
        

        return this.http.post(ConfigurationData.appBLURL + 'master/brandlist', rawData, options)
        .map((response : Response) => {            
            return response.json()
        });
    }

    getSortByList(){
        var tokenKey = this.sharedServe.getTokenKey();

        let rawData = {token:tokenKey};  
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});
        

        return this.http.post(ConfigurationData.appBLURL + 'master/sortbylist', rawData, options)
        .map((response : Response) => {            
            return response.json()
        });
    }
    
    //filtering array to get particular product by id

    getProductById(product_id:string){

        return this.productsList.find(x => x.product_id === product_id);
        
    }
}