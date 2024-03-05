import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountScreen from '../src/screens/AccountScreen';

describe('AccountScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AccountScreen />);
    
    expect(getByText('Favoris')).toBeTruthy();
    expect(getByText('Autres options')).toBeTruthy();
  });

  it('calls handleSignOut when "Se déconnecter" is pressed', () => {
    const { getByText } = render(<AccountScreen />);
    const signOutButton = getByText('Se déconnecter');

    const mockHandleSignOut = jest.fn();
    AccountScreen.handleSignOut = mockHandleSignOut;

    fireEvent.press(signOutButton);

    expect(mockHandleSignOut).toHaveBeenCalled();
  });

});
