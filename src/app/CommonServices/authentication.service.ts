import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import {CookieService, CookieOptionsArgs} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {ConfigurationData} from './configuration.model';

@Injectable()
export class AuthenticationService{

    private cookieOption: CookieOptionsArgs = {};

    constructor(private http: Http, 
    private cookieServe:CookieService){}
    //private authInfo: any = {};


    authenticateUser(userName:string, password:string){
        let authInfo = {uname:userName, doorkey:password};          
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        return this.http.post(ConfigurationData.appBLURL + 'member/authuser', authInfo, options)
        .map((response : Response) => {
            let userInfo = response.json();
            if(userInfo.status == ConfigurationData.successStatus && userInfo.token)
            {
                //store the token info in session.
                //localStorage.setItem(ConfigurationData.currentUserName, userInfo.token);
                var cookieDate = new Date();
                cookieDate.setDate(cookieDate.getDate() + 1);
                 this.cookieOption.expires = cookieDate;                 
                 this.cookieServe.put(ConfigurationData.currentUserName, userInfo.token, this.cookieOption);
                 this.cookieServe.put(ConfigurationData.currentUserDetails, JSON.stringify(userInfo.details), this.cookieOption);
            }
            return response.json();
        });
    }

    /**MOVE TO REGISTER */
    checkUserExists(userName:string){
        let authInfo = {uname:userName};  
        //let bodyString = JSON.stringify(authInfo); //Stringify object
        let headers = new Headers({ 'Content-Type': 'application/json' }); //Set content type to JSON
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        return this.http.post(ConfigurationData.appBLURL + 'member/checkEmail', authInfo, options)
        .map((response : Response) => {
            let userInfo = response.json();
            if(userInfo.status == ConfigurationData.successStatus && userInfo.token)
            {
                //store the token info in localstorage.
                localStorage.setItem(ConfigurationData.currentUserName, userInfo.token);
            }
            return response.json();
        });
    }

    logout(){
        localStorage.removeItem(ConfigurationData.currentUserName);
    }
}