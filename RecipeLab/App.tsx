import 'react-native-gesture-handler';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  DefaultOptions,
} from '@apollo/client';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './src/navigation/BottomNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LogBox} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserProvider from './src/userContext';
import {Searchbar, Snackbar} from 'react-native-paper';
import Toast from './src/components/Toast/Toast';
import Drawer from './src/components/Drawer/Drawer';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs(['source.uri should not be an empty string']);

// const defaultOptions: DefaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'all',
//   },
// };

const client = new ApolloClient({
  uri: 'https://www.api.recipelab.dk/graphql/',
  cache: new InMemoryCache(),
  credentials: 'include',
  // defaultOptions: defaultOptions,
});

GoogleSignin.configure({
  webClientId:
    '920537327681-s95l519clfps8k8mkge60lapp6i8bmhf.apps.googleusercontent.com',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <NavigationContainer>
          <BottomNavigation />
          <Drawer />
        </NavigationContainer>
        <Toast />
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
