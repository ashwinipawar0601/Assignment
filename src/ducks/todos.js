export const NEW_TODO = 'todo/NEW_TODO';
export const DELETE_TODO = 'todo/DELETE_TODO';
export const SELECTED_ITEM = 'todo/SELECTED_ITEM';
const initialState = {
  todos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_TODO:
      // ...state -> copies previous state
      // ...state.todos -> copies previous todos
      return { ...state, todos: [...state.todos, action.todo] };
    case DELETE_TODO:
      return state.filter((todos, id) => id !== action.id);
    case SELECTED_ITEM:
      return state.map(todos =>
        todos.id === action.id
          ? { ...todos, completed: !todos.completed }
          : todos
      );
    default:
      return state;
  }
};

export const newTodo = todo => {
  const action = { type: NEW_TODO, todo };
  return action;
};

export const deleteTodo = id => {
  const action = { type: DELETE_TODO, id: id };
  return action;
};

export const selectedItem = id => {
  const action = { type: SELECTED_ITEM, id: id };
  return action;
};
