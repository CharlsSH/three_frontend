'use client'

// React Imports
import { useReducer, useState } from 'react'

// MUI Imports
import { useMediaQuery } from '@mui/material'

// Reducer Imports
import calendarReducer from '@reducers/calendarReducer'

// View Imports
import Calendar from '@views/apps/calendar/Calendar'
import SidebarLeft from '@views/apps/calendar/SidebarLeft'
import AddEventSidebar from '@views/apps/calendar/AddEventSidebar'

// CalendarColors Object
const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const AppCalendar = ({ events }) => {
  // States
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)

  // Vars
  const initialState = {
    events: events,
    selectedEvent: null,
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
  }

  // Hooks
  const [calendars, dispatch] = useReducer(calendarReducer, initialState)
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  // Add event handler
  const handleAddEvent = async event => {
    // Add event API
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apps/calendar-events`, {
      method: 'POST',
      body: JSON.stringify(event)
    })
      .then(res => res.json())
      .then(data => {
        // Dispatch Add Event Action
        dispatch({ type: 'added', event: data.event })
      })
  }

  // Update event handler
  const handleUpdateEvent = async event => {
    // Update event API
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apps/calendar-events`, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        // Dispatch Update Event Action
        dispatch({ type: 'updated', event })
      })
  }

  // Delete event handler
  const handleDeleteEvent = async eventId => {
    // Delete event API
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apps/calendar-events`, {
      method: 'DELETE',
      body: JSON.stringify({ id: eventId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        // Dispatch Delete Event Action
        dispatch({ type: 'deleted', eventId })
      })
  }

  // Dispatch Select Event Action
  const handleSelectEvent = event => {
    dispatch({ type: 'selected_event', event: event })
  }

  // Dispatch Select Calendar Action
  const handleCalendarsUpdate = calendar => {
    dispatch({ type: 'selected_calendars', calendar })
  }

  const handleAllCalendars = view_all => {
    dispatch({ type: 'selected_all_calendars', view_all })
  }

  return (
    <>
      <SidebarLeft
        mdAbove={mdAbove}
        leftSidebarOpen={leftSidebarOpen}
        calendars={calendars}
        calendarApi={calendarApi}
        calendarsColor={calendarsColor}
        handleSelectEvent={handleSelectEvent}
        handleAllCalendars={handleAllCalendars}
        handleCalendarsUpdate={handleCalendarsUpdate}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      />
      <div className='p-6 pbe-0 flex-grow overflow-visible bg-backgroundPaper rounded-e-[6px] rounded-s-[6px] md:rounded-s-[0px]'>
        <Calendar
          mdAbove={mdAbove}
          calendars={calendars}
          calendarApi={calendarApi}
          setCalendarApi={setCalendarApi}
          calendarsColor={calendarsColor}
          handleUpdateEvent={handleUpdateEvent}
          handleSelectEvent={handleSelectEvent}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </div>
      <AddEventSidebar
        calendars={calendars}
        calendarApi={calendarApi}
        handleAddEvent={handleAddEvent}
        handleUpdateEvent={handleUpdateEvent}
        handleDeleteEvent={handleDeleteEvent}
        addEventSidebarOpen={addEventSidebarOpen}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        handleSelectEvent={handleSelectEvent}
      />
    </>
  )
}

export default AppCalendar
