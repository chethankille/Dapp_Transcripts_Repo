import { Component,  OnInit , NgZone } from '@angular/core';
import {NgIf} from '@angular/common';
import {LoginService} from './login.service';
import {AdminDashboardComponent} from  './admindashboard/admindashboard.component'
import { Router,ParamMap,ActivatedRoute } from '@angular/router'
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import * as EthUtil from 'ethereumjs-util';
import {Buffer} from 'buffer';
import {AdminService} from './admin.service';
import {Observable,of} from 'rxjs';
declare let require: any;
declare let window: any;
let tokenAbi = require('../../../build/contracts/Colleges.json');
//import './modal.less';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  res:any;
  selectedcollege:string;
  CollegesList:{ name: string, ethaddress: string}[]=[];
  title = 'Transcripts Dapp';
  logintype: string;
  hide : boolean;
  ro: boolean;
  lg: LoginService;
  private web3Provider: null;
  private contracts: {};
  //private router: Router;
  v: boolean;
  adminServ: AdminService;
  dropdownMenu: HTMLSelectElement;
  options: HTMLOptionsCollection;

  constructor(private router: Router, private _ngZone: NgZone){
  	this.lg=new LoginService();

    if (typeof window.web3 !== 'undefined') {
    this.web3Provider = window.web3.currentProvider;
    } else {
    this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    window.web3 = new Web3(this.web3Provider);
    //this.router=new Router();
   // this.ro=false;
    this.adminServ=new AdminService();
  }

  goToAdmin(){
    this.router.navigate(['/admin']);
    //window.location.href="/admin";
  }

  ngOnInit(){

  }

  public onChange(value){  
    if(value=="Student"){      
    	this.logintype="Student";   
      //set colleges here
      //this.adminServ.getColleges().subscribe
      this.adminServ.getColleges().then(val=>{
        //this.rowData=val;
       console.log(val);
       val.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          console.log(snapshot.college+" "+snapshot.ethaddress);
          this.CollegesList.push({name:snapshot.college,ethaddress:snapshot.ethaddress});
        });
    });
       //this.res=val;
       /*if (this.res && this.res.array) {
           this.res.array.forEach(element => {
           console.log(element.college);
         });
       }*/      
     });
    }
    else if(value=="College")
    	this.logintype="College";
    else if(value=="Admin")
    	this.logintype="Admin";

    console.log("Login Type " +this.logintype);
  }

  public onCollegeChange(value){
    this.selectedcollege=value;
  }


  public onClick(){
    var self=this;

    if(this.logintype=="Admin"){
   window.web3.eth.sign(window.web3.eth.accounts[0], window.web3.sha3('adminlogin'), function (err, signature) {
    if(err==null){
      console.log("Account: "+window.web3.eth.accounts[0]);  // But maybe do some error checking. :-)4
      console.log("Signature: "+signature); 
      ///////////////////////////////////
      const util = require('ethereumjs-util');
      const sig = util.fromRpcSig(signature);
      window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
    //const msg= new Buffer(window.web3.sha3('adminlogin'));
    const publicKey = util.ecrecover(util.toBuffer(window.web3.sha3('adminlogin')), sig.v, sig.r, sig.s);
    const address = util.pubToAddress(publicKey).toString('hex');
    if('0x'+address==window.web3.eth.accounts[0]){
      console.log("Account is Verified. Checking for admin rights.....");
     
   //check admin rights
    var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
    var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
    Colleges.getAdmin(window.web3.eth.accounts[0],function(error, result){
      if(!error){
      if(result[0]!=null && result[1]!=null)
      {
        console.log("Admin Name: "+result[0]);
         self.hide=true;
         self._ngZone.run(() => self.router.navigate(['/admin']));
      }
      else{
        console.log("No Admin Rights exist for this account.");       
      }
    }
      else{
        console.log(error);
        
      }

    });
    }
    else{
      console.log("Account not verfied. Generated address: "+address);
    }
    
   


  }
});
}

  else if(this.logintype=="College"){
   window.web3.eth.sign(window.web3.eth.accounts[0], window.web3.sha3('collegelogin'), function (err, signature) {
    if(err==null){
      console.log("Account: "+window.web3.eth.accounts[0]);  // But maybe do some error checking. :-)4
      console.log("Signature: "+signature); 
      ///////////////////////////////////
      const util = require('ethereumjs-util');
      const sig = util.fromRpcSig(signature);
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0];
    
    const publicKey = util.ecrecover(util.toBuffer(window.web3.sha3('collegelogin')), sig.v, sig.r, sig.s);
    const address = util.pubToAddress(publicKey).toString('hex');
    if('0x'+address==window.web3.eth.accounts[0]){
      console.log("Account is Verified. Checking for college rights.....");
     
   //check admin rights
    var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
    var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
    Colleges.getCollege(window.web3.eth.accounts[0],function(error, result){
      if(!error){
      if(result[0]!=null && result[1]!=null)
      {
        console.log("College Name: "+result[0]);
        console.log("College Email: "+result[1]);
         self.hide=true;
         self._ngZone.run(() => self.router.navigate(['/college']));       
      }
      else{
        console.log("No College Rights exist for this account.");      
      }
    }
      else{
        console.log(error);
        
      }

    });
    }
    else{
      console.log("Account not verfied. Generated address: "+address);            
    }
  }
});

  }
  else if(this.logintype=="Student"){
    window.web3.eth.sign(window.web3.eth.accounts[0], window.web3.sha3('studentlogin'), function (err, signature) {
    if(err==null){
      console.log("Account: "+window.web3.eth.accounts[0]);  // But maybe do some error checking. :-)4
      console.log("Signature: "+signature); 
      ///////////////////////////////////
      const util = require('ethereumjs-util');
      const sig = util.fromRpcSig(signature);
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0];
    
    const publicKey = util.ecrecover(util.toBuffer(window.web3.sha3('studentlogin')), sig.v, sig.r, sig.s);
    const address = util.pubToAddress(publicKey).toString('hex');
    if('0x'+address==window.web3.eth.accounts[0]){
      console.log("Account is Verified. Checking for student acess rights.....");
     

   //check student rights
    var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
    var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');

    Colleges.getStudentData(self.selectedcollege,window.web3.eth.accounts[0],function(error,result){
      if(!error){
        if(result!=null)
        {
          console.log("Student Id: "+result[0]);
          console.log("Student Name: "+result[1]);
          console.log("Student Branch: "+result[2]);
          console.log("Student Email: "+result[3]);
          console.log("Student Ethaddress: "+result[4]);
           self.hide=true;
           self._ngZone.run(() => self.router.navigate(['/student',{college: self.selectedcollege, you: window.web3.eth.accounts[0]}]));       
        }
        else{
          console.log("No Student Rights exist for this account.");      
        }
      }
      else{
        console.log(error);
      }
    });
    }
    else{
      console.log("Account not verfied. Generated address: "+address);            
    }
  }
});
  }
}
}