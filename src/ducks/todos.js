export const NEW_TODO = "todo/NEW_TODO";

const initialState = {
  todos: [],
  xyaz: {
    abc: "asd"
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_TODO:
      // ...state -> copies previous state
      // ...state.todos -> copies previous todos
      return { ...state, todos: [...state.todos, action.todo] };

    default:
      return state;
  }
};

export const newTodo = todo => {
  const action = { type: NEW_TODO, todo };
  return action;
};
