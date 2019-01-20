import { Component, OnInit } from '@angular/core';
import { ElementRef, Input, OnDestroy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Buffer} from 'buffer';
import {ModalService} from '.././modal.service';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import * as EthUtil from 'ethereumjs-util';
declare let require: any;
declare let window: any;
let tokenAbi = require('../../../../build/contracts/Colleges.json');

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Upload Transcript</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Request Id <strong>{{id}}</strong></p>
    </div>
    <div class="material-button-row">
    <button mat-flat-button color="primary" (click)="fileInput.click()">
    <span>Select Trancript File:</span>
    <input #fileInput type="file" (change)="convertFileToBuffer($event)" style="display: none"/>
    </button>
    <button mat-flat-button color="primary" (click)="convertBufferToFile()" [disabled]="!buffer">Preview Transcript</button>
    <button mat-flat-button color="primary" (click)="uploadTranscript()" [disabled]="!buffer">Upload Transcript</button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
 // template: '<ng-content></ng-content>'
})
export class ModalComponent{

  @Input() id: number;
  private element: any;
  public buffer: Buffer;
  private modServ: ModalService;
  private contr=window.web3.eth.contract(tokenAbi.abi).at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
  private transcaddedevent=this.contr.RequestCompleted();


  constructor(public activeModal: NgbActiveModal) { 
  	this.modServ=new ModalService();
  }

	async convertBufferToFile(buffer: Buffer) {
    const file = new Blob([this.buffer], {type: 'application/pdf'});
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    }

    async uploadTranscript() {
    console.log(this.buffer);
    const hash = await this.modServ.store(this.buffer);
    console.log('Storage done on IPFS.Now storing hash on contract...');
    await this.modServ.uploadHash(this.id,hash);
    await this.listenForEvents();
    //window.location.reload();
  	}

  async convertFileToBuffer(event) {
    const file = event.target.files[0];
    let fileDataArray;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onloadend = async () => {
      console.log(fileReader.result);
      fileDataArray = fileReader.result;
      const buff = await Buffer.from(fileDataArray);
      console.log(buff);
      this.buffer = buff;
    };
  }

  public listenForEvents(){
  		var self=this;
  		this.transcaddedevent.watch(function(err,res){
			if(!err){
			//self.alerts.setMessage("New Request Id: "+res.args.id,'success');
			if(window.confirm('Transcript Uploaded. Click OK to continue.')){
				window.location.reload();
			}else{
			}

			}
			else{
				console.log(err);						
			}
		});
  	}
  
}
