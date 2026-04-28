import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '../../constant';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View
          style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>
            {t('language_modal_title')}
          </Text>

          <TouchableOpacity
            style={[
              styles.langOption,
              i18n.language === 'en' && { borderColor: theme.colors.primary },
            ]}
            onPress={() => {
              i18n.changeLanguage('en');
              onClose();
            }}
          >
            <Text style={[styles.langText, { color: theme.colors.onSurface }]}>
              🇬🇧 English
            </Text>
            {i18n.language === 'en' && (
              <Icon
                name="checkmark-circle"
                size={20}
                color={theme.colors.primary}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.langOption,
              i18n.language === 'hi' && { borderColor: theme.colors.primary },
            ]}
            onPress={() => {
              i18n.changeLanguage('hi');
              onClose();
            }}
          >
            <Text style={[styles.langText, { color: theme.colors.onSurface }]}>
              🇮🇳 हिंदी (Hindi)
            </Text>
            {i18n.language === 'hi' && (
              <Icon
                name="checkmark-circle"
                size={20}
                color={theme.colors.primary}
              />
            )}
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    padding: wp(5),
    paddingBottom: hp(5),
  },
  modalTitle: {
    fontSize: RFValue(16),
    fontFamily: Fonts.Bold,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(4),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: hp(1.5),
  },
  langText: {
    fontSize: RFValue(15),
    fontFamily: Fonts.Medium,
  },
});
