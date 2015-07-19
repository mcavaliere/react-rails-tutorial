/** @jsx React.DOM */

$(function() {
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
});