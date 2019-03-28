var SingletonTester = (function () {
  function Singleton(options = {}) {

    this.name = "SingletonTester";
    this.color = options.color || "red";

  }

  var instance;

  var _static = {
    name: "SingletonTester",

    getInstance: function(options) {
      if (instance === undefined) {
        instance = new Singleton(options);
      }

      return instance
    }

  };
  return _static;
})();

var singletonTest1 = SingletonTester.getInstance({
  color: "green"
})

var singletonTest2 = SingletonTester.getInstance()

console.log(singletonTest1.color) // "green"
console.log(singletonTest2.color) // "green"
console.log(singletonTest1 === singletonTest2)  // true 说明获得的是同一个对象