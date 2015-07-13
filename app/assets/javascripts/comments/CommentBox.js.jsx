/** @jsx React.DOM */

(function(){ 

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
          <App.Components.CommentList data={this.state.data} url={this.props.url} />
        </div>
      );
    }
  });

  $.extend(App.Components, {
    CommentBox: CommentBox
  });  
})();