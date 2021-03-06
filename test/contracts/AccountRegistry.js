'use strict';

/* eslint-env mocha */

/* eslint-disable max-nested-callbacks,new-cap */

const assert = require('assert');
const gooey = require('gooey');

const utils = require('../utils.js');

const web3 = utils.defaultWeb3();

const name = 'AccountRegistry';
const files = [
  './contracts/AccountRegistry.sol',
  './contracts/Match.sol'
];

describe(name, function() {
  let accounts;
  let registry;

  before(function(done) {
    this.timeout(10000);
    utils.getAccounts(web3).then(acc => {
      accounts = acc;
      return gooey.utils.deployFromFiles(web3, acc[0], [name], files);
    }).then(contract => {
      [registry] = contract;
      done();
    }).catch(done);
  });

  describe('#register()', function() {
    it('should not register below minimum stake', function(done) {
      let addr = accounts[1];
      let tx = {
        value: 500,
        from: addr
      };
      registry.register('nobody', tx, () => {
        registry.accounts(addr, (_, val) => {
          assert(!val[0]);
          done();
        });
      });
    });

    it('should register above minimum stake', function(done) {
      let addr = accounts[2];
      let tx = {
        value: web3.toWei(1, 'ether'),
        from: addr
      };
      registry.register('guy', tx, () => {
        registry.accounts(addr, (_, val) => {
          assert(val[0]);
          assert.equal('guy', val[1]);
          done();
        });
      });
    });
  });

  describe('#deregister()', function() {
    it('should refund monies on de-register', function(done) {
      let addr = accounts[3];
      let tx = {
        value: web3.toWei(1, 'ether'),
        from: addr
      };
      registry.register('quitter', tx, () => {
        web3.eth.getBalance(addr, (_, old) => {
          registry.deregister({from: addr}, () => {
            web3.eth.getBalance(addr, (_, updated) => {
              assert(old.lt(updated));
              registry.accounts(addr, (_, v) => {
                assert(!v[0]);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#callout()', function() {
    it('should trigger an event when challenging', function(done) {
      this.timeout(5000);
      let a = accounts[1];
      let b = accounts[2];
      let tx = {
        from: a,
        value: web3.toWei(1, 'ether')
      };
      registry.register('someguy', tx, () => {
        let tx = {
          from: b,
          value: web3.toWei(0.5, 'ether')
        };
        registry.callout(a, tx, () => {
          let filter = registry.Challenge({from: b, to: a});
          filter.watch((_, c) => {
            filter.stopWatching();
            assert.equal(b, c.args.from);
            assert.equal(a, c.args.to);
            done();
          });
        });
      });
    });
  });

  describe('#setMatchBroker()', function() {
    it('should not be callable by random user', function(done) {
      const brokerAddr = '0x123babe90987900000000000000000000007babe';
      let tx = {
        from: accounts[2]
      };
      registry.setBroker(brokerAddr, tx, () => {
        registry.broker((_, addr) => {
          assert.notEqual(brokerAddr, addr);
          done();
        });
      });
    });

    it('should be callable by the owner', function(done) {
      registry.owner((_, addr) => {
        const brokerAddr = '0x0000000000876bdcdeef2300000000000007babe';
        let tx = {
          from: addr
        };
        registry.setBroker(brokerAddr, tx, () => {
          registry.broker((_, addr) => {
            assert.equal(brokerAddr, addr);
            done();
          });
        });
      });
    });
  });
});
