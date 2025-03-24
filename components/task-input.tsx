"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask } from "@/lib/features/tasks/tasksSlice"
import { fetchWeather } from "@/lib/features/weather/weatherThunks"
import type { AppDispatch, RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function TaskInput() {
  const [taskText, setTaskText] = useState("")
  const [priority, setPriority] = useState("medium")
  const [isOutdoor, setIsOutdoor] = useState(false)
  const [location, setLocation] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const { weather } = useSelector((state: RootState) => state.weather)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (taskText.trim()) {
      // If it's an outdoor activity and location is provided, fetch weather
      if (isOutdoor && location.trim()) {
        dispatch(fetchWeather(location))
      }

      dispatch(
        addTask({
          id: Date.now().toString(),
          text: taskText,
          priority,
          completed: false,
          createdAt: new Date().toISOString(),
          isOutdoor,
          location: isOutdoor ? location : "",
          weatherData:
            isOutdoor && weather
              ? {
                  temp: weather.current?.temp_c,
                  condition: weather.current?.condition?.text,
                }
              : null,
        }),
      )

      setTaskText("")
      if (!isOutdoor) {
        setLocation("")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task">Task</Label>
        <Input
          id="task"
          placeholder="What needs to be done?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger id="priority">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="outdoor" checked={isOutdoor} onCheckedChange={(checked) => setIsOutdoor(checked === true)} />
        <Label htmlFor="outdoor">This is an outdoor activity</Label>
      </div>

      {isOutdoor && (
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter location for weather info"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      )}

      <Button type="submit" disabled={!taskText.trim() || (isOutdoor && !location.trim())}>
        Add Task
      </Button>
    </form>
  )
}

