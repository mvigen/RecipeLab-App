import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, IconName} from '../../enums/enums';
import {StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';

interface Props {
  recipeId: string | null | undefined;
}

const EditButton = ({recipeId}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.button}>
      <Icon
        name={IconName.EDIT}
        size={30}
        color={Colors.PRIMARY}
        onPress={() => {
          navigation.navigate('EditRecipe', {id: recipeId});
        }}
      />
    </View>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 15,
  },
});
