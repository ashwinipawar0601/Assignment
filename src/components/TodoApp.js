import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, Checkbox } from '@material-ui/core';
import Axios from 'axios';
import { newTodo, selectedItem, deleteTodo } from '../ducks/todos';
import { connect } from 'react-redux';
import todo from './todo';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', DateOfCreation: '', checkedA: 'false' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    Axios.get('http://localhost:3004/todos').then(res => {
      const item = res.data;
      this.setState(item);
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">What needs to be done?</label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />

          <button color="primary">Add #{this.state.items.length + 1}</button>
        </form>
        <TodoListWithConnect />
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value, DateOfCreation: Date.now() });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      DateOfCreation: this.state.DateOfCreation,
    };
    // Axios.post('http://localhost:3004/todos', newItem).then(res =>
    //  console.log(res.data)
    // );

    // const todoComponent = ({props.todos, deleteTodo})

    this.props.newTodo(newItem);
    // this.props.deleteTodo(e,newItem.id);
    // this.setState(state => ({
    //   items: state.items.concat(newItem),
    //   text: '',
    // }));
  }
  deleteTodos(e, id) {
    Axios.delete('http://localhost:3004/todos', id).then(res =>
      console.log(res.data)
    );

    console.log(id);
    e.preventDefault();
    this.props.deleteTodo(id);
  }
}

const mapDispatchToProps = {
  newTodo,
  deleteTodo,
};

export default connect(
  null,
  mapDispatchToProps
)(TodoApp);

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
                onClick={() => selectedItem(item.id)}
                // value="checkedA"
                inputProps={{
                  'aria-label': 'primary checkbox',
                }}
              />
              <Button onClick={e => this.deleteTodos(e, item.id)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      );
    } else return null;
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
