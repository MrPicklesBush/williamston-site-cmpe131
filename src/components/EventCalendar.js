import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventCalendar = () => {

    const handleEventClick = (event) => {
        alert(`Event: ${event.title}\nDescription: ${event.description}`);
    };
    const locales = {
        "en-US": require("date-fns/locale/en-US")
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })

    const events = [
        {
            title: "Community Donation Event",
            description: "Community members donate any unused goods they do not want",
            start: new Date(2023, 11, 5),
            end: new Date(2023, 11, 11)
        },
        {
            title: "Food Festival",
            description: "Enjoy food, beverages with live entertainment!",
            start: new Date(2023, 11, 12),
            end: new Date(2023, 11, 16)
        },
        {
            title: "Bingo",
            description: "Come to the town hall to play Bingo and win prizes!",
            start: new Date(2023, 11, 9),
            end: new Date(2023, 11, 9)
        },
    ]

    events.forEach(event => {
        const formattedStartDate = event.start.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        });

        console.log(`Event: ${event.title}, Start Date: ${formattedStartDate}`);
    });

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", description: "" })
    const [allEvents, setAllEvents] = useState(events)

    function handleAddEvent() {
        // Check if the new event title already exists in the allEvents array
        const eventExists = allEvents.some((event) => event.title === newEvent.title);

        // If the event title doesn't exist, add the new event to the allEvents array
        if (!eventExists) {
            setAllEvents([...allEvents, newEvent]);
        } else {
            // Alert the user that the event with the same title already exists
            alert(`Event with title "${newEvent.title}" already exists.`);
        }

        // Reset the newEvent state
        setNewEvent({ title: "", start: "", end: "", description: "" });
    }


    return (
        <div className="Home">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }}
                    value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <input
                    type="text"
                    id="description-input"
                    placeholder="Add Description" // Add a description input field
                    style={{ width: "20%", marginRight: "10px" }}
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }}
                    selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })}
                />
                <DatePicker placeholderText="End Date"
                    selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })}
                />
                <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>Add Event</button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start"
                endAccessor="end" style={{ height: 500, margin: "50px" }} onSelectEvent={handleEventClick} />
        </div>
    );
}

export default EventCalendar;