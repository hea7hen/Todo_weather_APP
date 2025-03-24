import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Update the Task interface to include outdoor activity and weather data
export interface Task {
  id: string
  text: string
  priority: string
  completed: boolean
  createdAt: string
  isOutdoor?: boolean
  location?: string
  weatherData?: {
    temp: number
    condition: string
  } | null
}

const initialState: Task[] = []

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload)
    },
    removeTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload)
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.find((task) => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      return action.payload
    },
  },
})

export const { addTask, removeTask, toggleTask, loadTasks } = tasksSlice.actions
export default tasksSlice.reducer

