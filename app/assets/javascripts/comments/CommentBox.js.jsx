(function(){ 

  var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
      App.Services.Comments.all().
        then(function(data) {
          this.setState({data: data});
        }.bind(this)).
        fail(function(xhr, status, err) {
          console.error(status, err.toString());
        });
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadCommentsFromServer();
      
      $(document).on("comment-add-success", function() {
        this.loadCommentsFromServer();
      }.bind(this));
      
      $(document).on("comment-delete-success", function() {
        this.loadCommentsFromServer();
      }.bind(this));
    },
    render: function() {
      return (
        <div className="commentBox">
          <h1>Comments</h1>
          <App.Components.CommentList data={this.state.data} />
        </div>
      );
    }
  });

  $.extend(App.Components, {
    CommentBox: CommentBox
  });  
})();