'use strict';

/* eslint-env mocha */

const assert = require('assert');
const gooey = require('gooey');
const Web3 = require('web3');

const utils = require('../utils.js');

const web3 = new Web3(require('ethereumjs-testrpc').provider());

const name = 'AccountRegistry';
const files = ['./contracts/AccountRegistry.sol'];

describe(name, function() {
  let accounts, registry;

  before(function(done) {
    this.timeout(10000);
    utils.getAccounts(web3).then(acc => {
      accounts = acc;
      return gooey.utils.deployFromFiles(web3, acc[0], name, files);
    }).then(contract => {
      registry = contract;
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
        })
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
        })
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
        })
      })
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
      }
      registry.register('someguy', tx, () => {
        let tx = {
          from: b,
          value: web3.toWei(0.5, 'ether')
        }
        registry.callout(a, tx, () => {
          registry.Challenge({from: b, to: a}, 'latest', (_, c) => {
            assert(c.args.amount.eq(tx.value));
            assert.equal(c.args.from, b);
            assert.equal(c.args.to, a);
            done();
          });
        });
      });
    });
  });

});
