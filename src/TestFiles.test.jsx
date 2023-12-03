import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import Register_LoginSection from './components/Register_LoginSection';
import { BrowserRouter } from 'react-router-dom';

// TestFiles.test.jsx
jest.mock('./components/FirebaseConfig', () => ({
  __esModule: true,
  default: {
    auth: jest.fn(() => ({
      createUserWithEmailAndPassword: jest.fn(),
      signInWithEmailAndPassword: jest.fn(),
      // Add other mocked functions as needed
    })),
  },
  initializeApp: jest.fn(), // Mock initializeApp
}));

// Your test case
test('renders SignUp form by default', () => {
  // Render the component within a BrowserRouter
  render(
    <BrowserRouter>
      <Register_LoginSection />
    </BrowserRouter>
  );

  // Assert that the SignUp form is rendered initially
  const signUpForm = screen.getByTestId('signUpForm'); // Adjust this based on your component structure
  expect(signUpForm).toBeInTheDocument();

  // Optionally, you can perform more specific assertions based on your component's behavior
  // For example, you might check if certain input fields or buttons are present, etc.
});


describe('Register_LoginSection component', () => {
  it('renders SignUp form by default', () => {
    const { getByText } = render(<Register_LoginSection />);
    expect(getByText('SignUp')).toBeInTheDocument();
  });

  it('switches to SignIn form when clicked', async () => {
    const { getByText } = render(<Register_LoginSection />);

    act(() => {
      fireEvent.click(getByText('SignIn'));
    });

    await waitFor(() => {
      expect(getByText('SignIn')).toBeInTheDocument();
    });
  });

  it('handles SignUp form submission', async () => {
    const { getByText, getByPlaceholderText } = render(<Register_LoginSection />);
    const createUserMock = jest.fn();

    // Mocking the createUserWithEmailAndPassword function
    jest.spyOn(firebase.auth, 'createUserWithEmailAndPassword').mockImplementation(createUserMock);

    act(() => {
      fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
      fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
      fireEvent.click(getByText('SignUp'));
    });

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // You can make assertions about the expected behavior here
      expect(createUserMock).toHaveBeenCalledWith(
        'test@example.com',
        'testpassword'
      );
    });
  });
})
