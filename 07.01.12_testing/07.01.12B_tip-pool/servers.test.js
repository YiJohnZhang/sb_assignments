describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo() w/ teardown', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');

  });

  it('should update the serverTbody on updateServerTable()', function(){

    onLoad();
    expect(document.getElementsByTagName('tbody')[1].innerHTML).toEqual('<tr id=\"server1\"><td>Alice</td><td>$0.00</td></tr>');

    //teardown
    const parentElement = document.getElementById('serverTable');
    while(parentElement.firstChild){
      parentElement.removeChild(parentElement.firstChild);
    }

    allServers = {};

  });

  afterEach(function() {
    // teardown logic
    serverNameInput.value = '';

  });
});

function onLoad(){}
document.addEventListener('DOMContentLoaded',onLoad);