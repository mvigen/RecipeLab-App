import {StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types';
import {Button, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Colors} from '../enums/enums';
import {gql, useMutation} from '@apollo/client';
import {SHOPPINGLIST_QUERY} from './ShoppingListScreen';
import {AddShoppingListInput} from '../graphql/__generated__/globalTypes';
import {statusType, userContext} from '../userContext';
import {SHOPPINGLIST_NAMES_QUERY} from '../components/Drawer/Drawer';

const ADD_SHOPPINGLIST = gql`
  mutation addShoppingList($input: AddShoppingListInput) {
    addShoppingList(input: $input) {
      data {
        id
      }
    }
  }
`;

const AddShoppingListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();
  const [ShoppingListName, SetShoppingListname] = useState('');
  const [addShoppingList] = useMutation<AddShoppingListInput>(
    ADD_SHOPPINGLIST,
    {
      refetchQueries: [
        {query: SHOPPINGLIST_QUERY},
        {query: SHOPPINGLIST_NAMES_QUERY},
      ],
    },
  );
  const {setStatus} = useContext(userContext);

  return (
    <View style={styles.container}>
      <TextInput
        label={t('shoppingList.ShoppingListPlaceholder')}
        mode="outlined"
        activeOutlineColor={Colors.PRIMARY}
        style={styles.textinput}
        value={ShoppingListName}
        onChangeText={text => SetShoppingListname(text)}
        maxLength={15}></TextInput>
      <Button
        style={styles.button}
        color="white"
        onPress={() => {
          addShoppingList({
            variables: {
              input: {
                name: ShoppingListName,
                isActive: true,
              },
            },
          }).catch(e =>
            setStatus({
              showToast: true,
              statusMsg: e.message,
              type: statusType.ERROR,
            }),
          );
          navigation.goBack();
        }}>
        {t('shoppingList.CreateShoppingList')}
      </Button>
    </View>
  );
};

export default AddShoppingListScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    width: 250,
    alignSelf: 'center',
  },
  textinput: {
    marginTop: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
