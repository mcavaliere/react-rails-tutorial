/** @jsx React.DOM */

(function(){ 
  var converter = new Showdown.converter();

  var Comment = React.createClass({
    getUrl: function() {
      return "/comments/" + this.props.id;
    },
    delete: function(e) {
      e.preventDefault();

      $.ajax({
        url: this.getUrl(),
        dataType: "json",
        method: "DELETE",
        _method: "delete",
        success: function() {
          $(document).trigger("comment-delete-success");
        }.bind(this),
        error: function() {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
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