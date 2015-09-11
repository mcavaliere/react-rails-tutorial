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

var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Dang. 404 Not Found.</h2>
        <p>Sorry, brah. That page ain&#39;t reals. </p>
      </div>
    );
  }
});

var CommentPage = React.createClass({
  componentDidMount: function() {
    React.render(
      <App.Components.CommentBox />,
      $("#comment-list")[0]
    );

    React.render(
      <App.Components.CommentButton />,
      $("#comment-form .button-container")[0]
    );

    React.render(
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

    return (
      <div id="content-container">
        <h1>App Container</h1>
        <RouteHandler />
      </div>
    );
  }
});

var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var routes = (
  <Route path="/" handler={ContentContainer}>
    <DefaultRoute handler={Home} />
    <NotFoundRoute handler={NotFoundPage} />

    <Route path="about" handler={About} />
    <Route path="comments" handler={CommentPage} />
    <Route path="inbox" handler={Inbox} />
    <Route path="home" handler={Home} />
  </Route>
);