var FluxsterDispatcher = require(__dirname + "/FluxsterDispatcher");
var FluxsterBaseStore =  require(__dirname + "/FluxsterBaseStore");
var FluxsterAction =  require(__dirname + "/FluxsterAction");
var assign = require("object-assign");

var Fluxster = {
  Stores: {},
  Actions: {},
  ActionTypes: {},

  createStore: function(storeName, storeConfig){
    var store = assign({}, FluxsterBaseStore, storeConfig);
    store.NAME = storeName;
    store.REGISTERED_ACTIONS = {};

    this.register(store.handleDispatchedEvent.bind(store));
    this.Stores[storeName] = store;
    return store;
  },

  createActions: function(actionSetName,actionMapping){
    var actions = {}
    var types = {}
    
    for(var action in actionMapping){
      var type = actionMapping[action];
      types[type] = type;
      actions[action] = (new FluxsterAction(type)).action;
    }

    this.ActionTypes[actionSetName] = types;
    this.Actions[actionSetName] = actions;
  },

  register: function(callback){
    return FluxsterDispatcher.register(callback);
  },

  serialize: function(){
    var data = {}

    for(var storeName in this.Stores){
      var store = this.Stores[storeName];

      if(store.serialize)
        data[storeName] = store.serialize();
    }
    JSON.serialize(data);
  },

  restore: function(jsonData){
    var data = JSON.parse(jsonData);

    for(var storeName in data){
      var store = this.Stores[storeName];
      
      if(store && store.restore)
        store.restore(data[storeName]);
    }
  }
}

module.exports = Fluxster;
