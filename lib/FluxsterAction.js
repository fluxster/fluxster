var FluxsterDispatcher = require(__dirname + "/FluxsterDispatcher");

function FluxsterAction(event){
  this.event = event;
  this.action = function(data){
    FluxsterDispatcher.dispatchAction(this.event,data);
  }.bind(this)
}

module.exports = FluxsterAction;