import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login'; // Adjust the import path

describe('Login Component', () => {
    it('renders the login form', () => {
        render(<Login />);

        // Check if the login form elements are rendered
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const loginButton = screen.getByText('Login');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('handles form submission', () => {
        render(<Login />);

        // Mock the login request
        global.fetch = jest.fn().mockResolvedValue({
            json: () => ({
                token: 'mocked-token',
                role: 'user',
            }),
        });

        // Fill in the form
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        // Check if the login request was made
        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
        });
    });

    it('navigates to the registration page', () => {
        render(<Login />);

        // Check if the registration link is present and clickable
        const registrationLink = screen.getByText('Register');
        fireEvent.click(registrationLink);

        // Check if the navigation to the registration page is triggered
        // You may need to add more specific assertions based on your routing setup
    });

    // Add more test cases as needed
});
