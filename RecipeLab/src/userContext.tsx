import {gql, useLazyQuery, useQuery} from '@apollo/client';
import React, {createContext, useEffect, useState} from 'react';
import {Screens} from './enums/enums';
import {User} from './graphql/__generated__/User';

const USER_QUERY = gql`
  query User {
    userInfo {
      name
      email
      imgUrl
      googleId
    }
  }
`;

export enum statusType {
  ERROR = 'Error',
  SUCCESS = 'Success',
}

interface Icontext {
  user: User | undefined;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
  isSignedIn: boolean;
  setIsSignedin: (isSignedIn: boolean) => void;
  setUser: (user: User | undefined) => void;
  status: {showToast: boolean; statusMsg: string; type: statusType};
  setStatus: (status: {
    showToast: boolean;
    statusMsg: string | unknown;
    type: statusType;
  }) => void;
  currentScreen: Screens;
  setCurrentScreen: (currentScreen: Screens) => void;
}

export const userContext = createContext<Icontext>({
  user: undefined,
  isDrawerOpen: false,
  setIsDrawerOpen: () => {},
  isSignedIn: false,
  setIsSignedin: () => {},
  setUser: () => {},
  setStatus: () => {},
  status: {statusMsg: '', showToast: false, type: statusType.SUCCESS},
  currentScreen: Screens.RECIPE,
  setCurrentScreen: () => {},
});

const UserProvider = ({children}) => {
  const [getUser, {data}] = useLazyQuery<User>(USER_QUERY);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [status, setStatus] = useState({
    showToast: false,
    statusMsg: '',
    type: statusType.SUCCESS,
  });
  const [user, setUser] = useState<User>();
  const [currentScreen, setCurrentScreen] = useState<Screens>(Screens.RECIPE);

  // useEffect(() => {
  //   getUser();
  //   setIsSignedIn(data !== undefined ? true : false);
  // }, [data]);

  useEffect(() => {
    getUser();
    isSignedIn ? setUser(data) : setUser(undefined);
  }, [isSignedIn]);

  return (
    <userContext.Provider
      value={{
        user: user,
        setUser: user => {
          setUser(user);
        },
        isDrawerOpen,
        setIsDrawerOpen: isDrawerOpen => {
          setIsDrawerOpen(isDrawerOpen);
        },
        isSignedIn,
        setIsSignedin: isSignedIn => {
          setIsSignedIn(isSignedIn);
        },
        status,
        setStatus: status => {
          setStatus(status);
        },
        currentScreen,
        setCurrentScreen: currentScreen => {
          setCurrentScreen(currentScreen);
        },
      }}>
      {children}
    </userContext.Provider>
  );
};
export default UserProvider;
