import React, { Component } from 'react';
import { connect } from 'react-redux';

class editTodo extends Component {
  handleEdit = e => {
    console.log('handle edit called');
    e.preventDefault();
    const newText = this.getText.value;
    this.props.dispatch({
      type: 'UPDATE',
      id: this.props.item.id,
      newText: newText,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleEdit}>
          <input
            required
            type="text"
            ref={input => (this.getText = input)}
            defaultValue={this.props.item.text}
            placeholder="Enter updated Todo"
          />

          <button>Update</button>
        </form>
      </div>
    );
  }
}
export default connect()(editTodo);
