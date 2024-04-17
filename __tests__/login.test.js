import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/screens/login';

describe('Login', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Mot de passe')).toBeTruthy();
    expect(getByText('Se connecter')).toBeTruthy();
    expect(getByText("Vous n'avez pas encore de compte ? S'inscrire")).toBeTruthy();
  });

  test('handles login with correct credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Mot de passe');
    const loginButton = getByText('Se connecter');

    fireEvent.changeText(emailInput, 'marci@test.fr');
    fireEvent.changeText(passwordInput, 'testpwd');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Success!!');
    });
  });

  test('handles login with incorrect credentials', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<LoginScreen />);
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Mot de passe');
    const loginButton = getByText('Se connecter');

    fireEvent.changeText(emailInput, 'wrong@test.fr');
    fireEvent.changeText(passwordInput, 'wrongpwd');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(console.log).not.toHaveBeenCalledWith('Success!!');
      expect(findByText('Erreur de connexion')).toBeTruthy();
    });
  });
});
