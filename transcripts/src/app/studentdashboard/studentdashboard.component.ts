import { Component, OnInit, AfterViewInit} from '@angular/core';
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
import { Router,ParamMap,ActivatedRoute } from '@angular/router'
import {AdminService} from '.././admin.service';
import {StudentService} from '.././student.service';
import {ViewTranscriptComponent} from '../view-transcript/view-transcript.component'
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '.././modal/modal.component';
declare let require: any;
declare let window: any;
let tokenAbi = require('../../../../build/contracts/Colleges.json');
//const ipfs = require('ipfs-http-client');

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {
  title = 'Student Panel';
  RequestTranscriptForm: FormGroup;
  collegeadd: string;
  myadd: string;
  applyto: string;
  CollegesList:{ name: string, ethaddress: string}[]=[];
  adminServ: AdminService;
  studServ: StudentService;
  private contr=window.web3.eth.contract(tokenAbi.abi).at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
  private reqaddedevent=this.contr.RequestAddedEvent();

  ReqColDefs = [
        {headerName: 'ID', field: 'rid' },
        {headerName: 'College Name', field: 'collegename'},
        {headerName:'IPFS Hash', field:'hash'},
        {headerName: "Action",cellRenderer:"childMessageRenderer", field: "id",width: 300}
    ];

  ReqrowData:Observable<any[]>;
  private gridApi;
  private gridColumnApi;
  private context;
  private frameworkComponents;

  constructor(private route: ActivatedRoute,private alerts: AlertsService,private modalService: NgbModal) { 
  	this.adminServ=new AdminService();
  	this.RequestTranscriptForm=new FormGroup({
  		    college: new FormControl(),
  			collid: new FormControl(),
  			branch: new FormControl(),  		
  			email: new FormControl()
  		});

  	this.collegeadd=this.route.snapshot.paramMap.get('college');
  	this.myadd=this.route.snapshot.paramMap.get('you');
  	this.studServ=new StudentService();
  	this.adminServ.getColleges().then(val=>{
       console.log(val);
       val.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          console.log(snapshot.college+" "+snapshot.ethaddress);
          this.CollegesList.push({name:snapshot.college,ethaddress:snapshot.ethaddress});
        });
    });   
     });
  	this.context = { componentParent: this };
  	this.frameworkComponents = {
      childMessageRenderer: ViewTranscriptComponent
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

  ngOnInit() {
  
  }

  SelectCollege(value){
  	this.applyto=value;
  	///console.log(this.applyto);
  }

  public listenForEvents(){
  		var self=this;
  		this.reqaddedevent.watch(function(err,res){
			if(!err){
			self.alerts.setMessage("New Request Id: "+res.args.id,'success');	
			}
			else{
				console.log("Error in request creation");						
			}
		});
  	}

  RequestTranscript(){
  		console.log("College Address: "+ this.RequestTranscriptForm.value["college"]);
		console.log("Student ID: "+ this.RequestTranscriptForm.value["collid"]);
		console.log("Student Branch: "+ this.RequestTranscriptForm.value["branch"]);
		console.log("Student Email: "+ this.RequestTranscriptForm.value["email"]);
		this.studServ.addRequest(this.RequestTranscriptForm.value["college"],this.RequestTranscriptForm.value["collid"])
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
    if(cityName=="ReceivedTranscript"){
    	this.getRequests();
    }
    evt.currentTarget.classname += " active";
	}

	public async getRequests(){
  		///await this.studServ.
  		await this.studServ.getCompletedRequest(this.collegeadd).then(val=>{
  			this.ReqrowData=val;
  			console.log(val);
  		})
  	}

}
