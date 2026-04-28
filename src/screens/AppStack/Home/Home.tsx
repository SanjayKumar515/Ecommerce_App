import {
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
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
  const { products } = useSelector((state: RootState) => state.products);
  const theme = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');

  // Carousel State & Ref
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerRef = useRef<FlatList>(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const filteredProducts = products?.products
    ? products.products.filter((p: any) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const renderEmptyComponent = () => (
    <View
      style={{
        alignItems: 'center',
        marginTop: hp(4),
        paddingHorizontal: wp(10),
      }}
    >
      <Icon
        name="alert-circle-outline"
        size={RFValue(40)}
        color={theme.colors.outline}
      />
      <Text
        style={{
          fontSize: RFValue(14),
          textAlign: 'center',
          marginTop: hp(1),
          color: theme.colors.onSurfaceVariant,
        }}
      >
        No products available matching your search
      </Text>
    </View>
  );

  const renderBanner = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.bannerImg} />
  );

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: theme.colors.surface }]}
      onPress={() =>
        //@ts-ignore
        navigate('SingleProduct' as never, { Product: item } as never)
      }
    >
      <Image source={{ uri: item.thumbnail }} style={styles.productThumb} />
      <View style={styles.productMeta}>
        <Text
          style={[styles.productTitle, { color: theme.colors.onSurface }]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text style={[styles.productPrice, { color: theme.colors.onSurface }]}>
          ₹{item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const HeaderComponents = () => (
    <View style={{ backgroundColor: theme.colors.background }}>
      {/* 1. Promo Banners (Flipkart) */}
      <View style={styles.bannerWrapper}>
        <Carousel
          data={BANNERS}
          renderItem={renderBanner}
          sliderWidth={wp(100)}
          itemWidth={wp(100)}
          onSnapToItem={index => setBannerIndex(index)}
          autoplay={true}
          loop={true}
          autoplayInterval={5000}
        />
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {BANNERS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === bannerIndex
                      ? theme.colors.primary
                      : theme.colors.outlineVariant,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* 2. Round Category Chips (Zomato) */}
      <View
        style={[styles.catSection, { backgroundColor: theme.colors.surface }]}
      >
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
          {t('top_categories')}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {CATEGORIES.map(cat => (
            <Pressable
              key={cat.id}
              style={styles.catItem}
              onPress={() =>
                //@ts-ignore
                navigate(
                  'Categories' as never,
                  { screen: 'Categories' } as never,
                )
              }
            >
              <View
                style={[
                  styles.iconRing,
                  { backgroundColor: theme.colors.background },
                ]}
              >
                <Image source={{ uri: cat.icon }} style={styles.catIcon} />
              </View>
              <Text
                style={[
                  styles.catLabel,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {cat.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.colors.onSurface,
            paddingLeft: wp(5),
            marginTop: hp(2),
          },
        ]}
      >
        {t('trending_now')}
      </Text>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CustomHeader
        scrollY={scrollY}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Animated.FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={HeaderComponents}
        ListEmptyComponent={renderEmptyComponent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: hp(5) }}
        columnWrapperStyle={styles.rowWrapper}
      />
    </View>
  );
};

export default Home;
