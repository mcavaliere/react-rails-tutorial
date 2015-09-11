

$(function() {

  ReactRouter.run(routes, ReactRouter.HashLocation, function(Root) {
    React.render(<Root />, document.getElementById("app-container"));
  });
});