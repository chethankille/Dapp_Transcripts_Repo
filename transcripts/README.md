# Transcripts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

##Ganache
Run Ganache using 'npm init' in th ganache directory on your machine. 

## Development server
Run ng serve --open in 'transcripts' subdirectory. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##Metamask
Intsall Metamask plugin from Chrome Web Store and login using private key from Ganache. Select Ropsten Network and get free ether from metamask faucet. This is needed to deploy the smart contract on ropsten.

##Smart Contracts

Run truffle migrate --reset --network ropsten in the 'Dapp_Transcripts_Repo' to migrate the smart contracts to Ropsten Test Net.
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
