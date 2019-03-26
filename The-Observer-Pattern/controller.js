// 扩展对象属性方法
function extend( obj, extension ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}
 
var controlCheckbox = document.getElementById( "mainCheckbox" ),
  addBtn = document.getElementById( "addNewObserver" ),
  container = document.getElementById( "observersContainer" );
 
 
// 扩展 全选功能的checkbox 
extend( controlCheckbox, new Subject() );
 
// 点击将会通知所有已注册的观察者
controlCheckbox.onclick = function(){
  controlCheckbox.notify( controlCheckbox.checked );
};

// 点击按钮，会新增一个checkbox，并且自动注册到观察者列表中
addBtn.onclick = addNewObserver;
 
// 创建一个checkbox，并注册到观察者列表中
function addNewObserver(){
 
  // 创建 checkbox
  var check = document.createElement( "input" );
  check.type = "checkbox";
 
  // 将 checkbox 扩展观察者的属性，主要是初始化 update 方法
  extend( check, new Observer() );
 
  // 覆盖update方法，个性化自己的update方法
  check.update = function( value ){
    this.checked = value;
  };
 

  // 添加到观察者列表中
  controlCheckbox.addObserver( check );
 
  // 挂在 checkbox
  container.appendChild( check );
}