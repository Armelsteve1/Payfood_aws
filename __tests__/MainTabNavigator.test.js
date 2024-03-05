import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from '../src/navigation/MainTabNavigator';

describe('MainTabNavigator', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    );

    expect(getByText('Accueil')).toBeTruthy();
    expect(getByText('Panier')).toBeTruthy();
    expect(getByText('Scan')).toBeTruthy();
    expect(getByText('Portefeuille')).toBeTruthy();
    expect(getByText('Compte')).toBeTruthy();
  });

});
