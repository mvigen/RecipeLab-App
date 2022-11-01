import React from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
// import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ButtonProps extends Pick<TouchableOpacityProps, 'onPress'> {
  iconSize?: number;
  iconName?: string;
  iconColor?: string;
  text?: string | null;
  style?: StyleProp<ViewStyle>;
}

const DrawerButton = ({
  iconName = 'add',
  iconSize = 25,
  text,
  iconColor,
  style,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[style, styles.button]}
      onPress={onPress}>
      <Icon
        style={styles.icon}
        color={iconColor}
        name={iconName}
        size={iconSize}></Icon>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  text: {
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  icon: {marginRight: 20},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
