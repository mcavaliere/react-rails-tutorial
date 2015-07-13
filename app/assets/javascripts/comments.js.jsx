/** @jsx React.DOM */

(function(){ 
  var converter = new Showdown.converter();

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
      );
    }
  });

  var CommentForm = React.createClass({
    submit: function( comment ) {
      // Post to the server, and publish a global event. 
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: { comment: comment },
        success: function(data) {
          $(document).trigger("comment-add-success");

          this.close();
        }.bind(this),
        error: function(xhr, status, err) {
          $(document).trigger("comment-add-error");

          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    close: function() {
      this.setState({ visible: false });

      $(document).trigger("hide-add-form");
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
      this.submit({author: author, text: text});
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


  var CommentList = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function(comment, index) {
        return (
          // `key` is a React-specific concept and is not mandatory for the
          // purpose of this tutorial. if you're curious, see more here:
          // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <App.Components.Comment author={comment.author} key={index}>
            {comment.text}
          </App.Components.Comment>
        );
      });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  });



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
      $(document).on("show-add-form", function() {
        this.setState({ visible: false });
      }.bind(this));

      $(document).on("hide-add-form", function() {
        this.setState({ visible: true });
      }.bind(this));
    },
    handleClick: function(e) {
      $(document).trigger("show-add-form");
    },
    render: function() {
      return (
        <button className={this.getClasses()} onClick={this.handleClick}>Add a Comment</button>
      );
    }
  });

  $.extend(App.Components, {
    CommentBox: CommentBox,
    CommentButton: CommentButton,
    CommentForm: CommentForm,
    CommentList: CommentList
  });
})();








// This page:change event is a turbolinks thing. 
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

