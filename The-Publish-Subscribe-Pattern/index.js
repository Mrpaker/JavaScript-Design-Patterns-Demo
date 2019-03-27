function Pubsub() {
  this.topics = {};
  this.subUid = -1;
}

Pubsub.prototype.publish = function( topic, args ) {
  const topics = this.topics;
  if ( !topics[topic] ) {
      return false;
  }

  var subscribers = topics[topic],
      len = subscribers ? subscribers.length : 0;

  while (len--) {
      subscribers[len].func( topic, args );
  }

  return this;
};

Pubsub.prototype.subscribe = function( topic, func ) {
  const topics = this.topics;
  if (!topics[topic]) {
      topics[topic] = [];
  }

  var token = ( ++this.subUid ).toString();
  topics[topic].push({
      token: token,
      func: func
  });
  return token;
};

Pubsub.prototype.unsubscribe = function( token ) {
  const topics = this.topics;
  for ( var m in topics ) {
      if ( topics[m] ) {
          for ( var i = 0, j = topics[m].length; i < j; i++ ) {
              if ( topics[m][i].token === token ) {
                  topics[m].splice( i, 1 );
                  return token;
              }
          }
      }
  }
  return this;
};

const pubsub = new Pubsub()

// USE
var messageLogger = function ( topics, data ) {
  console.log( "Logging: " + topics + ": " + data );
};

var subscription = pubsub.subscribe( "inbox/newMessage", messageLogger );

pubsub.publish( "inbox/newMessage", "hello world!" ); // Logging: inbox/newMessage: hello world!

pubsub.publish( "inbox/newMessage", ["test", "a", "b", "c"] );  // Logging: inbox/newMessage: test,a,b,c

pubsub.publish( "inbox/newMessage", {
sender: "hello@google.com",
body: "Hey again!"
}); // Logging: inbox/newMessage: [object Object]

pubsub.unsubscribe( subscription );

pubsub.publish( "inbox/newMessage", "Hello! are you still there?" );  // 这里不会再打印了