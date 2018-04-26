// Libraries
const PubNub = require('pubnub'); // PubNub library (WebSockets, WebRTC)

// Configuration
const config = {
  pubnub: {
    publishKey: 'pub-c-384b87af-eae8-46e5-a2d4-1adefb40e7a2',
    subscribeKey: 'sub-c-c6f46b64-494b-11e8-8f1e-8ac8d3db32cd',
    channel: 'wot-ontheroad-g1-channel'
  }
};

// Create Pusher instance
const pubnub = new PubNub({
  publishKey : config.pubnub.publishKey,
  subscribeKey : config.pubnub.subscribeKey
});
const pubnubListener = pubnub.addListener({
  message: function(m) {
    switch(m.channel) {
      case config.pubnub.channel:
        switch(m.message.item) {
          case 'front-door':
            console.log(`Front door is ${m.message.open }`);
            break;
        }
        break;
    }
  },
  presence: function(p) {
    console.log(p);
  },
  status: function(s) {
    console.log(s);
  }
});
pubnub.subscribe({
  channels: [config.pubnub.channel] 
});

// Loop
setInterval(() => {
  // Receive events in channel
}, 250);