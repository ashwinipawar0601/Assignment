import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, Checkbox } from '@material-ui/core';
import Axios from 'axios';
import { newTodo, selectedItem, deleteTodo } from '../ducks/todos';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditTodo from './editTodo';
import { isTSEnumMember } from '@babel/types';
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
        <Button component={Link} to="/new">
          Add Todo
        </Button>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">What needs to be done?</label>
          <input
            type="text"
            ref={input => (this.getText = input)}
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />

          <button color="primary" variant="contained">
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <TodoListWithConnect />
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
      DateOfCreation: this.calculateDate(),
    });
  }
  calculateDate = () => {
    const DateOfCreate = Date.now();

    // const newdate = new Date(parseInt(DateOfCreate));
    //return newdate;
    return DateOfCreate;
  };

  handleSubmit(e) {
    e.preventDefault();
    this.getText.value = '';
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(), //Date.now(),
      DateOfCreation: this.state.DateOfCreation,
      editing: false,
    };
    Axios.post('http://localhost:3004/todos', newItem).then(res =>
      console.log(res.data)
    );

    // const todoComponent = ({props.todos, deleteTodo})

    this.props.newTodo(newItem);
    // this.props.deleteTodo(e,newItem.id);
    // this.setState(state => ({
    //   items: state.items.concat(newItem),
    //   text: '',
    // }));
  }
}

const mapDispatchToProps = {
  newTodo,
  deleteTodo,
  selectedItem,
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
                onChange={e => this.selectedItem(e, item.id)}
                // value="checkedA"
                inputProps={{
                  'aria-label': 'primary checkbox',
                }}
              />

              <Button onClick={e => this.updateTodo(e, item.id)}>Update</Button>

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
    this.props.selectedItem(id);
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
