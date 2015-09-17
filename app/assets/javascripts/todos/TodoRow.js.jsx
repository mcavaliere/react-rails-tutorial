(function() {
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
  
  $.extend(App.Components, {
    TodoRow: TodoRow
  });    
})();