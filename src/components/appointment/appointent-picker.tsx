"use client"

import { useState, useEffect } from "react"
import { format, addMonths, subMonths, eachDayOfInterval, startOfMonth, endOfMonth, isSameMonth } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Portal } from "./Portal"
import toast from "react-hot-toast"

interface AppointmentPickerProps {
  isOpen: boolean
  onClose: () => void
}

export function AppointmentPicker({ isOpen, onClose }: AppointmentPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [customTime, setCustomTime] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
  const times = ["11:00 AM", "12:30 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:30 PM"]

  useEffect(() => {
    if (isOpen) {
      setCurrentMonth(new Date())
      setSelectedDate(null)
      setSelectedTime("")
      setCustomTime("")
      setName("")
      setEmail("")
      setPhone("")
    }
  }, [isOpen])

  const getDaysInMonth = (month: Date) => {
    const start = startOfMonth(month)
    const end = endOfMonth(month)
    return eachDayOfInterval({ start, end })
  }

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  async function handleSubmit() {
    if (!selectedDate || (!selectedTime && !customTime) || !name || !email || !phone) return

    setIsSubmitting(true)
    const appointmentTime = customTime || selectedTime
    const dateString = `${format(selectedDate, "yyyy-MM-dd")}T${format(
      new Date(`2024-01-01 ${appointmentTime}`),
      "HH:mm",
    )}`

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date(dateString).toISOString(),
          name,
          email,
          phone,
          customTime
        }),
      })

      if (res.ok) {
        const data = await res.json()
        console.log(data.message)
        toast.success("Appointment booked successfully!")
        onClose()
      } else {
        throw new Error("Failed to book appointment")
      }
    } catch (error) {
      console.error("Failed to book appointment:", error)
      toast.error("Failed to book appointment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ zIndex: 9999 }}
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <button onClick={handlePrevMonth} className="text-blue-500 font-bold">
                  &lt;
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <button onClick={handleNextMonth} className="text-blue-500 font-bold">
                  &gt;
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-8">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-medium text-gray-600">
                    {day}
                  </div>
                ))}
                {getDaysInMonth(currentMonth).map((date) => (
                  <motion.button
                    key={date.toISOString()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg flex flex-col items-center ${
                      isSameMonth(date, currentMonth)
                        ? selectedDate && date.toDateString() === selectedDate.toDateString()
                          ? "bg-blue-500 text-white"
                          : "border border-gray-200 text-gray-700"
                        : "text-gray-400"
                    }`}
                    onClick={() => setSelectedDate(date)}
                    disabled={!isSameMonth(date, currentMonth)}
                  >
                    <span className="text-sm">{format(date, "EEE")}</span>
                    <span className="text-lg font-bold">{format(date, "d")}</span>
                  </motion.button>
                ))}
              </div>

              {selectedDate && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {times.map((time) => (
                      <motion.button
                        key={time}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`py-3 rounded-lg border ${
                          selectedTime === time ? "border-blue-500 text-blue-500" : "border-gray-200 text-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedTime(time)
                          setCustomTime("")
                        }}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="customTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Custom Time
                    </label>
                    <input
                      type="time"
                      id="customTime"
                      value={customTime}
                      onChange={(e) => {
                        setCustomTime(e.target.value)
                        setSelectedTime("")
                      }}
                      className="text-gray-600 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </>
              )}

              <div className="space-y-4 mb-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-gray-600 w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-gray-600 w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-4 rounded-lg border border-gray-200 text-gray-700 font-medium"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-4 rounded-lg bg-blue-500 text-white font-medium disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting || !selectedDate || (!selectedTime && !customTime) || !name || !email || !phone
                  }
                >
                  {isSubmitting ? "Booking..." : "Confirm"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}

