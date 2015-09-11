(function(){ 
  var CommentForm = React.createClass({
    submit: function( comment ) {
      App.CommentService.create( comment ).
        then(function() {
          $(document).trigger("comment-add-success");

          this.close();          
        }.bind(this)).
        fail(function(xhr, status, err) {
          console.error(status, err.toString());
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

  $.extend(App.Components, {
    CommentForm: CommentForm
  });
})();