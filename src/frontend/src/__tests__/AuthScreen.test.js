import { render, screen, fireEvent } from '@testing-library/react';
import AuthScreen from '../screens/AuthScreen';

test('renders login form and submits correctly', async () => {
    render(<AuthScreen />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(loginButton);

    expect(await screen.findByText(/Login successful/i)).toBeInTheDocument();
});
