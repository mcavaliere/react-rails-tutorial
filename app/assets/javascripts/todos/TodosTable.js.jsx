

var Todos = (function() {
  var _list = [
    {id: 1, text: "Buy Milk"},
    {id: 2, text: "Do Laundry"}
  ];

  function all() {
    return _list;
  }


  function create() {

  }

  function update() {

  }

  function destroy() {

  }

  return {
    all: all,
    create: create,
    update: update,
    destroy: destroy
  };
})();


var TodosTable = React.createClass({
  componentDidMount: function() {
    $(App).on("todo:add-requested", function() {
      console.warn('CAUGHT: todo:add-requested');
    });

    $(App).on("todo:delete-requested", function() {
      console.warn('CAUGHT: todo:delete-requested');
    });

    $(App).on("todo:toggle-requested", function() {
      console.warn('CAUGHT: todo:toggle-requested');
    });
  },
  componentWillUnmount: function() {

  },
  render: function() {
    var rowNodes = Todos.all().map(function(t, i) {
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
    $(App).trigger('todo:toggle-requested');
  },
  deleteClicked: function() {
    $(App).trigger('todo:delete-requested');
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
    $(App).on("todo:add-success", function() {
      console.warn("CAUGHT: todo:add-success");
    });
    
    $(App).on("todo:add-error", function() {
      console.warn("CAUGHT: todo:add-error");
    });
  },
  componentWillUnmount: function() {    
    // $(App).off("todo:add-success");
    
    // $(App).off("todo:add-error");
  },
  handleSubmit: function(e) {
    e.preventDefault();

    $(App).trigger("todo:add-requested", {

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