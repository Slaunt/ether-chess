'use strict';

/* eslint-env mocha */

let assert = require('assert');
let bs = require('beam-splitter');

describe('AccountRegistry', function() {
  let contract;

  before(() => {
    bs.setUp('http://localhost:8545');
    contract = bs.newContract('./contracts/AccountRegistry.sol');
    assert.ok(contract);
  });

  after(bs.tearDown);

  describe('#register()', function() {
    it('should be online', function() {
      console.log(contract, ', contract');
      assert.ok(bs.isConnected());
    });
  });
});
