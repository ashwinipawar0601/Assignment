export const NEW_TODO = 'todo/NEW_TODO';
export const DELETE_TODO = 'todo/DELETE_TODO';
export const SELECTED_ITEM = 'todo/SELECTED_ITEM';
export const EDIT_TODO = 'todo/EDIT_TODO';
export const UPDATE = 'todo/UPDATE';
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

    case EDIT_TODO:
      return state.map(todos =>
        todos.id === action.id
          ? { ...state.todos, editing: !todos.editing }
          : todos
      );
    case UPDATE:
      return state.map(todos => {
        if (todos.id === action.id) {
          return {
            ...todos,
            text: action.newText,

            editing: !todos.editing,
          };
        } else return todos;
      });

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
export const updateTodo = todo => {
  const action = { type: EDIT_TODO, todo };
  return action;
};

export const deleteTodo = id => {
  const action = { type: DELETE_TODO, id: id };
  return action;
};

export const selectedItem = id => {
  console.log('in action ', id);
  const action = { type: SELECTED_ITEM, id: id };
  return action;
};
