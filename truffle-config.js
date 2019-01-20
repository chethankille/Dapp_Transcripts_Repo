/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
 var HDWalletProvider = require("truffle-hdwallet-provider");


var mnemonic = "thumb trade grace alone comic click escape jazz series spot street onion";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks : {
		development : {
		host : "127.0.0.1",
		port : 7545, // By default Ganache runs on this port.
		network_id : "*" // network_id for ganache is 5777. However, by keeping * as value you can run this node on any network
		},
		ropsten:{
			provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/44cb8676c50f4f0fa5ab7bfd621a6b05"),
      		network_id: 3
		},

	}
};
