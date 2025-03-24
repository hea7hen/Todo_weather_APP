"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/lib/features/auth/authSlice"
import { fetchWeather } from "@/lib/features/weather/weatherThunks"
import type { RootState, AppDispatch } from "@/lib/store"
import TaskInput from "@/components/task-input"
import TaskList from "@/components/task-list"
import WeatherDisplay from "@/components/weather-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"

export default function TodoApp() {
  const dispatch = useDispatch<AppDispatch>()
  const { weather, loading, error } = useSelector((state: RootState) => state.weather)

  useEffect(() => {
    dispatch(fetchWeather("London")) // Default city
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("isAuthenticated")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Todo App</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskInput />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-black">Your Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <WeatherDisplay weather={weather} loading={loading} error={error} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

