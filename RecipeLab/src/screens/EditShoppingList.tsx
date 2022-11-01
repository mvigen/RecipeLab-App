import {StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types';
import {Button, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Colors} from '../enums/enums';
import {useMutation} from '@apollo/client';
import {statusType, userContext} from '../userContext';
import {
  EDIT_SHOPPINGLIST,
  SHOPPINGLIST_NAMES_QUERY,
} from '../components/Drawer/Drawer';
import {EditShoppingListInput} from '../graphql/__generated__/globalTypes';

const EditShoppingListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();
  const route = useRoute<RouteProp<RootStackParamList, 'EditShoppingList'>>();
  const [ShoppingListName, SetShoppingListname] = useState(
    route.params.name == null ? undefined : route.params.name,
  );
  const [editShoppingList] = useMutation<EditShoppingListInput>(
    EDIT_SHOPPINGLIST,
    {
      refetchQueries: [{query: SHOPPINGLIST_NAMES_QUERY}],
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
        maxLength={18}></TextInput>
      <Button
        style={styles.button}
        color="white"
        onPress={() => {
          editShoppingList({
            variables: {
              input: {
                name: ShoppingListName,
                shoppingListId: route.params.shoppingListId,
                isActive: route.params.isActive,
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
        {t('shoppingList.EditShoppingList')}
      </Button>
    </View>
  );
};

export default EditShoppingListScreen;

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
