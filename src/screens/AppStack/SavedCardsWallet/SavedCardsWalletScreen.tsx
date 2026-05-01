import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { MyBackButton } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const SavedCardsWalletScreen = () => {


  return (
    <View style={ styles.container }>
      <MyBackButton title="My Wallet & Cards" />

      <ScrollView style={ styles.content }>
        {/* Wallet Section */ }
        <View style={ styles.section }>
          <Text style={ styles.sectionTitle }>WALLETS</Text>
          <View style={ styles.card }>
            <View style={ styles.walletRow }>
              <View style={ styles.walletInfo }>
                <Image
                  source={ { uri: 'https://cdn-icons-png.flaticon.com/512/174/174861.png' } }
                  style={ styles.walletIcon }
                />
                <View>
                  <Text style={ styles.walletName }>Flipkart Wallet</Text>
                  <Text style={ styles.walletBalance }>Balance: ₹500.00</Text>
                </View>
              </View>
              <Pressable style={ styles.topUpBtn }>
                <Text style={ styles.topUpText }>TOP UP</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Saved Cards Section */ }
        <View style={ styles.section }>
          <Text style={ styles.sectionTitle }>SAVED CARDS</Text>
          <View style={ styles.card }>
            <View style={ styles.cardRow }>
              <Icon name="card-outline" size={ 30 } color="#1A237E" />
              <View style={ styles.cardDetails }>
                <Text style={ styles.cardNumber }>**** **** **** 4582</Text>
                <Text style={ styles.cardExpiry }>Expires 12/28</Text>
              </View>
              <Image
                source={ { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png' } }
                style={ styles.brandIcon }
              />
            </View>
          </View>

          <Pressable style={ styles.addCardBtn }>
            <Icon name="add" size={ 20 } color="#2874F0" />
            <Text style={ styles.addCardText }>Add a new card</Text>
          </Pressable>
        </View>

        {/* Other Options */ }
        <View style={ styles.section }>
          <Text style={ styles.sectionTitle }>OTHER OPTIONS</Text>
          <Pressable style={ styles.listItem }>
            <Icon name="gift-outline" size={ 24 } color="#666" />
            <Text style={ styles.listItemText }>Gift Cards</Text>
            <Icon name="chevron-forward" size={ 20 } color="#ccc" />
          </Pressable>
          <Pressable style={ styles.listItem }>
            <Icon name="phone-portrait-outline" size={ 24 } color="#666" />
            <Text style={ styles.listItemText }>UPI Linked Accounts</Text>
            <Icon name="chevron-forward" size={ 20 } color="#ccc" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};



export default SavedCardsWalletScreen;
