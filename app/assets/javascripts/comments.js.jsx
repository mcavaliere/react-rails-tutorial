/** @jsx React.DOM */

$(function() {
  if ( $("#comment-list").length > 0 ) {
    React.renderComponent(
      <App.Components.CommentBox url="comments.json" pollInterval={2000} />,
      $("#comment-list")[0]
    );

    React.renderComponent(
      <App.Components.CommentButton />,
      $("#comment-form .button-container")[0]
    );

    React.renderComponent(
      <App.Components.CommentForm url="comments.json" />,
      $("#comment-form .form-container")[0]
    );
  }
});