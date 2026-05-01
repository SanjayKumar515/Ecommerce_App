import React from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { clearCart } from '../../../redux/features/CartSlice';
import { addOrder } from '../../../redux/features/OrderSlice';
import { MyBackButton } from '../../../components';
import styles from './styles';
import RazorpayCheckout from 'react-native-razorpay';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { cartData, totalAmount } = useSelector( ( state: RootState ) => state.cartItems );
 // const { userData } = useSelector( ( state: RootState ) => state.auth );
  const [ selectedMethod, setSelectedMethod ] = React.useState( 'upi' );

  const completeOrder = ( method: string ) => {
    const newOrder = {
      id: Math.random().toString( 36 ).substr( 2, 9 ).toUpperCase(),
      items: [ ...cartData ],
      totalAmount: totalAmount,
      date: new Date().toLocaleDateString( 'en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      } ),
      status: 'On the way' as const,
    };

    // @ts-ignore
    dispatch( addOrder( newOrder ) );
    dispatch( clearCart() );

    Alert.alert(
      'Success',
      `Order placed successfully using ${ method.toUpperCase() }!`,
      [ { text: 'OK', onPress: () => navigation.navigate( 'Orders' as never ) } ]
    );
  };

  const handlePayment = () => {
    if ( selectedMethod === 'razorpay' || selectedMethod === 'googlepay' || selectedMethod === 'phonepe' || selectedMethod === 'upi' ) {
      const options = {
        description: 'E-commerce App Payment',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_Sk2iDQtkBg2Py8',
        amount: totalAmount * 100,
        name: 'Sanjay Kumar',
        prefill: {
          email: 'sanjay@example.com',
          contact: '9876543210',
          name: 'Sanjay Kumar',
        },
        theme: { color: '#2874F0' },
        // Pre-selecting the method if it's UPI
        method: (selectedMethod === 'googlepay' || selectedMethod === 'phonepe' || selectedMethod === 'upi') ? 'upi' : undefined,
      };
      //@ts-ignore
      RazorpayCheckout.open( options )
        .then( ( data: any ) => {
          console.log( `Success: ${ data.razorpay_payment_id }` );
          completeOrder( selectedMethod );
        } )
        .catch( ( error: any ) => {
          console.log( `Error: ${ error.code } | ${ error.description }` );
          Alert.alert( 'Payment Failed', error.description );
        } );
    } else {
      // For COD, just complete the order
      completeOrder( selectedMethod );
    }
  };

  const PaymentOption = ( { id, title, subtitle, icon }: any ) => (
    <Pressable
      style={ [ styles.option, selectedMethod === id && styles.selectedOption ] }
      onPress={ () => setSelectedMethod( id ) }
    >
      <View style={ [ styles.radio, selectedMethod === id && styles.radioActive ] }>
        { selectedMethod === id && <View style={ styles.radioInner } /> }
      </View>
      <View style={ styles.optionContent }>
        <Text style={ styles.optionTitle }>{ title }</Text>
        { subtitle && <Text style={ styles.optionSub }>{ subtitle }</Text> }
      </View>
      { icon && <Image source={ { uri: icon } } style={ styles.optionIcon } /> }
    </Pressable>
  );

  return (
    <View style={ styles.container }>
      <MyBackButton title='Payment' />

      <View style={ styles.amountBar }>
        <Text style={ styles.amountLabel }>Amount to Pay</Text>
        <Text style={ styles.amountValue }>₹{ totalAmount }</Text>
      </View>

      <ScrollView style={ styles.content }>
        <Text style={ styles.sectionTitle }>RECOMMENDED</Text>

        <PaymentOption
          id="googlepay"
          title="Google Pay"
          subtitle="Pay using Google Pay"
          icon="https://cdn-icons-png.flaticon.com/512/2991/2991195.png"
        />

        <PaymentOption
          id="phonepe"
          title="PhonePe"
          subtitle="Pay using PhonePe"
          icon="https://cdn-icons-png.flaticon.com/512/825/825454.png"
        />

        <PaymentOption
          id="upi"
          title="Other UPI"
          subtitle="Pay using any other UPI app"
          icon="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        />

        <Text style={ styles.sectionTitle }>OTHER OPTIONS</Text>

        <PaymentOption
          id="razorpay"
          title="Cards / Netbanking / Wallet"
          subtitle="Powered by Razorpay"
          icon="https://razorpay.com/favicon.png"
        />

        <PaymentOption
          id="cod"
          title="Cash on Delivery"
          subtitle="Pay when you receive the product"
        />
      </ScrollView>

      <View style={ styles.bottomBar }>
        <View style={ styles.priceInfo }>
          <Text style={ styles.priceValue }>₹{ totalAmount }</Text>
          <Text style={ styles.priceSub }>View Price Details</Text>
        </View>
        <Pressable style={ styles.payBtn } onPress={ handlePayment }>
          <Text style={ styles.payText }>CONTINUE</Text>
        </Pressable>
      </View>
    </View>
  );
};



export default PaymentScreen;
