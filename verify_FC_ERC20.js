/*
 * if you want to run the tests, follow the steps
 *
 * npm install -g conflux-web
 *
 * npm install -g tape
 *
 * npm install -g tape-promise
 * 
 * npm install -g tap-spec 
 *
 * npm install -g nyc
 *  
 *  run :
 *      tape verify_FC_ERC20.js | tap-spec
 *
 * some help : https://github.com/substack/tape#other
 *
 *
 *
 * 
  */
const ConfluxWeb = require('conflux-web');
const test =require('tape-promise/tape');
const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');


const DEPLOYEDPRIVATEKEY = "0x2d50c1be33d59f5627cb3e80f9baea6761b411221faafa3c48808f247db6c6c5"; //eg: "0x2d50c1be33d59f5627cb3e80f9baea6761b411221faafa3c48808f247db6c6c5",
const DEPLOYEDADDRESS = "0xcf72957656b60f4d4144cc93206b4112508a023e"; // eg: "0xcf72957656b60f4d4144cc93206b4112508a023e" 
const fd = require("./demo-test/build/FC.sol.json");
const abi = fd.abi;
const DEPLOYEDABI = abi;// you can find in demo-test/build folder
const CONTRACTADDRESS = "0x3898de0484f68e84c536298d082b6fcb12d066ca"//"put deployed contract address"


confluxWeb.cfx.accounts.wallet.add({
    privateKey: DEPLOYEDPRIVATEKEY,
    address:DEPLOYEDADDRESS 
});
//const mc = new confluxWeb.cfx.Contract(abi).at("0x3898de0484f68e84c536298d082b6fcb12d066ca")
const myContract = new confluxWeb.cfx.Contract(DEPLOYEDABI, CONTRACTADDRESS, {
    defaultGasPrice: '10'
});


//returns a Promise
function getAccounts(){
    return confluxWeb.cfx.getAccounts()
}

test('test get account ', function (t) {
  return getAccounts().then( (accounts) =>{
    t.equal(accounts, DEPLOYEDADDRESS, "account must be your deploy contract address")
  })
})

function name() {
  return mycontract.methods.name().call()
}

test('test contract erc20 token name ', function (t) {
  return name().then( (name) =>{
    t.equal(name, "FansCoin", "name must be your deploy contract erc20 token name")
  })
})

function symbol() {
  return mycontract.methods.symbol().call()
}

test('test contract erc20 token symbol ', function (t) {
  return symbol().then( (result) =>{
    t.equal(result, "FC", "name must be your deploy contract erc20 token symbol")
  })
})

function decimals() {
  return mycontract.methods.decimals().call()
}

test('test contract erc20 token  decimals', function (t) {
  return decimals().then( (result) =>{
    t.equal(result, 18, "decimals must be your deploy contract set decimals")
  })
})

function cap() {
  return mycontract.methods.cap().call()
}

test('test contract erc20 token  decimals', function (t) {
  return cap().then( (result) =>{
    t.equal(result, 100000000000000000000000000, " must be your deploy contract set cap")
  })
})

function circulationRatio() {
  return mycontract.methods.circulationRatio().call()
}

test('test contract erc20 token  circulationRatio', function (t) {
  return circulationRatio().then( (result) =>{
    t.equal(result, 100, " must be your deploy contract set circulationRatio")
  })
})


function isAdmin(address) {
  return mycontract.methods.isAdmin(address).call()
}

test('test address is the admin role', function (t) {
  return isAdmin(DEPLOYEDADDRESS).then( (result) =>{
    t.equal(result, true, " deployer must be the admin role")
  })
})



/*
function name() {
    confluxWeb.cfx.getTransactionCount(confluxWeb.cfx.accounts.wallet[0].address).then(nonceValue => {
        const txParams = {
            from: 0,
            nonce: nonceValue, // make nonce appropriate
            gasPrice: 10,
            gas: 10000000,
            value: 0,
            to: "0x3898de0484f68e84c536298d082b6fcb12d066ca",//contract address
            data: myContract.methods.name().encodeABI(), // get data from ABI
        };
        confluxWeb.cfx.signTransaction(txParams)
            .then((encodedTransaction) => {
                const {
                    rawTransaction
                } = encodedTransaction;
                console.log('raw transaction: ', rawTransaction);
                return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
                    console.log('transaction hash from RPC: ', transactionHash);
                });
            }).catch(console.error);
    })
}


//name();
*/
