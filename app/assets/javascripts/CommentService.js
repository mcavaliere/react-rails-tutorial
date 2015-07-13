(function(){ 
  App.CommentService = (function(){     
    function all() {
      return $.getJSON("/comments");
    }

    function get(id) {
      return $.getJSON("/comments/"+id);
    }

    function create(params) {
      return $.post(
        "/comments", 
        { dataType: "json", comment: params }
      );
    }

    function update(id, params) {
      return $.post(
        "/comments/" + id, { 
          dataType: "json", 
          _method: "patch",
          comment: params 
        }
      );
    }

    function destroy(id) {
      return $.post(
        "/comments/" + id, {
        dataType: "json",
        _method: "delete"
      });
    }

    return {
      all: all,
      get: get,
      create: create,
      update: update,
      destroy: destroy
    };

  })();  
})();


