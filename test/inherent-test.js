var vows = require('vows'),
    sinon = require('sinon'),
    assert = require('assert');

    var util = require("util");

var inherent = require("../inherent");

vows.describe('inherent').addBatch({
  'root Function' : {
    topic : function () {
        return inherent;
    },
    'allows mixin of its interface' : function (prehistoric) {
      function Dog(){ }
      prehistoric(Dog);

      assert.isNotNull(Dog.inherit);

    }
  },
  'inherit' : {
    topic : function () {
        return inherent;
    },
    'inheretance onto Class prototype' : function (inherent) {
      var Vice = sinon.spy.create();

      Vice.prototype.crazy = true;

      Vice.prototype.goCrazy = function () {
        console.log("http://media.giphy.com/media/BVIino7KA5Ppe/giphy.gif");
      };

       function Wolverine(){
         console.log("WUT");
       }

      Wolverine.prototype.muttonchops = true;

      Wolverine.prototype.shaveChops = function () {
          return false;
      };

      inherent(Vice);

      Vice.inherit( Wolverine );
      var Doc = new Vice();

      assert.equal(Doc.goCrazy, Vice.prototype.goCrazy);
      assert.equal(Doc.shaveChops, Wolverine.prototype.shaveChops);
      assert.isTrue(Doc.crazy);
      assert.isTrue(Doc.muttonchops);

      assert.isTrue(Vice.called);

    },
    'inheretance onto Class prototype and calling super' : function (inherent) {
      var Vice = function () {
        this.super();
      };

      Vice.prototype.crazy = true;

      Vice.prototype.goCrazy = function () {
        console.log("http://media.giphy.com/media/BVIino7KA5Ppe/giphy.gif");
      };

       var Wolverine = sinon.spy.create();

      Wolverine.prototype.muttonchops = true;

      Wolverine.prototype.shaveChops = function () {
          return false;
      };

      inherent(Vice);

      Vice.inherit( Wolverine );
      var Doc = new Vice();

      assert.equal(Doc.goCrazy, Vice.prototype.goCrazy);
      assert.equal(Doc.shaveChops, Wolverine.prototype.shaveChops);
      assert.isTrue(Doc.crazy);
      assert.isTrue(Doc.muttonchops);

      assert.isTrue(Wolverine.called);

    },
    'allows inheretance of specific Class properties onto Class prototype' : function (inherent) {
      function Vice(){ }

      Vice.prototype.crazy = true;

      function Wolverine() {
      }

      Wolverine.prototype.muttonchops = true;
      Wolverine.prototype.retractable_claws = true;

      Wolverine.prototype.heyBub = function () {
        console.log("Hey, bub, I'm not finished with you yet.");
      };

      inherent(Vice);

      Vice.inherit( Wolverine, ["muttonchops"] ) ;

      var Doc = new Vice();
      assert.isTrue( Doc.crazy );
      assert.isTrue( Doc.muttonchops );
      assert.isUndefined( Doc.retractable_claws );
      assert.isUndefined( Doc.heyBub );
    }
  }
}).exportTo(module);
