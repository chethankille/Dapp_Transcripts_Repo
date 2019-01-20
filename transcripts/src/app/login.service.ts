import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import * as EthUtil from 'ethereumjs-util';
import {Buffer} from 'buffer';
//import {} from 'rxjs';
//import { of } from 'rxjs';
declare let require: any;
declare let window: any;
let tokenAbi = require('../../../build/contracts/Colleges.json');



@Injectable({
  providedIn: 'root'
})
export class LoginService {

private web3Provider: null;
private contracts: {};


 constructor() { 
if (typeof window.web3 !== 'undefined') {
this.web3Provider = window.web3.currentProvider;
} else {
this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
window.web3 = new Web3(this.web3Provider);

}







/*verifyAdmin(): Observable<boolean> {
	var d:boolean;
	var x:boolean;
	//window.web3.eth.defaultAccount =window. web3.eth.accounts[0];
	window.web3.eth.sign(window.web3.eth.accounts[0], window.web3.sha3('adminlogin'), function (err, signature) {
		//if(err==null){
  		console.log("Account: "+window.web3.eth.accounts[0]);  // But maybe do some error checking. :-)4
  		console.log("Signature: "+signature); 
  		///////////////////////////////////
  		const util = require('ethereumjs-util');
		const sig = util.fromRpcSig(signature);
		//const msg= new Buffer(window.web3.sha3('adminlogin'));
		const publicKey = util.ecrecover(util.toBuffer(window.web3.sha3('adminlogin')), sig.v, sig.r, sig.s);
		const address = util.pubToAddress(publicKey).toString('hex');
		if('0x'+address==window.web3.eth.accounts[0]){
			console.log("Account is Verified. Checking for admin rights.....");
			d=true;
		///////////////
		//var CollegesInfo=JSON.parse(tokenAbi);
		//var Collegesabi=JSON.parse(tokenAbi);
		//var d:boolean;
		
		//x=d;
		}
		else{
			console.log("Account not verfied. Generated address: "+address);
			//x=false;
			//return  of(false);
			d=false;
			
		}
		
		if(d==true){
		//////check if admin rights exist

		var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
		var Colleges = CollegesABI.at('0x3b135b3340583a8e66aa38e7ad11bb49994331dd');
		Colleges.getAdmin(window.web3.eth.accounts[0],function(error, result){
			//(async () => { 
			//await delay(2000);
			if(error==null){


			if(result[0]!=null && result[1]!=null)
			{
				console.log("Admin Name: "+result[0]);
				//return of(true);
				//d=true;
				//x=true;
				//return of(true);
				x= true;
				return of(true);

			}
			else{
				console.log("No Admin Rights exist for this account.");
				//x=false;
				//return  of(false);
				//d=false;
				x=false;
				return of(false);
			}
		}
			else{
				console.log(error);
				//x=false;
				//return  of(false);
				//return of(false);
				x=false;
				return of(false);
			}
//})();

		});


			}

			else{
				x=false;
				return of(false);
			}






});

//return of(false);

			return of(false);


	
}*/



}
