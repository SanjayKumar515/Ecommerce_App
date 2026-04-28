import {LocalStorage} from './localstorage';
import moment from 'moment';

//To Sigout of User
export const handleSignout = (setIsLoggedIn: (isLoggedIn: boolean) => void) => {
  setTimeout(() => {
    setIsLoggedIn(false);
    LocalStorage.save('@login', false);
    LocalStorage.flushQuestionKeys();
  }, 700);
};

export const getCurrentTime = () => {
  return moment().format('hh:mm A');
};

export const getDayPart = () => {
  const hour = moment().hour();

  if (hour < 12) {
    return 'Good Morning!';
  } else if (hour < 18) {
    return 'Good Afternoon!';
  } else {
    return 'Good Evening!';
  }
};
