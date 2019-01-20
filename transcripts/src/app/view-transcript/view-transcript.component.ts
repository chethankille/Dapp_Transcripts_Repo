import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
//const ipfs= require('ipfs-http-client');
import * as ipfs from 'ipfs-http-client';
@Component({
  selector: 'download-transcript',
  template: `<span><button style="height: 20px" (click)="invokeParentMethod()" class="btn btn-info">View Transcript</button></span>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class ViewTranscriptComponent implements ICellRendererAngularComp {
  public params: any;
  public hash:number;
  private ipfs=new ipfs({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});;
  //this.hash=this.params.node.data.hash;
  	//this.ipfs = 
  agInit(params: any): void {
        //this.params = params;
        //console.log(this.params);
        this.hash=params.node.data.hash;
    }
  constructor() { 
  	
  }

  	public async invokeParentMethod() {
       // this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName} Node: ${this.params.node.data.studid}`)
       //this.params.context.componentParent.methodFromParent(`${this.params}`);
        //const modalRef = this.modalService.open(ModalComponent);
    	//modalRef.componentInstance.id = `${this.params.node.data.id}`;
     const data = await this.ipfs.cat(this.hash);
     const file = new Blob([data], {type: 'application/pdf'});
    	const fileURL = URL.createObjectURL(file);
    	window.open(fileURL);
    }
     	 

     refresh(): boolean {
        return false;
    }

  ngOnInit() {
  }

}
