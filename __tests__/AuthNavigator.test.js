import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from '../src/navigation/AuthNavigator';

describe('AuthNavigator', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );

    expect(getByText('JoinScreen')).toBeTruthy();
    expect(getByText('SignIn')).toBeTruthy();
    expect(getByText('ConfirmationScreen')).toBeTruthy();
    expect(getByText('SignUp')).toBeTruthy();
  });

});
