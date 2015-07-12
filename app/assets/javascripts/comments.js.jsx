/** @jsx React.DOM */

var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.props.author}
          </h3>
        </div>
        <div className="panel-body">
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: { comment: comment },
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
      </div>

      // <CommentForm onCommentSubmit={this.handleCommentSubmit} />
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Comment author={comment.author} key={index}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  close: function() {
    this.setState({ visible: false });
  },
  componentDidMount: function() {
    $(document).on("show-add-form", function(e) {
      this.setState({ visible: true });
    }.bind(this));
  },
  getInitialState: function() {
    return ({ visible: false });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  getContainerClasses: function() {
    return React.addons.classSet({
      "comment-form-container": true,
      "visible": this.state.visible
    });
  },
  getDisplayProperty: function() {
    return (this.state.visible === true ? "block" : "none");
  },
  render: function() {
    return (
      <div className={this.getContainerClasses()}>
        <div className="panel panel-default">
          <div className="panel-heading">Add a Note
            <button type="button" className="close pull-right" onClick={this.close}>×</button>
          </div>
          <div className="panel-body">
            <form className="commentForm " onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="control-label" forName="authorInput">Author</label>
                <input type="text" id="authorInput" className="form-control" placeholder="Your name" ref="author" />
              </div>
              <div className="form-group">
                <label className="control-label" forName="commentInput">Comment</label>
                <textarea className="form-control" id="commentInput" rows="3" placeholder="Say something..." ref="text" />
              </div>
              <input type="submit" className="btn btn-primary" value="Post" />
            </form>
          </div>
        </div>
      </div>
    );
  }
});

var CommentButton = React.createClass({
  handleClick: function(e) {
    $(document).trigger("show-add-form");
  },
  render: function() {
    return (
      <button className="btn btn-primary" onClick={this.handleClick}>Add a Comment</button>
    );
  }
});

// This page:change event is a turbolinks thing. 
$(function() {
  if ( $("#comment-list").length > 0 ) {
    React.renderComponent(
      <CommentBox url="comments.json" pollInterval={2000} />,
      $("#comment-list")[0]
    );

    React.renderComponent(
      <CommentButton />,
      $("#comment-form .button-container")[0]
    );

    React.renderComponent(
      <CommentForm />,
      $("#comment-form .form-container")[0]
    );
  }



});

