import React from 'react';
class TodoList extends React.Component {
  render() {
    console.log('todolist', this.props.todos);

    if (this.props.todos) {
      return (
        <ul>
          {this.props.todos.todos.map(item => (
            <li key={item.id}>
              <Typography variant="subtitle2">
                {item.text} {item.DateOfCreation}
              </Typography>
              <Checkbox
                //checked={this.props.checkedA}
                onChange={e => this.selectedItem(e, item.id)}
                // value="checkedA"
                inputProps={{
                  'aria-label': 'primary checkbox',
                }}
              />
              <Button onClick={e => this.updateTodo(e, item.id)}>Update</Button>
              
              {item.editing ? <EditTodo item={item} key={item.id} />: }
              
              <Button onClick={e => this.deleteTodo(e, item.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      );
    } else return null;
  }

  updateTodo(e, id) {
    Axios.put('http://localhost:3004/todos/' + id).then(res => {
      console.log(res.data);
    });
  }

  selectedItem(e, id) {
    let isChecked = e.target.checked;
    console.log(isChecked);
    //this.props.selectedItem(id);
  }

  deleteTodo(e, id) {
    Axios.delete('http://localhost:3004/todos/' + id).then(res => {
      console.log(res.data);
    });

    console.log(id);
    console.log('Deleted Todo successfully');
    e.preventDefault();
    // this.props.deleteTodo(id);
  }

  handleSelect(e) {
    this.setState({ checkedA: e.target.checked });
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
  };
};
export const TodoListWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
