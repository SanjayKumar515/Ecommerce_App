import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import { logout } from '../../../redux/features/AuthSlice';

import { useTranslation } from 'react-i18next';
import styles from './styles';
import { LanguageModal } from '../../../components';

const Account = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    Alert.alert(t('logout'), t('logout_confirm'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('yes_logout'),
        onPress: () => {
          dispatch(logout());
          navigate('Login' as never);
        },
      },
    ]);
  };

  const [langModalVisible, setLangModalVisible] = useState(false);

  const changeLang = () => {
    setLangModalVisible(true);
  };

  const ShortcutItem = ({ icon, title }: { icon: string; title: string }) => (
    <Pressable
      style={[styles.shortcutBtn, { backgroundColor: theme.colors.surface }]}
    >
      <Icon name={icon} size={RFValue(24)} color={theme.colors.primary} />
      <Text style={[styles.shortcutTitle, { color: theme.colors.onSurface }]}>
        {title}
      </Text>
    </Pressable>
  );

  const ListItem = ({
    icon,
    title,
    onPress,
  }: {
    icon: string;
    title: string;
    onPress?: () => void;
  }) => (
    <Pressable
      style={[
        styles.listItem,
        { borderBottomColor: theme.colors.outlineVariant },
      ]}
      onPress={onPress}
    >
      <View style={styles.listItemLeft}>
        <Icon
          name={icon}
          size={RFValue(20)}
          color={theme.colors.onSurfaceVariant}
        />
        <Text style={[styles.listItemText, { color: theme.colors.onSurface }]}>
          {title}
        </Text>
      </View>
      <Icon
        name="chevron-forward"
        size={RFValue(18)}
        color={theme.colors.outline}
      />
    </Pressable>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Top Banner (Flipkart Profile) */}
      <View
        style={[
          styles.profileHeader,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View
          style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.avatarText}>S</Text>
        </View>
        <View>
          <Text style={[styles.userName, { color: theme.colors.onSurface }]}>
            Sanjay Kumar
          </Text>
          <Text
            style={[styles.userEmail, { color: theme.colors.onSurfaceVariant }]}
          >
            +91 9876543210
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Shortcut Grid (Orders, Wishlist, Coupons, Help) */}
        <View style={styles.shortcutsGrid}>
          <ShortcutItem icon="cube-outline" title={t('orders')} />
          <ShortcutItem icon="heart-outline" title={t('wishlist')} />
          <ShortcutItem icon="ticket-outline" title={t('coupons')} />
          <ShortcutItem icon="help-circle-outline" title={t('help_center')} />
        </View>

        {/* Account Settings List */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text
            style={[
              styles.sectionHeading,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {t('account_settings')}
          </Text>
          <ListItem icon="person-outline" title={t('edit_profile')} />
          <ListItem icon="location-outline" title={t('saved_addresses')} />
          <ListItem
            icon="language-outline"
            title={t('select_language')}
            onPress={changeLang}
          />
          <ListItem
            icon="notifications-outline"
            title={t('notification_settings')}
          />
        </View>

        {/* Payments & Legal */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text
            style={[
              styles.sectionHeading,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {t('payments_cards')}
          </Text>
          <ListItem icon="wallet-outline" title={t('saved_cards_wallet')} />
          <ListItem
            icon="shield-checkmark-outline"
            title={t('privacy_policy')}
          />
        </View>

        {/* Logout */}
        <Pressable
          style={[styles.logoutBtn, { backgroundColor: theme.colors.surface }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, { color: theme.colors.error }]}>
            {t('logout')}
          </Text>
        </Pressable>
      </ScrollView>
      <LanguageModal
        visible={langModalVisible}
        onClose={() => setLangModalVisible(false)}
      />
    </View>
  );
};

export default Account;
