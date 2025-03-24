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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Todo App</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskInput />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList />
              </CardContent>
            </Card>
          </div>

          {/* Weather Section */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <WeatherDisplay weather={weather} loading={loading} error={error} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

