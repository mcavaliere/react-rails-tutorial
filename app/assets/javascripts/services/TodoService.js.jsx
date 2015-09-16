(function() {
  var Todos = (function() {
    function fetch() {
      return $.getJSON( Routes.todos_path() );
    }

    function create(todo) {
      return $.ajax({
        url: Routes.todos_path(),
        type: "POST",
        dataType: "json",
        data: { "todo": todo }
      });
    }

    function update(id, params) {
      return $.ajax({
        url: Routes.todo_path(id),
        type: "PUT",
        data: { "todo": params },
        dataType: "json"
      });
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
      fetch: fetch,
      create: create,
      update: update,
      destroy: destroy
    };
  })();

  $.extend(App.Services, {
    Todos: Todos
  });
})();