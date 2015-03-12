var Dispatcher = require("flux").Dispatcher;
var assign = require("object-assign");

var FluxsterDispatcher = assign(new Dispatcher(), {
  dispatchAction: function(type,data) {
    var payload = {
      type: type,
      data: data
    }
    console.log("[FLUXSTER] Dispatch: ",payload);
    this.dispatch(payload);
  }
});

module.exports = FluxsterDispatcher;
