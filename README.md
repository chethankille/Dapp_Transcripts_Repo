# Dapp_Transcripts_Repo
Ethereum Dapp for Educational Transcripts
This Dapp Allows Colleges to send transcripts to students who have applied for transcripts. Also students can apply for transcripts to multiple colleges. Admin accounts can add colleges and new admins
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Ganache
Run Ganache using 'npm init' in th ganache directory on your machine. 

## Development server
Run ng serve --open in 'transcripts' subdirectory. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Metamask
Intsall Metamask plugin from Chrome Web Store and login using private key from Ganache. Select Ropsten Network and get free ether from metamask faucet. This is needed to deploy the smart contract on ropsten.

## Smart Contracts
In the Colleges.sol constructor() two colleges and one admin account are added. You must update the admin address to any address on your Metamask plugin since you need to have access to atleast one admin account to operate the Dapp as an admin. Similarly for Colleges add address from your Ganache GUI.  
Run truffle migrate --reset --network ropsten in the to migrate the smart contracts to Ropsten Test Net.
Copy the address for Colleges.sol and update in the 'transcripts' subdirectory wherever necessary.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
