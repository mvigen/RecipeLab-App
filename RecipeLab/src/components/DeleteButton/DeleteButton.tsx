import {gql, useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, IconName} from '../../enums/enums';
import {DeleteRecipeMutationVariables} from '../../graphql/__generated__/DeleteRecipeMutation';
import {RECIPE_QUERY} from '../../screens/recipe/RecipeScreen';
import Modal from 'react-native-modal';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {statusType, userContext} from '../../userContext';

interface Props {
  recipeId: string | null | undefined;
}

const DELETE_RECIPE = gql`
  mutation DeleteRecipeMutation($input: RemoveRecipeInput) {
    removeRecipe(input: $input) {
      data {
        name
      }
    }
  }
`;

const DeleteButton = ({recipeId}: Props) => {
  const [deleteRecipe] = useMutation<DeleteRecipeMutationVariables>(
    DELETE_RECIPE,
    {
      refetchQueries: [{query: RECIPE_QUERY}, 'Recipes'],
    },
  );
  const [isVisible, setIsVisible] = useState(false);
  const {t} = useTranslation();
  const {setStatus} = useContext(userContext);

  const navigate = useNavigation();
  return (
    <View>
      <Icon
        name={IconName.DELETE}
        size={30}
        color={Colors.PRIMARY}
        onPress={() => {
          setIsVisible(true);
        }}
      />
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}
        onSwipeComplete={() => {
          setIsVisible(false);
        }}
        animationIn="zoomIn"
        animationOut="zoomOut"
        swipeDirection="right"
        useNativeDriver
        hideModalContentWhileAnimating
        propagateSwipe
        style={styles.sideMenuStyle}>
        <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.text}>{t('recipe.DeleteRecipe')}</Text>
          <View style={styles.rowMargin}>
            <Button
              mode="contained"
              style={styles.cancelButton}
              onPress={() => setIsVisible(false)}>
              {t('recipe.Cancel')}
            </Button>
            <Button
              mode="contained"
              style={styles.deleteButton}
              onPress={() => {
                deleteRecipe({
                  variables: {
                    input: {
                      recipeId: recipeId,
                    },
                  },
                })
                  .then(() =>
                    setStatus({
                      showToast: true,
                      statusMsg: t('status.RemoveRecipe'),
                      type: statusType.SUCCESS,
                    }),
                  )
                  .catch(e => {
                    setStatus({
                      showToast: true,
                      statusMsg: e.message,
                      type: statusType.ERROR,
                    });
                  });
                setIsVisible(false);
                navigate.goBack();
              }}>
              {t('recipe.Delete')}
            </Button>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  cancelButton: {borderRadius: 25, backgroundColor: Colors.PRIMARY},
  deleteButton: {
    marginLeft: 'auto',
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
  },
  text: {margin: 20, alignItems: 'center'},
  rowMargin: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  sideMenuStyle: {
    flex: 1,
    margin: '10%',
    marginVertical: '78%',
  },
  safeAreaView: {
    borderRadius: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
});
