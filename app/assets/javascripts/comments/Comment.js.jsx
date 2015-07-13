/** @jsx React.DOM */

(function(){ 
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

  $.extend(App.Components, {
    Comment: Comment
  });

})();