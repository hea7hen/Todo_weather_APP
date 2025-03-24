"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { removeTask, toggleTask, loadTasks } from "@/lib/features/tasks/tasksSlice"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Trash2, CloudRain, Sun, Cloud } from "lucide-react"

export default function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks)
  const dispatch = useDispatch()

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      dispatch(loadTasks(JSON.parse(storedTasks)))
    }
  }, [dispatch])

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const getWeatherIcon = (condition: string | undefined) => {
    if (!condition) return <Cloud className="h-4 w-4 text-gray-500" />

    condition = condition.toLowerCase()

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return <CloudRain className="h-4 w-4 text-blue-500" />
    } else if (condition.includes("clear") || condition.includes("sun")) {
      return <Sun className="h-4 w-4 text-yellow-500" />
    } else {
      return <Cloud className="h-4 w-4 text-gray-500" />
    }
  }

  if (tasks.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No tasks yet. Add some!</p>
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between p-3 border rounded-md ${
            task.completed ? "bg-gray-50" : "bg-white"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => dispatch(toggleTask(task.id))}
              id={`task-${task.id}`}
            />
            <div>
              <label
                htmlFor={`task-${task.id}`}
                className={`font-medium text-black ${task.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {task.text}
              </label>
              <div className="flex items-center mt-1 space-x-2">
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                {task.isOutdoor && task.weatherData && (
                  <Badge variant="outline" className="flex items-center space-x-1 bg-blue-50">
                    <span>{getWeatherIcon(task.weatherData.condition)}</span>
                    <span className="text-black">{task.weatherData.temp}°C</span>
                    <span className="text-xs text-black">{task.location}</span>
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">{new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => dispatch(removeTask(task.id))} aria-label="Delete task">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </li>
      ))}
    </ul>
  )
}

