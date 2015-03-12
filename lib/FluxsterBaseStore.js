var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var FluxsterBaseStore = assign({}, EventEmitter.prototype, {
  CHANGE_EVENT: "change",
  REGISTERED_ACTIONS: {},

  emitChange: function() {
    this.emit(this.CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(this.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  },

  registerAction: function(type,callback){
    this.REGISTERED_ACTIONS[type] = callback;
  },

  handleDispatchedEvent: function(payload){
    var data = payload.data;
    var handler = this.REGISTERED_ACTIONS[payload.type];
    if(handler){ 
      handler.call(this,data);
      this.emitChange();
    }
  },
});

module.exports = FluxsterBaseStore;