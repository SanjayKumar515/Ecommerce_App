import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MyBackButton } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const DeliveryStatusScreen = () => {
  const route = useRoute();
  const { orderId } = route.params as any;

  const steps = [
    { title: 'Order Placed', date: 'Fri, 1st May', status: 'completed' },
    { title: 'Packed', date: 'Fri, 1st May', status: 'completed' },
    { title: 'Shipped', date: 'Expected by Sat, 2nd May', status: 'active' },
    { title: 'Out for Delivery', date: '', status: 'pending' },
    { title: 'Delivered', date: '', status: 'pending' },
  ];

  const Step = ( { title, date, status, isLast }: any ) => (
    <View style={ styles.stepRow }>
      <View style={ styles.leftColumn }>
        <View style={ [
          styles.circle,
          status === 'completed' && styles.circleCompleted,
          status === 'active' && styles.circleActive
        ] }>
          { status === 'completed' && <Icon name="checkmark" size={ 14 } color="#fff" /> }
          { status === 'active' && <View style={ styles.activeDot } /> }
        </View>
        { !isLast && <View style={ [ styles.line, status === 'completed' && styles.lineCompleted ] } /> }
      </View>
      <View style={ styles.rightColumn }>
        <Text style={ [ styles.stepTitle, status === 'pending' && styles.textPending ] }>{ title }</Text>
        { date !== '' && <Text style={ styles.stepDate }>{ date }</Text> }
      </View>
    </View>
  );

  return (
    <View style={ styles.container }>
      <MyBackButton title="Delivery Status" />

      <ScrollView contentContainerStyle={ styles.content }>
        <View style={ styles.orderIdCard }>
          <Text style={ styles.orderIdLabel }>Order ID: { orderId }</Text>
          <Text style={ styles.viewDetails }>View Details</Text>
        </View>

        <View style={ styles.statusCard }>
          <Text style={ styles.sectionTitle }>Delivery Status</Text>
          <View style={ styles.stepsContainer }>
            { steps.map( ( step, index ) => (
              <Step
                key={ index }
                { ...step }
                isLast={ index === steps.length - 1 }
              />
            ) ) }
          </View>
        </View>

        <View style={ styles.helpCard }>
          <Icon name="help-circle-outline" size={ 24 } color="#2874F0" />
          <Text style={ styles.helpText }>Need help with your order?</Text>
          <Icon name="chevron-forward" size={ 20 } color="#ccc" />
        </View>
      </ScrollView>
    </View>
  );
};



export default DeliveryStatusScreen;
