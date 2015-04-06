var util = require("util");

module.exports = function inherent(ClassDef) {
  ClassDef.inherit = inherit.bind(this, ClassDef);
};

function inherit(thisClass, superConstructor, propertyNames) {
  var classPrototypeClone = clone(thisClass.prototype);
  var constructor = Object.getOwnPropertyDescriptor(thisClass.prototype, "constructor");

  if (!propertyNames) {
    util.inherits(thisClass, superConstructor);
  } else {
    clone(superConstructor.prototype, thisClass.prototype, propertyNames);
  }

  clone(classPrototypeClone, thisClass.prototype);

  thisClass.prototype.super = function() {
    this.constructor.super_.call(this);
  };
}

function clone(classPrototype, cloneTarget, propertyNames) {
  cloneTarget = cloneTarget || {};
  propertyNames = propertyNames || Object.getOwnPropertyNames(classPrototype);
  propertyNames.forEach(function(propName) {
    if(propName === "constructor"){ return; }
    var descriptor = Object.getOwnPropertyDescriptor(classPrototype, propName);
    Object.defineProperty(cloneTarget, propName, descriptor);
  });

  return cloneTarget;
}
