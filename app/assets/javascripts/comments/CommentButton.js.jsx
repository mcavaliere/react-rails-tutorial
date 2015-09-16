(function(){ 
  var CommentButton = React.createClass({
    getClasses: function() {
      var classes = {
        "comment-button": true,
        "btn": true,
        "btn-primary": true,
        "visible": this.state.visible
      };

      return React.addons.classSet( classes );
    },
    getInitialState: function() {
      return ({ visible: true });
    },
    componentDidMount: function() {
      // Hide the button when we're showing the form
      $(App).on("comment:show-add-form", function() {
        this.setState({ visible: false });
      }.bind(this));

      $(App).on("comment:hide-add-form", function() {
        this.setState({ visible: true });
      }.bind(this));
    },
    handleClick: function(e) {
      $(App).trigger("comment:show-add-form");
    },
    render: function() {
      return (
        <button className={this.getClasses()} onClick={this.handleClick}>Add a Comment</button>
      );
    }
  });

  $.extend(App.Components, {
    CommentButton: CommentButton
  });
})();