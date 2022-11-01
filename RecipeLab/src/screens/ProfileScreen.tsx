import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import i18next from 'i18next';
import SelectDropdown from 'react-native-select-dropdown';
import {useTranslation} from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {userContext} from '../userContext';

const ProfileScreen = () => {
  const {t} = useTranslation();

  const countries = [
    {country: t('countries.English'), code: 'en'},
    {country: t('countries.Danish'), code: 'da'},
  ];

  const {user} = useContext(userContext);

  return (
    <View style={styles.container}>
      {user?.userInfo != (null || undefined) ? (
        <View>
          <Text style={styles.txt}>{t('profile.Language')}</Text>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              i18next.changeLanguage(selectedItem.code);
            }}
            defaultButtonText={t('profile.SelectLanguage')}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.country;
            }}
            rowTextForSelection={(item, index) => {
              return item.country;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#FFF'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
      ) : undefined}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  txt: {
    fontSize: 20,
    marginVertical: 10,
  },
  dropdown2BtnStyle: {
    width: '50%',
    height: 40,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  dropdown2RowStyle: {
    height: 40,
    backgroundColor: '#444',
    borderBottomColor: '#C5C5C5',
  },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
