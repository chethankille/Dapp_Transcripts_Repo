import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import * as EthUtil from 'ethereumjs-util';
import {Buffer} from 'buffer';
import {Observable,of} from 'rxjs';
declare let require: any;
declare let window: any;


let tokenAbi = require('../../../build/contracts/Colleges.json');


@Injectable({
  providedIn: 'root'
})

export class AdminService {
private web3Provider: null;
private contracts: {};
private contr=window.web3.eth.contract(tokenAbi.abi).at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
private CollegesObjects:{ college: string, email: string, ethaddress: string}[];
private x:any[]=[];
private e;

 constructor() {
 
if (typeof window.web3 !== 'undefined') {
this.web3Provider = window.web3.currentProvider;
} else {
this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
window.web3 = new Web3(this.web3Provider);
window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
this.CollegesObjects=[];

}


	public addCollege(add: string,name: string, email: string){
	var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
    var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
    Colleges.setCollege(add,name,email,function(err){
    	if(!err){
    		//window.location.reload();
    	}
    	else{
    		console.log(err);
    	}
    });    
    }

    public addAdmin(add: string,name: string){
    var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
    var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
    Colleges.setAdmin(add,name,function(err){
    	if(!err){
    		//console.log(res);
    		//self.popup.show();
    	}
    	else{
    		console.log(err);
    	}
    });    
    }

    //delay function
	async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
	}

    public async getColleges():Promise<Observable<{ college: string, email: string, ethaddress: string}[]>>{
    	var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
   		var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
   		var self=this;   			
   		await Colleges.getColleges(function(err,res){
   		 	if(!err){
   		 		//get eth accounts of colleges
   		 		self.x=res;
   		 		console.log(self.x);

   		 		//get other data of accounts
   		 		self.e=self.x.length;
   		 		for(var count=0;count<self.e;count++){
	   		 		var t=self.x.pop();
   		 			console.log(t);
					Colleges.Collegelist(t,function(e,re){
						if(!e){
   		 					self.CollegesObjects.push({college:re[0],email:re[1],ethaddress:re[2]});
						}
						else{
							console.log(e);
						}
					});	
				}
   		 			
   		 		
   		 	}
   		 	else{
   		 		console.log(err);
   		 	}

   		 });


 
   				await this.delay(5000).then(function(){
   			 		console.log(self.CollegesObjects);
   			 		return of(self.CollegesObjects);
   			 		},function(){
   			 		//return of(self.CollegesObjects);
   			 		}
   			 	);

   				
   			
   			return of(this.CollegesObjects);
   			console.log("Suprise MF!!!!!!!");
   		


    }

}

