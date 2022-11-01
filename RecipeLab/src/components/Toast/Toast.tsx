import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {statusType, userContext} from '../../userContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Toast = () => {
  const {status, setStatus} = useContext(userContext);

  const {t} = useTranslation();
  return (
    <Snackbar
      visible={status.showToast}
      onDismiss={() =>
        setStatus({statusMsg: '', showToast: false, type: statusType.SUCCESS})
      }
      action={{
        color: 'white',
        label: t('error.Remove'),
        onPress: () => {},
      }}
      style={[
        styles.toast,
        status.type === statusType.ERROR ? styles.error : styles.success,
      ]}>
      {status.statusMsg}
    </Snackbar>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    marginBottom: 60,
  },
  error: {
    backgroundColor: 'red',
  },
  success: {
    backgroundColor: 'green',
  },
});
