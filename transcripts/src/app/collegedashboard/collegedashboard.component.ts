import { Component, OnInit, AfterViewInit,ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {CollegeService} from '.././college.service';
import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import * as EthUtil from 'ethereumjs-util';
import {Buffer} from 'buffer';
import { AlertsService } from 'angular-alert-module';
import {Observable,of} from 'rxjs';
import {ChildMessageRendererComponent} from '../child-message-renderer/child-message-renderer.component'
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '.././modal/modal.component';
declare let require: any;
declare let window: any;
let tokenAbi = require('../../../../build/contracts/Colleges.json');


@Component({
  selector: 'app-collegedashboard',
  templateUrl: './collegedashboard.component.html',
  styleUrls: ['./collegedashboard.component.css']
})
export class CollegedashboardComponent implements OnInit {
	private context;
 	 private frameworkComponents;
 	title = 'College Panel';
 	AddStudentForm: FormGroup;
 	collserv: CollegeService;
    private CollegesObjects:{ college: string, email: string, ethaddress: string}[];
 	private obj:{ college: string, email: string, ethaddress: string};
 	private web3Provider: null;
	private contracts: {};
	private contr=window.web3.eth.contract(tokenAbi.abi).at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
	private addedevent=this.contr.StudentAddedEvent();
	private bodyText: string;
     g=this;


     columnDefs = [
        {headerName: 'ID', field: 'id' },
        {headerName: 'Name', field: 'name' },
        {headerName: 'Branch', field: 'branch' },
        {headerName: 'Email', field: 'email' },
        {headerName: 'Ethereum Address',width: 300, field: 'ethaddress'}
    ];

    rowData:Observable<any[]>;

    ReqColDefs=[
      {headerName: "ID", field: "id",width: 100},
      {headerName: "Student Address",field: "studadd",width:300},
      {headerName: "Student ID",field: "studid",width: 200},
      {headerName: "Action",cellRenderer:"childMessageRenderer", field: "id",width: 300}
    ];

    ReqrowData:Observable<any[]>;
    private gridApi;
  	private gridColumnApi;



  constructor(private alerts: AlertsService,private modalService: NgbModal) {
  	this.AddStudentForm=new FormGroup({
  		    id: new FormControl(),
  			name: new FormControl(),
  			branch: new FormControl(),  		
  			email: new FormControl(),
  			ethaddress: new FormControl()
  		});
  	this.collserv=new CollegeService();
  	//this.getStudents();
  	this.context = { componentParent: this };
  	this.frameworkComponents = {
      childMessageRenderer: ChildMessageRendererComponent
    };
   }

   onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  methodFromParent(cell) {
    alert("Parent Component Method from " + cell + "!");
  }
  

  ngOnInit(){
  	this.alerts.setDefaults('timeout',3);
  	this.AddStudentForm=new FormGroup({
  			name: new FormControl(),
  			id: new FormControl(),
  			branch: new FormControl(),  		
  			email: new FormControl(),
  			ethaddress: new FormControl()
  		});
  }

  public listenForEvents(){
  		var self=this;
  		this.addedevent.watch(function(err,res){
			if(!err){
			self.alerts.setMessage("New Student Added: "+res.args.name,'success');
			console.log("New Student Name: "+res.args.name);
			console.log("New Student Id: "+res.args.id);	
			//window.location.reload();
			}
			else{
				console.log("Error found in student added event");						
			}
		});
  	}

  public AddStudent(){
  		console.log("Student Name: "+ this.AddStudentForm.value["name"]);
		console.log("Student ID: "+ this.AddStudentForm.value["id"]);
		console.log("Student Branch: "+ this.AddStudentForm.value["branch"]);
		console.log("Student Email: "+ this.AddStudentForm.value["email"]);
		console.log("Ethereum Address: "+ this.AddStudentForm.value["ethaddress"]);
		this.collserv.addStudent(window.web3.eth.accounts[0],this.AddStudentForm.value["id"],this.AddStudentForm.value["name"],this.AddStudentForm.value["branch"],this.AddStudentForm.value["email"],this.AddStudentForm.value["ethaddress"])
      	setTimeout(()=>{this.listenForEvents();},5000);
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
    if(cityName=="ViewStudent"){
    	this.getStudents();
    }
    if(cityName=="TranscriptRequests"){
    	this.getRequests();
    }
    evt.currentTarget.classname += " active";
	}


	public async getStudents(){

  	await this.collserv.getStudents().then(val=>{
  	 	 this.rowData=val;
  	 	console.log(val);
  	 });
  	 }

  	public async getRequests(){
  		await this.collserv.getPendingRequests().then(val=>{
  			this.ReqrowData=val;
  			console.log(val);
  		})
  	}


}
