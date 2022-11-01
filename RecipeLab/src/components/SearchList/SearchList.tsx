import React, {useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputEndEditingEventData,
  View,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors} from '../../enums/enums';

export interface Product {
  name: string;
  price: number;
  sallingProdId: string;
  description: string;
  url: string;
  imgUrl: string;
}

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  data: Product[] | undefined;
  onEndEditing: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  onItemPress: (item: Product) => void;
  onFocus: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
}

const SearchList = ({
  label,
  placeholder,
  value,
  data,
  onEndEditing,
  onItemPress,
  onFocus,
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        label={label}
        placeholder={placeholder}
        mode="outlined"
        selectionColor={Colors.PRIMARY}
        activeOutlineColor={Colors.PRIMARY}
        onEndEditing={onEndEditing}
        onFocus={onFocus}
      />
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onItemPress(item)}
            style={styles.item}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
  },
  container: {
    flex: 1,
    paddingBottom: 5,
  },
  item: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
  },
});
