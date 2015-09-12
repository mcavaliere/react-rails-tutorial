

var Todos = (function() {
  var _list = [
    {id: 1, text: "Buy Milk"},
    {id: 2, text: "Do Laundry"}
  ];

  function fetch() {
    return $.getJSON( Routes.todos_path() );
  }

  function all() {
    return _list;
  }


  function create(todo) {
    return $.ajax({
      url: Routes.todos_path(),
      type: "POST",
      dataType: "json",
      data: { "todo": todo }
    });
  }

  function update() {

  }

  function destroy(id) {
    return $.ajax({
      type: "POST",
      url: Routes.todo_path(id),
      dataType: "json",
      data: {"_method":"delete"}
    });
  }

  return {
    all: all,
    fetch: fetch,
    create: create,
    update: update,
    destroy: destroy
  };
})();


var TodosTable = React.createClass({
  refresh: function() {
    return Todos.fetch().then(function(todos) {
      this.setState({
        todos: todos
      });
    }.bind(this));
  },
  getInitialState: function() {
    return {
      todos: []
    };
  },
  componentDidMount: function() {
    $(App).on("todo:add-requested", function(e, todo) {
      Todos.create(todo)
        .done(function(todo) {
          $(App).trigger("todo:add-success", todo);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          debugger;
          $(App).trigger("todo:add-error", errorThrown);
        });
    });

    $(App).on("todo:delete-requested", function(e, id) {
      console.warn('CAUGHT: todo:delete-requested');

      Todos.destroy(id)
        .done(function() {
          $(App).trigger("todo:delete-success", id);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          debugger;
          $(App).trigger("todo:delete-error", errorThrown);
        });
    }.bind(this));

    $(App).on("todo:toggle-requested", function() {
      console.warn('CAUGHT: todo:toggle-requested');
    }.bind(this));

    $(App).on("todo:add-success", function() {
      console.warn('CAUGHT: todo:add-success');
      this.refresh();
    }.bind(this));

    $(App).on("todo:delete-success", function() {
      console.warn('CAUGHT: todo:delete-success');
      this.refresh();
    }.bind(this));

    this.refresh();
  },
  componentWillUnmount: function() {

  },
  render: function() {
    var rowNodes = this.state.todos.map(function(t, i) {
      return (
        <TodoRow text={t.text} key={t.id} id={t.id} />
      );
    })    

    return (
      <table className="table table-striped table-bordered">
      <tbody>
        {rowNodes}
        <TodoEmptyRow />
      </tbody>
      </table>
    );
  }
});



var TodoRow = React.createClass({
  checkChanged: function() {
    $(App).trigger('todo:toggle-requested');
  },
  deleteClicked: function() {
    $(App).trigger('todo:delete-requested', this.props.id);
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
  reset: function() {
    this.refs.text.getDOMNode().value = "";
  },
  componentDidMount: function() {
    $(App).on("todo:add-success", function() {
      console.warn("CAUGHT: todo:add-success");
      this.reset();
    }.bind(this));
    
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
      text: this.refs.text.getDOMNode().value
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
                <input type="text" ref="text" className="form-control" id="new-todo" placeholder="add a todo..." />
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