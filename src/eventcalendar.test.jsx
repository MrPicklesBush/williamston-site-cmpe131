import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventCalendar from './components/EventCalendar';

test('renders EventCalendar component', () => {
    render(<EventCalendar />);

    // Assert that the main heading is present
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Calendar');

    // Add more assertions based on your component's structure
    // For example, you might want to check the presence of input fields, date pickers, etc.
});

test('adds a new event to the calendar', async () => {
    render(<EventCalendar />);

    // Simulate adding a new event
    fireEvent.change(screen.getByPlaceholderText('Add Title'), { target: { value: 'New Event' } });
    fireEvent.change(screen.getByPlaceholderText('Start Date'), { target: { value: '2023-12-15' } });
    fireEvent.change(screen.getByPlaceholderText('End Date'), { target: { value: '2023-12-20' } });
    fireEvent.click(screen.getByText('Add Event'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
        // Assert that the new event is added to the calendar
        const newEventElements = screen.getAllByText('New Event');
        expect(newEventElements.length).toBeGreaterThan(0);
        //expect(screen.getByText('New Event')).toBeInTheDocument();
    });
    // You might want to add more assertions based on your component's behavior
});

test('does not add an event with the same title', async () => {
    // Mock window.alert
    const originalAlert = window.alert;
    window.alert = jest.fn();

    render(<EventCalendar />);

    // Simulate adding an event with the same title as an existing event
    fireEvent.change(screen.getByPlaceholderText('Add Title'), { target: { value: 'Community Donation Event' } });
    fireEvent.change(screen.getByPlaceholderText('Start Date'), { target: { value: '2023-12-15' } });
    fireEvent.change(screen.getByPlaceholderText('End Date'), { target: { value: '2023-12-20' } });
    fireEvent.click(screen.getByText('Add Event'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
        // Assert that an alert is displayed
        expect(window.alert).toHaveBeenCalledWith('Event with title "Community Donation Event" already exists.');

        // Assert that the new event is not added to the calendar
        const existingEventElements = screen.getAllByText('Community Donation Event');
        expect(existingEventElements.length).toBeGreaterThan(0);
    });

    // Restore window.alert to its original state
    window.alert = originalAlert;
});

test('adds a new event with a description', async () => {
    render(<EventCalendar />);

    // Simulate adding a new event with a description
    fireEvent.change(screen.getByPlaceholderText('Add Title'), { target: { value: 'New Event' } });
    fireEvent.change(screen.getByPlaceholderText('Add Description'), { target: { value: 'This is a new event description.' } });
    fireEvent.change(screen.getByPlaceholderText('Start Date'), { target: { value: '2023-12-15' } });
    fireEvent.change(screen.getByPlaceholderText('End Date'), { target: { value: '2023-12-20' } });
    fireEvent.click(screen.getByText('Add Event'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
        // Assert that the new event is added to the calendar
        const newEventElements = screen.getAllByText('New Event');
        expect(newEventElements.length).toBeGreaterThan(0);
    });
    // You might want to add more assertions based on your component's behavior
});