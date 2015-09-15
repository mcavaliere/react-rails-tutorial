(function() {
  var Banner = React.createClass({
    componentDidMount: function() {
      $(App).on("banner:add-"+this.props.type, function(e, message) {
        this.setState({
          messages: this.state.messages.concat(message)
        })
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
          {this.state.messages}
        </div>
      );
    }
  });

  var MessageContainer = React.createClass({
    reset: function() {
      this.setState({
        success: [],
        info: [],
        warning: [],
        danger: []          
      });
    },
    shouldShow: function(type) {
      return this.getState(type).length > 0;
    },
    getInitialState: function() {
      return (
        success: [],
        info: [],
        warning: [],
        danger: []
      );
    },
    render: function() {
      var success,
          info,
          warning,
          danger


      return (
        <div id="message-container">
        </div>
      );
    }
  });


  $.extend(App.Components, {
    Banner: Banner,
    MessageContainer: MessageContainer
  });
})();