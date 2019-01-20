import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '.././modal/modal.component';

@Component({
   selector: 'child-cell',
    template: `<span><button style="height: 20px" (click)="invokeParentMethod()" class="btn btn-info">Send Transcript</button></span>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class ChildMessageRendererComponent implements  ICellRendererAngularComp {

	public params: any;
    public id:number;

    agInit(params: any): void {
        this.params = params;

    }

    constructor(private modalService: NgbModal) { }

    public invokeParentMethod() {
       // this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName} Node: ${this.params.node.data.studid}`)
       //this.params.context.componentParent.methodFromParent(`${this.params}`);
       const modalRef = this.modalService.open(ModalComponent);
    	modalRef.componentInstance.id = `${this.params.node.data.id}`;
    }

     refresh(): boolean {
        return false;
    }

  	

	  ngOnInit() {
	  }

}
