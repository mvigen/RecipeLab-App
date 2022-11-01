/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import {fireEvent, render} from '@testing-library/react-native';
// import {Recipes_recipes} from '../src/graphql/__generated__/Recipes';
import DrawerButton from '../src/components/Button/Button';

describe('DrawerButton', () => {
  it('Changes button text depending on prop', () => {
    const {queryByText} = render(<DrawerButton text="Log ind" />);
    expect(queryByText('Log ind')).not.toBeNull();
  }),
    it('onPress is being called', () => {
      const onPress = jest.fn();
      const {getByText} = render(
        <DrawerButton text="Log ind" onPress={onPress} />,
      );
      fireEvent.press(getByText('Log ind'));
      expect(onPress).toBeCalledTimes(1);
    });
});
