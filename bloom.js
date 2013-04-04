var BloomBox = function() {

  var filter = [];
  var filterSize = 1283206; // 1,283,206 Optimized for false positive rate < (1 / dict size) with 4 filters


  //All hash functions from http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
  var hasher = {
    one: function(str, max) {
      //java String.hashCode() sim
      var hash = 0;
      if (str.length == 0) return hash;
      for (i = 0; i < str.length; i++) {
        var ch = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+ch;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash % max;
    },
    two: function(str, max) {
      //djb2
      var hash = 5381;
      for (i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + ch; /* hash * 33 + c */
      }
      return hash % max;
    },
    three: function(str, max) {
      //sdbm
      var hash = 0;
      for (i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        hash = ch + (hash << 6) + (hash << 16) - hash;
      }
      return hash;
    }
  }

  this.makeFilter = function(array) {
    for (i = 0; i < array.length; i++) {
      for (func in hasher) {
        filter[hasher[func](array.slice(i,i+1).toString(), filterSize)] = true;
      }
    }
  }

  this.checkFilter = function(string) {
    for (func in hasher) {
      if (filter[hasher[func](string, filterSize)] === true) {
        return true;
      }
    }
    return false;
  }
}



//get us the words with some jQuery
// $.get( "./lib/sowpods.txt", function(text) {
//   var words = txt.split("\n");

//   //feed the words into a bloom filter array
// });