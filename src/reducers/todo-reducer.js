import { SET_DATA, ADD_TASK, CREATE_TASK } from '../actions/types';

const INITIAL_STATE = {
  todos: [],
  newTask: {},
};

export default function todoReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SET_DATA:
      return {
        ...state,
        todos: [...state.todos, ...payload],
      };
    case CREATE_TASK:
      return {
        ...state,
        newTask: { task: payload, isCompleted: false },
      };
    case ADD_TASK:
      return {
        ...state,
        todos: [...state.todos, payload],
        newTask: {},
      };
    default:
      return state;
  }
}