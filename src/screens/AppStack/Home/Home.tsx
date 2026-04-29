import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { CustomHeader } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/features/ProductsSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';

const BANNERS = [
  'https://img.freepik.com/free-vector/horizontal-banner-template-online-fashion-shopping_23-2148585404.jpg',
  'https://img.freepik.com/free-vector/flat-horizontal-banner-template-black-friday-sales_23-2149091937.jpg',
  'https://img.freepik.com/free-vector/super-sale-banner-template-design_23-2148560126.jpg',
];

const CATEGORIES = [
  {
    id: '1',
    title: 'Tech',
    icon: 'https://cdn-icons-png.flaticon.com/512/3659/3659899.png',
    slug: 'smartphones',
  },
  {
    id: '2',
    title: 'Clothing',
    icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050230.png',
    slug: 'mens-shirts',
  },
  {
    id: '3',
    title: 'Home',
    icon: 'https://cdn-icons-png.flaticon.com/512/2549/2549900.png',
    slug: 'furniture',
  },
  {
    id: '4',
    title: 'Beauty',
    icon: 'https://cdn-icons-png.flaticon.com/512/194/194305.png',
    slug: 'beauty',
  },
];

import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';

const Home = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector( ( state: RootState ) => state.products );
  const theme = useTheme();
  const scrollY = useRef( new Animated.Value( 0 ) ).current;
  const { t } = useTranslation();

  const [ searchQuery, setSearchQuery ] = useState( '' );

  // Banner carousel — Animated.ScrollView approach (no state, no remounting)
  const bannerScrollRef = useRef<ScrollView>( null );
  const bannerScrollX = useRef( new Animated.Value( 0 ) ).current;
  // useWindowDimensions updates automatically on rotation / foldable resize
  const { width: SLIDER_WIDTH } = useWindowDimensions();
  // Ref tracks current index inside the timer to avoid stale closure
  const bannerIndexRef = useRef( 0 );

  useEffect( () => {
    dispatch( getAllProducts() );
  }, [] );

  // Auto-scroll: only scrolls, dots driven directly by Animated.Value
  useEffect( () => {
    const timer = setInterval( () => {
      const next = ( bannerIndexRef.current + 1 ) % BANNERS.length;
      bannerScrollRef.current?.scrollTo( { x: next * SLIDER_WIDTH, animated: true } );
      bannerIndexRef.current = next;
    }, 3000 );
    return () => clearInterval( timer );
  }, [] );

  const filteredProducts = products?.products
    ? products.products.filter( ( p: any ) =>
      p.title.toLowerCase().includes( searchQuery.toLowerCase() ),
    )
    : [];

  const renderEmptyComponent = () => (
    <View
      style={ {
        alignItems: 'center',
        marginTop: hp( 4 ),
        paddingHorizontal: wp( 10 ),
      } }
    >
      <Icon
        name="alert-circle-outline"
        size={ RFValue( 40 ) }
        color={ theme.colors.outline }
      />
      <Text
        style={ {
          fontSize: RFValue( 14 ),
          textAlign: 'center',
          marginTop: hp( 1 ),
          color: theme.colors.onSurfaceVariant,
        } }
      >
        No products available matching your search
      </Text>
    </View>
  );


  const renderProduct = ( { item }: { item: any } ) => (
    <TouchableOpacity
      style={ [ styles.productCard, { backgroundColor: theme.colors.surface } ] }
      onPress={ () =>
        //@ts-ignore
        navigate( 'SingleProduct' as never, { Product: item } as never )
      }
    >
      <Image source={ { uri: item.thumbnail } } style={ styles.productThumb } />
      <View style={ styles.productMeta }>
        <Text
          style={ [ styles.productTitle, { color: theme.colors.onSurface } ] }
          numberOfLines={ 1 }
        >
          { item.title }
        </Text>
        <Text style={ [ styles.productPrice, { color: theme.colors.onSurface } ] }>
          ₹{ item.price }
        </Text>
      </View>
    </TouchableOpacity>
  );

  const HeaderComponents = () => (
    <View style={ { backgroundColor: theme.colors.background } }>
      {/* 1. Promo Banners */ }
      <View style={ styles.bannerWrapper }>
        <Animated.ScrollView
          ref={ bannerScrollRef }
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={ false }
          scrollEventThrottle={ 16 }
          onScroll={ Animated.event(
            [ { nativeEvent: { contentOffset: { x: bannerScrollX } } } ],
            { useNativeDriver: false },
          ) }
          onMomentumScrollEnd={ e => {
            // Keep ref in sync when user manually swipes
            bannerIndexRef.current = Math.round(
              e.nativeEvent.contentOffset.x / SLIDER_WIDTH,
            );
          } }
        >
          { BANNERS.map( ( item, i ) => (
            <View key={ i } style={ { width: SLIDER_WIDTH, alignItems: 'center' } }>
              <Image
                source={ { uri: item } }
                style={ [ styles.bannerImg, { width: SLIDER_WIDTH * 0.9 } ] }
              />
            </View>
          ) ) }
        </Animated.ScrollView>

        {/* Pagination Dots — driven directly by scroll X, always in sync */ }
        <View style={ styles.pagination }>
          { BANNERS.map( ( _, i ) => {
            const dotWidth = bannerScrollX.interpolate( {
              inputRange: [
                ( i - 1 ) * SLIDER_WIDTH,
                i * SLIDER_WIDTH,
                ( i + 1 ) * SLIDER_WIDTH,
              ],
              outputRange: [ wp( 2 ), wp( 5 ), wp( 2 ) ],
              extrapolate: 'clamp',
            } );
            const dotOpacity = bannerScrollX.interpolate( {
              inputRange: [
                ( i - 1 ) * SLIDER_WIDTH,
                i * SLIDER_WIDTH,
                ( i + 1 ) * SLIDER_WIDTH,
              ],
              outputRange: [ 0.35, 1, 0.35 ],
              extrapolate: 'clamp',
            } );
            return (
              <Animated.View
                key={ i }
                style={ [
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity: dotOpacity,
                    backgroundColor: theme.colors.primary,
                  },
                ] }
              />
            );
          } ) }
        </View>
      </View>

      {/* 2. Round Category Chips (Zomato) */ }
      <View
        style={ [ styles.catSection, { backgroundColor: theme.colors.surface } ] }
      >
        <Text style={ [ styles.sectionTitle, { color: theme.colors.onSurface } ] }>
          { t( 'top_categories' ) }
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={ false }
          contentContainerStyle={ styles.catScroll }
        >
          { CATEGORIES.map( cat => (
            <Pressable
              key={ cat.id }
              style={ styles.catItem }
              onPress={ () =>
                //@ts-ignore
                navigate(
                  'Categories' as never,
                  { screen: 'Categories' } as never,
                )
              }
            >
              <View
                style={ [
                  styles.iconRing,
                  { backgroundColor: theme.colors.background },
                ] }
              >
                <Image source={ { uri: cat.icon } } style={ styles.catIcon } />
              </View>
              <Text
                style={ [
                  styles.catLabel,
                  { color: theme.colors.onSurfaceVariant },
                ] }
              >
                { cat.title }
              </Text>
            </Pressable>
          ) ) }
        </ScrollView>
      </View>

      <Text
        style={ [
          styles.sectionTitle,
          {
            color: theme.colors.onSurface,
            paddingLeft: wp( 5 ),
            marginTop: hp( 2 ),
          },
        ] }
      >
        { t( 'trending_now' ) }
      </Text>
    </View>
  );

  return (
    <View
      style={ [ styles.container, { backgroundColor: theme.colors.background } ] }
    >
      <CustomHeader
        scrollY={ scrollY }
        searchQuery={ searchQuery }
        setSearchQuery={ setSearchQuery }
      />
      <Animated.FlatList
        data={ filteredProducts }
        renderItem={ renderProduct }
        showsVerticalScrollIndicator={ false }
        keyExtractor={ ( item: any ) => item.id.toString() }
        numColumns={ 2 }
        ListHeaderComponent={ HeaderComponents }
        ListEmptyComponent={ renderEmptyComponent }
        onScroll={ Animated.event(
          [ { nativeEvent: { contentOffset: { y: scrollY } } } ],
          { useNativeDriver: false },
        ) }
        scrollEventThrottle={ 16 }
        contentContainerStyle={ { paddingBottom: hp( 5 ) } }
        columnWrapperStyle={ styles.rowWrapper }
      />
    </View>
  );
};

export default Home;
