import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Task {
  title: string;
  completed: boolean;
}
interface ListToDo {
  listToDo: Array<Task>;
}

const getInitialState = (): ListToDo => {
  return {
    listToDo: [],
  };
};

const toDoSlice = createSlice({
  name: "todo",
  initialState: getInitialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.listToDo.push({
        title: action.payload,
        completed: false,
      });
    },
    remove: (state, action: PayloadAction<number>) => {
      state.listToDo.splice(action.payload, 1);
    },
    update: (
      state,
      action: PayloadAction<{ index: number; editValue: string }>
    ) => {
      state.listToDo[action.payload.index].title = action.payload.editValue;
    },
    up: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0) return;
      const temp = state.listToDo[index - 1];
      state.listToDo[index - 1] = state.listToDo[index];
      state.listToDo[index] = temp;
    },
    down: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= state.listToDo.length) return;
      const temp = state.listToDo[index + 1];
      state.listToDo[index + 1] = state.listToDo[index];
      state.listToDo[index] = temp;
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const task = state.listToDo[action.payload];
      task.completed = !task.completed;
    },
    setList: (state, action: PayloadAction<ListToDo>) => {
      state.listToDo = action.payload.listToDo;
    },
  },
});

export const { add, remove, update, up, down, toggleComplete, setList } =
  toDoSlice.actions;
export default toDoSlice.reducer;
