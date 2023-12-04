import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Register_LoginSection from './components/Register_LoginSection';
import { auth } from './components/FirebaseConfig';

// Mock Firebase Auth methods
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Register_LoginSection Component', () => {
  test('renders Sign Up form by default', () => {
    render(<Register_LoginSection />, { wrapper: MemoryRouter });
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('toggles between Sign Up and Sign In forms', () => {
    render(<Register_LoginSection />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('Sign In'));
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Sign Up'));
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('submits Sign Up form', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({});
  
    render(<Register_LoginSection />, { wrapper: MemoryRouter });
  
    fireEvent.input(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  
    fireEvent.submit(screen.getByText('Sign Up'));
  
    await act(() => Promise.resolve()); // Wait for promises to resolve
  
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth, // Use auth from FirebaseConfig
      'test@example.com',
      'password123'
    );
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('submits Sign In form', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({});
  
    render(<Register_LoginSection />, { wrapper: MemoryRouter });
  
    fireEvent.click(screen.getByText('Sign In')); // Switch to Sign In form
  
    fireEvent.input(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  
    fireEvent.submit(screen.getByText('Sign In'));
  
    await act(() => Promise.resolve()); // Wait for promises to resolve
  
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth, // Use auth from FirebaseConfig
      'test@example.com',
      'password123'
    );
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('handles Sign Out', async () => {
    signOut.mockResolvedValueOnce({});

    render(<Register_LoginSection />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText('Sign In')); // Switch to Sign In form
    fireEvent.input(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByText('Sign In'));

    await act(() => Promise.resolve()); // Wait for promises to resolve

    fireEvent.click(screen.getByText('Sign Out'));

    await act(() => Promise.resolve()); // Wait for promises to resolve

    expect(signOut).toHaveBeenCalledWith(expect.any(Object)); // Firebase Auth object
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});

