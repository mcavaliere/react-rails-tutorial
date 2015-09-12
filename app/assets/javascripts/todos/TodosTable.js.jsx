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
  checkChanged: function() {
    console.warn('todo:check-row-changed');
  },
  deleteClicked: function() {
    console.warn('todo:delete-row-clicked');
  },
  render: function() {
    return (
      <tr>
        <td><input type="checkbox" value="" onChange={this.checkChanged} /></td>
        <td>{ this.props.text }</td>
        <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.deleteClicked}></span></td>
      </tr>
    );
  }
});

var TodoEmptyRow = React.createClass({
  componentDidMount: function() {
    console.warn('componentDidMount');
  },
  componentWillUnmount: function() {
    console.warn('componentWillUnmount');
  },
  handleSubmit: function(e) {
    e.preventDefault();

    console.warn('todo:add-form-submitted');

    // $(App).trigger("todo:add-form-submitted", {

    // });
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
                <input type="text" className="form-control" id="new-todo" placeholder="add a todo..." />
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
  TodosTable: TodosTable,
  TodoRow: TodoRow
});