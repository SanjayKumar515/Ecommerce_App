import React from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constant';

interface CustomHeaderProps {
  scrollY?: Animated.Value;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  scrollY,
  searchQuery,
  setSearchQuery,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();

  // Animations
  const topRowHeight = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [40, 0],
        extrapolate: 'clamp',
      })
    : undefined;

  const topRowOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      })
    : undefined;

  const topRowMarginBottom = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [12, 0], // Roughly hp(1.5)
        extrapolate: 'clamp',
      })
    : undefined;

  return (
    <View style={[styles.container, { backgroundColor: Colors.PRIMARY[100] }]}>
      {/* Top Row: Location and Profile */}
      <Animated.View
        style={[
          styles.topRow,
          {
            height: topRowHeight,
            opacity: topRowOpacity,
            marginBottom: topRowMarginBottom,
            overflow: 'hidden',
          },
        ]}
      >
        <TouchableOpacity style={styles.locationContainer}>
          <View style={styles.deliveryTimeRow}>
            <Text
              style={[styles.deliveryTimeText, { color: Colors.PRIMARY[400] }]}
            >
              Delivery in 10 mins
            </Text>
          </View>
          <View style={styles.addressRow}>
            <Text
              style={[
                styles.addressText,
                { color: theme.colors.onSurfaceVariant },
              ]}
              numberOfLines={1}
            >
              Home - 123 Main Street, New York...
            </Text>
            <Icon
              name="chevron-down"
              size={RFValue(12)}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.profileIconContainer,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => navigate('Account' as never)}
        >
          <Icon
            name="person"
            size={RFValue(20)}
            color={theme.colors.onPrimary}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Row: Search Bar */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Icon
          name="search-outline"
          size={RFValue(18)}
          color={theme.colors.onSurfaceVariant}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for products..."
          placeholderTextColor={theme.colors.onSurfaceVariant}
          style={[styles.searchInput, { color: theme.colors.onSurface }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon
          name="mic-outline"
          size={RFValue(18)}
          color={theme.colors.onSurfaceVariant}
        />
      </View>
    </View>
  );
};

export default CustomHeader;
