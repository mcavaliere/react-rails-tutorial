(function(){ 
  var converter = new Showdown.converter();

  var Comment = React.createClass({
    delete: function(e) {
      e.preventDefault();

      App.CommentService.destroy( this.props.id ).
        then(function() {
          $(document).trigger("comment-delete-success");
        }).
        fail(function() {
          console.error(status, err.toString());
        });
    },
    render: function() {
      var rawMarkup = converter.makeHtml(this.props.children.toString());
      return (
        <div className="comment panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">
              {this.props.author}
            </h3>
            <button type="button" className="close pull-right" onClick={this.delete}>×</button>
          </div>
          <div className="panel-body">
            <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
          </div>
        </div>
      );
    }
  });

  $.extend(App.Components, {
    Comment: Comment
  });
})();