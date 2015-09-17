(function() {


  var TodoEmptyRow = React.createClass({
    reset: function() {
      this.refs.txt.getDOMNode().value = "";
    },
    componentDidMount: function() {
      $(App).on("todo:add-success", function() {
        this.reset();
      }.bind(this));
      
      $(App).on("todo:add-error", function() {
        console.warn("CAUGHT: todo:add-error");
      });
    },
    componentWillUnmount: function() {    
      $(App).off("todo:add-success");
      $(App).off("todo:add-error");
    },
    handleSubmit: function(e) {
      e.preventDefault();

      $(App).trigger("todo:add-requested", {
        txt: this.refs.txt.getDOMNode().value
      });
    },
    render: function() {
      return (
        <tr>
          <td></td>
          <td>
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">Add Todo:</div>
                  <input type="txt" ref="txt" className="form-control" id="new-todo" placeholder="add a todo..." />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </td>
          <td></td>
        </tr>
      );
    }
  });

  $.extend(App.Components, {
    TodoEmptyRow: TodoEmptyRow
  });  
})();