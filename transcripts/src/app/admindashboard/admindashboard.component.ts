import { Component, OnInit, AfterViewInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AdminService} from '.././admin.service';
import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import * as EthUtil from 'ethereumjs-util';
import {Buffer} from 'buffer'; 
import { AlertsService } from 'angular-alert-module';
import {Observable,of} from 'rxjs';
declare let require: any;
declare let window: any;
let tokenAbi = require('../../../../build/contracts/Colleges.json');

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
	title = 'Admin Panel';
 	AddCollegeForm: FormGroup;
 	adminServ: AdminService;
 	AddAdminForm: FormGroup;
 	
 	private CollegesObjects:{ college: string, email: string, ethaddress: string}[];
 	private obj:{ college: string, email: string, ethaddress: string};
 	private web3Provider: null;
	private contracts: {};
	private contr=window.web3.eth.contract(tokenAbi.abi).at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
	private addedevent=this.contr.CollegeAddedEvent();
	private adminAddedEvent=this.contr.AdminAddedEvent();
	private bodyText: string;
     g=this;

     columnDefs = [
        {headerName: 'College', field: 'college' },
        {headerName: 'Email', field: 'email' },
        {headerName: 'Ethereum Address',width: 300, field: 'ethaddress'}
    ];

    //rowData:Observable<{ college: string, email: string, ethaddress: string}[]>;
    rowData:Observable<any[]>;
    /*rowData = [
        { college: 'Toyota', email: 'Celica', ethaddress: 35000 },
        { college: 'Ford', email: 'Mondeo', ethaddress: 32000 },
        { college: 'Porsche', email: 'Boxter', ethaddress: 72000 }
    ];*/

	ngOnInit() {
		this.alerts.setDefaults('timeout',3);
  		this.AddCollegeForm=new FormGroup({
  			collegename: new FormControl(),
  			email: new FormControl(),
  			ethaddress: new FormControl()
  		});
  		//this.modalService=new ModalService();
  		/////////////////////////////this.listenForEvents();
  		
  		this.AddAdminForm=new FormGroup({
  			adminname: new FormControl(),
  			//adminemail: new FormControl(),
  			adminethaddress: new FormControl()
  		});
  	 }


  	constructor(private alerts: AlertsService) { 
  		//var self=this;
  	if (typeof window.web3 !== 'undefined') {
	this.web3Provider = window.web3.currentProvider;
	} else {
	this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
	}
	window.web3 = new Web3(this.web3Provider);
	window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
  	this.adminServ=new AdminService();
  	
  	////////////
	this.getColleges();
  	}


  	public listenForEvents(){
  		var self=this;
  		this.addedevent.watch(function(err,res){
			if(!err){
			self.alerts.setMessage("New College Added: "+res.args.name,'success');
			console.log("New College Name: "+res.args.name);
			console.log("New College EmailId: "+res.args.email);
			console.log("New College Ethereum Address: "+res.args.ad);		
			//window.location.reload();
			}
			else{
				console.log("Error found in college added event");						
			}
		});

  	}


  	public listenforAdminEvents(){
  		var self=this;
  		this.adminAddedEvent.watch(function(err,res){
			if(!err){
			self.alerts.setMessage("New Admin Added: "+res.args.name,'success');
			console.log("New Admin Name: "+res.args.name);
			console.log("New Admin Ethereum Address: "+res.args.ad);		
			}
			else{
				console.log("Error found in admin added event");						
			}
		});
  	}

	public AddCollege(){
		console.log("College Name: "+ this.AddCollegeForm.value["collegename"]);
		console.log("Email ID: "+ this.AddCollegeForm.value["email"]);
		console.log("Ethereum Address: "+ this.AddCollegeForm.value["ethaddress"]);
		this.adminServ.addCollege(this.AddCollegeForm.value["ethaddress"],this.AddCollegeForm.value["collegename"], this.AddCollegeForm.value["email"]);			
      	setTimeout(()=>{this.listenForEvents();},5000);
      	//this.listenForEvents();
	}

	public AddAdmin(){
		console.log("Admin Name: "+ this.AddAdminForm.value["adminname"]);
		console.log("Ethereum Address: "+this.AddAdminForm.value["adminethaddress"]);
		this.adminServ.addAdmin(this.AddAdminForm.value["adminethaddress"],this.AddAdminForm.value["adminname"]);
		this.listenforAdminEvents();
	}

  	public openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    
    evt.currentTarget.classname += " active";
	}

	public async getColleges(){
  	await this.adminServ.getColleges().then(val=>{
  	 	 this.rowData=val;
  	 	console.log(val);
  	 });
  	 }

	
}
