var web3Provider = null;
var TestContract;
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
    TestContract = TruffleContract(data);
    TestContract.setProvider(web3Provider);

    // step3. get all event from contracts.
    getEvents();

    TestContract.deployed().then(function(instance) {
      return instance.get();
    }).then(function(result) {
      $("#value").text(result);
    }).catch(function(err) {
      console.log(err.message);
    });
    refreshValues();
  });
}

// step3
function getEvents () {
  console.log('getEvents called');
  TestContract.deployed().then(function(instance) {
    console.log('getEvents 1 called');
    var events = instance.allEvents(function(error, log){
      console.log('in getEvents');
      if (!error)
        $("#eventsList").prepend('<li>' + "events received " + '</li>');
        $("#eventsList").prepend('<li>' + log.event + '</li>'); // Using JQuery, we will add new events to a list in our index.html
    });
  }).catch(function(err) {
    console.log(err.message);
  });
}

function refreshValues() {
  TestContract.deployed().then(function(instance) {
    return instance.get();
  }).then(function(result) {
    $("#value").text(result);
  }).catch(function(err) {
    console.log(err.message);
  });

  TestContract.deployed().then(function(instance) {
    return instance.balanceOfContract();
  }).then(function(result) {
    $("#balance").text(result);
  }).catch(function(err) {
    console.log(err.message);
  });
}

// step2
function setByNonPayable() {
  console.log($("#sender").val());
  console.log($("#input_value").val());
  TestContract.deployed().then(function(instance) {
    return instance.setNP($("#input_value").val(), { from: $("#sender").val() });
  }).then(function(instance) {
    return refreshValues();
  }).catch(function(err) {
    console.log(err.message);
  });
//  console.log(web3.eth.defaultAccount);
//  console.log(web3.eth.Accounts);
}

// step2
function setByPayable() {
  TestContract.deployed().then(function(instance) {
    return instance.setP($("#p_input_value").val(), { from: $("#p_sender").val(), value: web3.toWei($("#p_ether").val(), "ether") });
  }).then(function(instance) {
    return refreshValues();
  }).catch(function(err) {
    console.log(err.message);
  });
}

// step2
function getOwner() {
  TestContract.deployed().then(function(instance) {
    //owner = instance.getOwner().then(o => { console.log(o); return o });
    return instance.getOwner();
  }).then(function(owner) {
    console.log(owner);
    $("#owner").text(owner);
    return refreshValues();
  }).catch(function(err) {
    console.log(err.message);
  });
}

// step2
function withdraw() {
  TestContract.deployed().then(function(instance) {
    console.log("withdraw");
    //return instance.withdraw( { from: "0x4812113d0A2824fD0c369BA16a826e1c08b9E191" } );
    return instance.withdraw( { from: $("#w_sender").val() } );
    //return instance;
  }).then(function(instance) {
    return refreshValues();
  }).catch(function(err) {
    console.log(err.message);
  });
}

$(function() {
  $(window).load(function() {
    init();
  });
});
