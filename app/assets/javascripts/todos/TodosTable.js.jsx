(function() {
  var TodosTable = React.createClass({
    refresh: function() {
      return App.Services.Todos.fetch().then(function(todos) {
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
        App.Services.Todos.create(todo)
          .done(function(todo) {
            $(App).trigger("todo:add-success", todo);
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            $(App).trigger("banner:reset-danger");
            $(App).trigger("banner:add-danger", errorThrown);
          });
      });

      $(App).on("todo:delete-requested", function(e, id) {
        App.Services.Todos.destroy(id)
          .done(function() {
            $(App).trigger("todo:delete-success", id);
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            $(App).trigger("banner:reset-danger");
            $(App).trigger("banner:add-danger", errorThrown);
          });
      }.bind(this));

      $(App).on("todo:toggle-requested", function(e, params) {
        App.Services.Todos.update(params.id, { done: params.done })
          .done(function(todo) {
            $(App).trigger("todo:toggle-success", todo);
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            $(App).trigger("banner:reset-danger");
            $(App).trigger("banner:add-danger", errorThrown);
          });
      }.bind(this));

      $(App).on("todo:add-success", function() {
        this.refresh();
      }.bind(this));

      $(App).on("todo:delete-success", function() {
        this.refresh();
      }.bind(this));

      $(App).on("todo:toggle-success", function(e, todo) {
        this.refs["todo-"+todo.id].setState({ done: todo.done });
      }.bind(this));

      this.refresh();
    },
    componentWillUnmount: function() {
      $(App).off("todo:add-requested");
      $(App).off("todo:delete-requested");
      $(App).off("todo:toggle-requested");
      $(App).off("todo:add-success");
      $(App).off("todo:delete-success");
      $(App).off("todo:toggle-success");
    },
    render: function() {
      var rowNodes = this.state.todos.map(function(t, i) {
        var ref = "todo-" + t.id;

        return (
          <TodoRow txt={t.txt} key={t.id} id={t.id} ref={ref} checked={t.done} />
        );
      });

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
    getClassName: function() {
      return (this.state.done ? "done" : "")
    },
    getInitialState: function() {
      return ({
        done: this.props.checked
      });
    },
    checkChanged: function() {
      $(App).trigger('todo:toggle-requested', {
        id: this.props.id,
        done: !this.state.done
      });
    },
    deleteClicked: function() {
      $(App).trigger('todo:delete-requested', this.props.id);
    },
    render: function() {
      return (
        <tr className={this.getClassName()}>
          <td><input type="checkbox" value="1" checked={this.state.done} onChange={this.checkChanged} /></td>
          <td className="txt">{ this.props.txt }</td>
          <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.deleteClicked}></span></td>
        </tr>
      );
    }
  });

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
    TodosTable: TodosTable,
    TodoRow: TodoRow
  });
})();