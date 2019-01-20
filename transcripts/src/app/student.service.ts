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


export class StudentService {
private web3Provider: null;
private contracts: {};
private contr=window.web3.eth.contract(tokenAbi.abi).at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
private CollegesObjects:{ college: string, email: string, ethaddress: string}[];
private CompReqObjects:{rid:number,collegename:string,hash:string}[];
private x:any[]=[];
private e;


constructor(){
if (typeof window.web3 !== 'undefined') {
this.web3Provider = window.web3.currentProvider;
} else {
this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
window.web3 = new Web3(this.web3Provider);
window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
this.CollegesObjects=[];
this.CompReqObjects=[];
}

async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
	}

public addRequest(coll_add: string, id:string){
    var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
    var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
    Colleges.postRequest(coll_add,id,function(err){
    	if(!err){
    		
    	}else{
    		console.log(err);
    	}
    })   
  }

  public async getCompletedRequest(collegeadd:string):Promise<Observable<{ rid: number, collegename: string, hash: string}[]>>{
  	var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
    var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
    /////////////////
    var self=this;   
   		var c=window.web3.eth.accounts[0];
   		await Colleges.getCompletedRequestIds(collegeadd,function(err,res){
   		 	if(!err){
   		 		//get ids of completed requests
   		 		self.x=res;
   		 		console.log(self.x);

   		 		//get other data of requests
   		 		self.e=self.x.length;
   		 		for(var count=0;count<self.e;count++){
	   		 		var t= self.x.pop();
   		 			console.log(t);
   		 			Colleges.getCompletedRequestData(t,function(e,re){
   		 				//var x=t.c[0];
   		 				if(!e){
   		 					self.CompReqObjects.push({rid:re[0],collegename:re[1],hash:re[2]});
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
   			 		console.log(self.CompReqObjects);
   			 		return of(self.CompReqObjects);
   			 		},function(){
   			 		//return of(self.CollegesObjects);
   			 		}
   			 	);
   			
   			return of(this.CompReqObjects);
   			console.log("Suprise MF!!!!!!!");
    
  }



}
