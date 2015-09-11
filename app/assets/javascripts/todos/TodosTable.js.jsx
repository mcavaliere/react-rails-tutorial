var todos = [
  {id: 1, text: "Buy Milk"},
  {id: 2, text: "Do Laundry"}
];


var TodosTable = React.createClass({
  render: function() {
    var rowNodes = todos.map(function(t, i) {
      return (
        <TodoRow text={t.text} key={i} />
      );
    })    

    return (
      <table className="table table-striped table-bordered">
      {rowNodes}
      <TodoEmptyRow />
      </table>
    );
  }
});



var TodoRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td><input type="checkbox" value="" /></td>
        <td>{ this.props.text }</td>
      </tr>
    );
  }
});

var TodoEmptyRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td></td>
        <td>
          <div className="form-inline">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">Add Todo:</div>
                <input type="text" className="form-control" id="new-todo" placeholder="add a todo..." />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </td>
      </tr>
    );
  }
});

$.extend(App.Components, {
  TodosTable: TodosTable,
  TodoRow: TodoRow
});