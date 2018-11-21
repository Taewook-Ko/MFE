var web3Provider = null;
var testContract;
var tcinstance;
const nullAddress = "0x0000000000000000000000000000000000000000";

function init() {
  // We init web3 so we have access to the blockchain
  initWeb3();
}

function initWeb3() {
  if (typeof web3 !== 'undefined' && typeof web3.currentProvider !== 'undefined') {
    web3Provider = web3.currentProvider;
    web3 = new Web3(web3Provider);
  } else {    
    console.error('No web3 provider found. Please install Metamask on your browser.');
    alert('No web3 provider found. Please install Metamask on your browser.');
  }
  
  // we init The Wrestling contract infos so we can interact with it
  initTestContract();
}

function initTestContract() {
  // step1
  $.getJSON('TestContract.json', function(data) {
    testContract = TruffleContract(data);
    testContract.setProvider(web3Provider);

    testContract.deployed().then(function(instance) {
      tcinstance = instance;
      console.log(tcinstance);
      return instance.get();
    }).then(function(result) {
      $("#value").text(result);
    }).catch(function(err) {
      console.log(err.message);
    });
    console.log(tcinstance);

    testContract.deployed().then(function(instance) {
      return instance.balanceOfContract();
    }).then(function(result) {
      $("#balance").text(result);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
}

// step3
function setByNonPayable() {
  console.log($("#sender").val());
  console.log($("#input_value").val());
  tcinstance.setNP($("#input_value").val());
//  testContract.deployed().then(function(instance) {
//    instance.setNP($("#input_value").val(), { from: $("#sender").val() });
//  }).catch(function(err) {
//    console.log(err.message);
//  });
//  console.log(web3.eth.defaultAccount);
//  console.log(web3.eth.Accounts);
}

$(function() {
  $(window).load(function() {
    init();
  });
});
