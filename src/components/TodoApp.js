import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

import { newTodo } from "../ducks/todos";
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: "", DateOfCreation: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      DateOfCreation: this.state.DateOfCreation
    };

    this.props.newTodo(newItem);

    // this.setState(state => ({
    //   items: state.items.concat(newItem),
    //   text: '',
    // }));
  }
}

export default connect(
  null,
  { newTodo }
)(TodoApp);

class TodoList extends React.Component {
  render() {
    console.log("todolist", this.props.todos);

    if (this.props.todos) {
      return (
        <ul>
          {this.props.todos.todos.map(item => (
            <li key={item.id}>
              <Typography variant="subtitle2">
                {item.text} {item.DateOfCreation}
              </Typography>
            </li>
          ))}
        </ul>
      );
    } else return null;
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

export const TodoListWithConnect = connect(mapStateToProps)(TodoList);
