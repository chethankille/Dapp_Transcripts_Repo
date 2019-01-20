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
export class CollegeService {
private web3Provider: null;
private contracts: {};
private contr=window.web3.eth.contract(tokenAbi.abi).at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
private CollegesObjects:{ college: string, email: string, ethaddress: string}[];
private StudentObjects:{id: string, name: string, branch : string, email: string, ethaddress: string}[];
private ReqObjects:{id:number, studadd:string,studid: string}[];
private x:any[]=[];
private y:any[]=[];
private e;
private d;

  constructor() { 
if (typeof window.web3 !== 'undefined') {
this.web3Provider = window.web3.currentProvider;
} else {
this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
window.web3 = new Web3(this.web3Provider);
window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
this.StudentObjects=[];
this.ReqObjects=[];
  }

public addStudent(coll_add: string, id: string,name: string, branch: string, email: string, account:string){
    var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
    var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
    Colleges.addStudent(coll_add,id,name,branch,email,account,function(err){
    	if(!err){
					    		
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

public async getStudents():Promise<Observable<{ id: string, name: string, branch: string,email:string, ethaddress: string}[]>>{
    	var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
   		var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
   		var self=this;   
   		var c=window.web3.eth.accounts[0];
   		await Colleges.getStudents(c,function(err,res){
   		 	if(!err){
   		 		//get eth accounts of students
   		 		self.x=res;
   		 		console.log(self.x);

   		 		//get other data of students
   		 		self.e=self.x.length;
   		 		for(var count=0;count<self.e;count++){
	   		 		var t=self.x.pop();
   		 			console.log(t);
   		 			Colleges.getStudentData(c,t,function(e,re){
   		 				if(!e){
   		 					self.StudentObjects.push({id:re[0],name:re[1],branch:re[2],email:re[3],ethaddress:re[4]});
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
   			 		console.log(self.StudentObjects);
   			 		return of(self.StudentObjects);
   			 		},function(){
   			 		//return of(self.CollegesObjects);
   			 		}
   			 	);

   				
   			
   			return of(this.StudentObjects);
   			console.log("Suprise MF!!!!!!!");
   		
 

    }

    public async getPendingRequests():Promise<Observable<{id:number, studadd:string, studid: string}[]>>{
    	var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
   		var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
   		var self=this;   
   		var c=window.web3.eth.accounts[0];
   		await Colleges.getPendingRequestIdsCollege(function(err,res){
   		 	if(!err){
   		 		//get eth ids of reqs
   		 		self.y=res;
   		 		console.log(self.y);

   		 		//get other data of reqs
   		 		self.d=self.y.length;
   		 		for(var count=0;count<self.d;count++){
	   		 		var t=self.y.pop();
	   		 		//t=t.toNumber();
   		 			//console.log(t.c[0]);
   		 			// var u:number=t.c[0];
   		 			console.log(t);
   		 			Colleges.getPendingRequestsDataCollege(t,function(e,re){
   		 				if(!e){
   		 					console.log(t.c[0]);
   		 					self.ReqObjects.push({id: re[2], studadd: re[0],studid: re[1]});
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
   			 		console.log(self.ReqObjects);
   			 		return of(self.ReqObjects);
   			 		},function(){
   			 		//return of(self.CollegesObjects);
   			 		}
   			 	);

   				
   			
   			return of(this.ReqObjects);
   			console.log("Suprise MF 222222!!!!!!!");

    }
    
}
