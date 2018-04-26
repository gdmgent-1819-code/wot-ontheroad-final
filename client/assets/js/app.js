const config = {
  pubnub: {
    publishKey: 'pub-c-384b87af-eae8-46e5-a2d4-1adefb40e7a2',
    subscribeKey: 'sub-c-c6f46b64-494b-11e8-8f1e-8ac8d3db32cd',
    channel: 'wot-ontheroad-g1-channel'
  }
};

((window) => {
  const app = {
    init() {
      this._pubnub = null; // PubNub service
      this._channel = null; // Channel in pusher
      this._frontDoorOpen = false;

      this.cacheDOMElements(); // Cache DOM-elements
      this.initializePubNub(); // Setup pubnub
    },
    cacheDOMElements() {
      this._$btnAction = document.querySelector('.btnAction');
      if(this._$btnAction) {
        this._$btnAction.addEventListener('click', (ev) => {
          ev.preventDefault();
          this.toggleFrontDoor();
          return false;
        });
      }
    },
    initializePubNub() {
      this._pubnub = new PubNub({
        publishKey : config.pubnub.publishKey,
        subscribeKey : config.pubnub.subscribeKey
      });
    },
    toggleFrontDoor() {
      this._frontDoorOpen = !this._frontDoorOpen;
      this.publishPubNubUpdate({item: 'front-door', open: this._frontDoorOpen});
    },
    publishPubNubUpdate(data) {
      this._pubnub.publish({
        channel: config.pubnub.channel, 
        message: data
      }, (status, response) => {
        console.log(status);
      });
    }
  }

  app.init(); // Initialize application
})(window);