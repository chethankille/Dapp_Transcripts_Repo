import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import * as EthUtil from 'ethereumjs-util';
import {Buffer} from 'buffer';
import {Observable,of} from 'rxjs';
declare let require: any;
declare let window: any;
const ipfs =require('ipfs-http-client');
let tokenAbi = require('../../../build/contracts/Colleges.json');


@Injectable({
  providedIn: 'root'
})
export class ModalService {
private ipfs;
private web3Provider: null;
private contracts: {};
private contr=window.web3.eth.contract(tokenAbi.abi).at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
//private id:number;

    constructor() {
    this.ipfs = new ipfs({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
   // this.id=s;
    if (typeof window.web3 !== 'undefined') {
		this.web3Provider = window.web3.currentProvider;
	} else {
		this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
	}
	window.web3 = new Web3(this.web3Provider);
	window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
  }

  	async store(data) {
    // Function to store data using IPFS
    const hash = await this.ipfs.add(data);
    console.log('IPFS Storage hash = ');
    console.log(hash);
    console.log(hash[0].hash);
    return hash[0].hash;
  }

   async retrieve(hash: string) {
    // Function to retrieve stored object using hash
    const data = await this.ipfs.cat(hash);
    console.log(data);
    return data;
  }

  async uploadHash(rid:number,hash:string){
  	var CollegesABI=window.web3.eth.contract(tokenAbi.abi);
    var Colleges = CollegesABI.at('0xc6f0172fc68167fc7781adc82f28f8c87f39eabf');
    //console.log("Id inside service: "+this.id);
    Colleges.addIpfsHash(rid,hash,function(err,res){
    	if(!err){
    		console.log("Success");
    	}else{
    		console.log(err);
    	}
    });
  }
}
