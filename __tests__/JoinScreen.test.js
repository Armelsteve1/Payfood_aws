import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import JoinScreen from '../src/screens/JoinScreen';

describe('JoinScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<JoinScreen />);
    
    expect(getByText('Payfood')).toBeTruthy();
    expect(getByText("Ne vous préoccupez plus de l’addition.")).toBeTruthy();
    expect(getByTestId('joinScreenButton')).toBeTruthy();
  });

  it('navigates to SignIn screen when "Allons-y !" button is pressed', () => {
    const { getByTestId } = render(<JoinScreen navigation={{ navigate: jest.fn() }} />);
    const joinButton = getByTestId('joinScreenButton');

    fireEvent.press(joinButton);

    expect(joinButton.props.onPress).toHaveBeenCalled();
    expect(joinButton.props.onPress.mock.calls[0][0]).toBe('SignIn');
  });


});
