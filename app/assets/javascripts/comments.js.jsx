/** @jsx React.DOM */

var About = React.createClass({
  render: function() {
    return <h2>About</h2>;
  }
});
var Inbox = React.createClass({
  render: function() {
    return <h2>Inbox</h2>;
  }
});
var Home = React.createClass({
  render: function() {
    return <h2>Home</h2>;
  }
});

var CommentPage = React.createClass({
  componentDidMount: function() {
    React.renderComponent(
      <App.Components.CommentBox />,
      $("#comment-list")[0]
    );

    React.renderComponent(
      <App.Components.CommentButton />,
      $("#comment-form .button-container")[0]
    );

    React.renderComponent(
      <App.Components.CommentForm />,
      $("#comment-form .form-container")[0]
    );    
  },
  render: function() {
    return (
      <div>
        <div id="comment-list"></div>
        <div id="comment-form">
          <div className="button-container">
          </div>
          <div className="form-container">
          </div>
        </div>
      </div>
    );
  }
});

var ContentContainer = React.createClass({
  render: function() {
    var Child;

    switch (this.props.route) {
      case "about":
        Child = About;
        break;

      case "comments": 
        Child = CommentPage;
        break;

      case "inbox": 
        Child = Inbox;
        break;

      default:
        Child = Home;
        break;
    }

    return (
      <div id="content-container">
        <h1>App Container</h1>
        <Child />
      </div>
    );
  }
});



$(function() {

  function render() {
    var route = window.location.hash.substr(1);
    React.renderComponent(<ContentContainer route={route} />, document.getElementById("app-container"));
  }

  window.addEventListener("hashchange", render);

  render();

/*
  if ( $("#comment-list").length > 0 ) {
    React.renderComponent(
      <App.Components.CommentBox />,
      $("#comment-list")[0]
    );

    React.renderComponent(
      <App.Components.CommentButton />,
      $("#comment-form .button-container")[0]
    );

    React.renderComponent(
      <App.Components.CommentForm />,
      $("#comment-form .form-container")[0]
    );
  }

*/
});