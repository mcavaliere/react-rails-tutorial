(function() {
  var Banner = React.createClass({
    add: function(message) {
      this.setState({
        messages: this.state.messages.concat(message)
      });
    },
    reset: function() {
      this.setState({
        messages: []
      });
    },
    prompt: function() {
      switch (this.props.type) {
        case "success":
          return "Success! ";

        case "info":
          return "Info: ";

        case "warning":
          return "Warning: ";

        case "danger":
          return "Error: ";
        
        default: 
          throw "The Banner component's 'type' prop must be one of 'success', 'info', 'warning' or 'danger.'";
      }
    },
    componentDidMount: function() {
      $(App).on("banner:add-"+this.props.type, function(e, message) {
        this.add(message);
      }.bind(this));

      $(App).on("banner:reset-"+this.props.type, function(e, message) {
        this.reset();
      }.bind(this));
    },
    getInitialState: function() {
      return ({ 
        messages: [] 
      });
    },
    render: function() {
      var alertClassName = "alert-"+this.props.type,
          classNames = { 
            "alert": true
          },
          classString;

      classNames[alertClassName] = true;
      classNames["hidden"]       = this.state.messages.length <= 0;
      classString                = React.addons.classSet( classNames );

      return (
        <div className={classString} role="alert">
          <strong>{this.prompt()}</strong>
          
          {this.state.messages}
        </div>
      );
    }
  });

  var MessageContainer = React.createClass({
    render: function() {
      return (
        <div className="message-container">
          <Banner type="success" />
          <Banner type="info" />
          <Banner type="warning" />
          <Banner type="danger" />        
        </div>
      );
    }
  });

  $.extend(App.Components, {
    Banner: Banner,
    MessageContainer: MessageContainer
  });
})();