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
    if ( typeof n === 'number' ) {
      array = array.slice( 0, n  );
      return array;
    }
    return array[0];
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if ( typeof n === 'number' ) {
      if ( n <= array.length ) {
        array = array.slice( array.length - n, array.length );
      }
      return array;
    }
    return array[ array.length - 1 ];
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    var iterations = [];
    if ( Array.isArray( collection ) ) {
      for ( var i = 0; i < collection.length; i++ ) {
        iterations.push( iterator ( collection[i], i, collection ) );
      }
      return iterations;
    }
    for ( var prop in collection ) {
      iterations.push( iterator ( collection[prop], prop, collection ) );
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for ( var i = 0; i < array.length; i++ ) {
      if ( array[i] === target ) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var filtered = [];
    for ( var i = 0; i < collection.length; i++ ) {
      if ( iterator( collection[i] ) ) {
        filtered.push( collection[i] );
      }
    }
    return filtered;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var rejected = [];
    for ( var i = 0; i < collection.length; i++ ) {
      if ( !iterator( collection[i] ) ) {
        rejected.push( collection[i] );
      }
    }
    return rejected;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    array.sort();
    for ( var i = array.length - 1; i >= 0; i-- ) {
      for ( var j = i - 1; j >= 0; j-- ) {
        if ( array[i] === array[j] ) {
          array.splice( j, 1 );
        }
      }
    }
    return array;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var results = [];
    for ( var i = 0; i < array.length; i++ ) {
      results.push( iterator( array[i] ) );
    }
    return results;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var plucked = [];
    for ( var i = 0; i < array.length; i++ ) {
      plucked.push( array[i][propertyName] );
    }
    return plucked;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var invoked = [];
    for ( var i = 0; i < list.length; i++ ) {
      var arr = list[i];
      invoked.push( arr[methodName]( args ) );
    }
    return invoked;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var reduced;
    var previousValue = initialValue;
    if ( ( typeof initialValue === 'undefined' || initialValue === null ) && collection.length >= 1 ) {
      previousValue = 0;
    }
    for ( var i = 0; i < collection.length; i++ ) {
      reduced = iterator( previousValue, collection[ i ] );
      previousValue = reduced;
    }
    return reduced;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    if ( Array.isArray( collection ) ) {
      for ( var i = 0; i < collection.length; i++ ) {
        if ( collection[ i ] === target ) {
          return true;
        }
      }
    }
    for ( var prop in collection ) {
        if ( collection[ prop ] === target ) {
          return true;
        }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if ( typeof iterator === 'undefined' || iterator === null ) {
      return true;
    }
    for ( var i = 0; i < collection.length; i++ ) {
      if ( !iterator( collection[ i ] ) ) {
        return false;
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if ( typeof iterator === 'undefined' || iterator === null ) {
      var iterator = function( item ) {
        return item + item;
      }
    }
    for ( var i = 0; i < collection.length; i++ ) {
      if ( iterator( collection[ i ] ) ) {
        return true;
      }
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function( obj ) {
    for ( var i = 0; i <= arguments.length; i++ ) {
      Object.assign( arguments[ 0 ], arguments[ i ] );
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for ( var i = 0; i < arguments.length; i++ ) {
      for ( var prop in arguments[ 0 ] ) {
        if ( typeof arguments[ 0 ][ prop ] === 'undefined' || arguments[ 0 ][ prop ] === null ) {
          arguments[ 0 ][ prop ] = 'default';
        }
        arguments[ i ][ prop ] = arguments[ 0 ][ prop ];
      }
      Object.assign( arguments[ 0 ], arguments[ i ] );
    }
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var executed = false;
    return function( ) {
      if ( !executed ) {
        executed = true;
        return func;
      }
      return func();
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
    var slice = Array.prototype.slice;

    return function() {
      var args = slice.call( arguments ); //makes arguments a real array

      if ( args in results ) {
        return results[ args ];
      }
      return ( results[ args ] = func.apply( this, args ) ); //stores result of new func call into results object.  'this' refers to 'func'.
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var slice = Array.prototype.slice;
    //creates array of all arguments
    var args = slice.call( arguments );
    //passes in all arguments to setTimeout using apply property
    setTimeout.apply( this, args );
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var copy = [], elementsRemaining = array.length, randomIndex;
    while ( elementsRemaining ) {
      //generates random index
      randomIndex = Math.floor( Math.random() * elementsRemaining-- );
      //makes copy of random element from array and pushes it to end of copy array
      copy.push( array.slice( randomIndex, randomIndex + 2 ) )
    }
    return copy;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //sort collection from lowest to highest value
    collection = collection.sort( function( a, b ) {
      return b - a;
    } );
    // checks first if iterator is string.
    if ( typeof iterator === 'string' ) {
      // if value of iterator is a number, sorts collection accordingly
      if ( typeof collection[ iterator ] === 'number' ) {
        return collection.sort( function( a, b ) {
          if ( a[ iterator ] > b[ iterator ] ) {
            return 1;
          }
          if ( a[ iterator ] < b[ iterator ] ) {
            return -1;
          }
          return 0;
        } );
      }
      // if value of iterator is a string, sorts collection accordingly
      if ( typeof collection[ iterator ] === 'string' ) {
        return collection.sort( function( a, b ) {
          var iteratorA = a[ iterator ].length;
          var iteratorB = b[ iterator ].length;
          if ( iteratorA > iteratorB ) {
            return 1;
          }
          if ( iteratorA < iteratorB ) {
            return -1;
          }
          return 0;
        } );
      }
    }
    //returns collection sorted by iterator function
    return collection.sort( iterator );
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  // based off http://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
    var args = [].slice.call( arguments );
    var longest = args.reduce( function( a, b ) {
      return a.length > b.length ? a : b
    }, []);

    return longest.map( function( _, i ) {
      return args.map( function( array ){ return array[ i ] })
    });
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    result = [];

    function flattenThis( nestedArray ) {
      for ( var i = 0; i < nestedArray.length; i++ ) {
        if ( Array.isArray( nestedArray[ i ] ) ) {
          flattenThis( nestedArray[ i ] );
        }
        else {
          result.push( nestedArray[ i ] );
        }
      }
    }
    flattenThis( nestedArray );

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    // combine and reduce array arguments into one array
    var arrays = [].slice.call( arguments );

    // based off http://stackoverflow.com/questions/11076067/finding-matches-between-multiple-javascript-arrays
    var result = arrays.shift().reduce( function( res, v ) {
    if ( res.indexOf(v) === -1 && arrays.every( function(a) {
        return a.indexOf(v) !== -1;
    } ) )
    res.push(v);
    return res;
    }, []);

    return result;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var result = [];
    var arrays = arguments;
    var referenceArray = arrays[ 0 ];
    var arraysToCheck = [];
    for ( var i = 1; i < arrays.length; i++ ) {
      arraysToCheck.push( arrays[ i ] );
    }

    var arraysToCheckCleaned = [].concat.apply( [], arraysToCheck ).sort( function( a, b ) { return a - b; } );

    for ( var i = 0; i < referenceArray.length; i++ ) {
        if ( arraysToCheckCleaned.indexOf( referenceArray[ i ] ) === -1 ) {
          result.push( referenceArray[ i ] );
        }
    }
    return result;
  };

}).call(this);
