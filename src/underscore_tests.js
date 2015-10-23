/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if(typeof n === 'undefined'){
      return array[0];
    } else {
      var newArr = [];
      for (var i=0; i<n; i++) {
        newArr.push(array[i]);
      }
      return newArr.slice(0,array.length);
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (typeof n === 'undefined') {
      return array[array.length - 1];
    } else if ( n >= array.length ) {
      return array;
    } else {
      var newArr = [];
      for (var i=array.length -n; i<array.length; i++) {
        newArr.push(array[i]);
      }
      return newArr.slice(0,array.length);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var ind = -1;
    for (var i=0; i<array.length; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return ind;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var newArr = [];
    collection.forEach(
      function(item){
        if (iterator(item)) {
          newArr.push(item);
        }
      }
    );
    return newArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var newArr = [];
    collection.forEach(
      function(item){
        if (!iterator(item)) {
          newArr.push(item);
        }
      }
    );
    return newArr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    var sorted = array.sort();

    var newArr = [sorted[0]];
    compare(0);
    return newArr;

    function compare(ind) {
      if (ind == sorted.length-1) {
        return;
      }
      if (sorted[ind+1] !== sorted[ind]) {
        newArr.push(sorted[ind+1]);
      }
      compare(ind+1);
    }
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var newArr = [];
    for (var i=0; i<array.length; i++) {
      newArr[i] = iterator(array[i]);
    }
    return newArr;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var newArr = [];
    for (var i=0; i<array.length; i++) {
      newArr.push(
        array[i][propertyName]
      );
    }
    return newArr;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var argsArray = [];
    if (typeof args !== 'undefined' && args.constructor === Array) {
      argsArray.concat(args);
      }

    if (typeof methodName == 'function') {
      for (var i=0; i<list.length; i++) {
        list[i] = methodName.apply(list[i], argsArray);
      }
    } else if (typeof methodName == 'string') {
        for (var i=0; i<list.length; i++) {
        list[i][methodName].apply(list[i], argsArray);
      }
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    if (typeof initialValue == 'undefined') {
      var soFar = collection[0];
      collection.shift();
    } else {
      var soFar = initialValue;
    }
    while (collection.length > 0) {
      soFar = iterator(soFar, collection[0]);
      collection.shift();
    }
    return soFar;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var newArr = [];

    traverse(collection, target)

    return (newArr.length > 0);

    function traverse(o, target) {
      for (var i in o) {
        if (o[i] === target) {
          newArr.push(o[i]);
        }
        if (o[i] !== null && typeof (o[i])=="object") {
          //keep going
          traverse(o[i], target)
        }
      }
    }


  };






  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (!iterator) {return !!collection};
    var bool = true;
    var i = 0;
    while (bool && i<collection.length) {
      bool = !!(iterator(collection[i]));
      i++;
    }
    return bool;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one



  _.some = function(collection, iterator) {
    if (typeof iterator == 'undefined') {
      iterator = function(a) {
        return !!a;
      }
    }
    var bool = false;
    var i = 0;
    while (!bool && i<collection.length) {
      bool = !!(iterator(collection[i]));
      i++;
    }
    return bool;
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(inObj) {
    for (var i = 1; i < arguments.length; i++) {
      var argObj = arguments[i];
      for (var key in argObj) {
        if (typeof argObj[key] !== undefined ) {
          inObj[key] = argObj[key];
        }
      }
    }
    return inObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(inObj) {
    for (var i = 1; i < arguments.length; i++) {
      var argObj = arguments[i];
      for (var key in argObj) {
        if (!inObj.hasOwnProperty(key) || typeof inObj[key] == 'undefined'){
          if (typeof argObj[key] !== 'undefined' ) {
            inObj[key] = argObj[key];
          }
        }
      }
    }
    return inObj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var beenRun = false;
    var firstRun = null;
    return function() {
      if (!beenRun) {
        beenRun = true;
        firstRun = func();
        return firstRun;
      }
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};
    return function(a){
      if (!results.hasOwnProperty(a)) {
        results[a] = func(a);
      }
      return results[a];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };



  // Shuffle an array.
  _.shuffle = function(array) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

}).call(this);
