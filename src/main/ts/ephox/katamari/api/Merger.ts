import Type from './Type';

var shallow = function (old, nu) {
  return nu;
};

var deep = function (old, nu) {
  var bothObjects = Type.isObject(old) && Type.isObject(nu);
  return bothObjects ? deepMerge(old, nu) : nu;
};

var baseMerge = function (merger) {
  return function() {
    // Don't use array slice(arguments), makes the whole function unoptimisable on Chrome
    var objects = new Array(arguments.length);
    for (var i = 0; i < objects.length; i++) objects[i] = arguments[i];

    if (objects.length === 0) throw new Error('Can\'t merge zero objects');

    var ret = {};
    for (var j = 0; j < objects.length; j++) {
      var curObject = objects[j];
      for (var key in curObject) if (curObject.hasOwnProperty(key)) {
        ret[key] = merger(ret[key], curObject[key]);
      }
    }
    return ret;
  };
};

var deepMerge:any = baseMerge(deep);
var merge = baseMerge(shallow);

export default <any> {
  deepMerge: deepMerge,
  merge: merge
};