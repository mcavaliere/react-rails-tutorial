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
          <App.Components.TodoRow txt={t.txt} key={t.id} id={t.id} ref={ref} checked={t.done} />
        );
      });

      return (
        <table className="table table-striped table-bordered">
        <tbody>
          {rowNodes}
          <App.Components.TodoEmptyRow />
        </tbody>
        </table>
      );
    }
  });

  $.extend(App.Components, {
    TodosTable: TodosTable
  });
})();