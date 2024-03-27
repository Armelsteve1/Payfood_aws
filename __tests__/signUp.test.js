import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUp from '../src/screens/signUp';

describe('SignUp', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignUp />);
    
    expect(getByPlaceholderText('pseudo')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Mot de passe')).toBeTruthy();
  });

  it('calls signUpUser when "S\'inscrire" is pressed', () => {
    const { getByText, getByPlaceholderText } = render(<SignUp />);
    
    const mockSignUpUser = jest.fn();
    SignUp.signUpUser = mockSignUpUser;

    fireEvent.changeText(getByPlaceholderText('pseudo'), 'marci');
    fireEvent.changeText(getByPlaceholderText('Email'), 'marci@test.fr');
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'testpwd');
    fireEvent.press(getByText("S'inscrire"));

    expect(mockSignUpUser).toHaveBeenCalledWith({
      name: 'marci',
      email: 'marci@test.fr',
      password: 'testpwd',
    });
  });

});
