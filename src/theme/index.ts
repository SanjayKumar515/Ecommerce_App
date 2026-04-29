import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { Colors } from '../constant';

// Brand Color
const primaryColor = Colors.PRIMARY[ 800 ];

export const LightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: primaryColor,
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: primaryColor,
  },
};
