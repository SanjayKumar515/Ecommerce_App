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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CustomHeader, CategoryHeader, Skeleton } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/features/ProductsSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts } from '../../../constant';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';
import { API } from '../../../api';
import { toggleWishlist } from '../../../redux/features/WishlistSlice';
import { addToCart } from '../../../redux/features/CartSlice';

const FALLBACK_CAT_IMG =
  'https://cdn-icons-png.flaticon.com/512/679/679821.png';
const BANNERS = [
  'https://img.freepik.com/free-vector/horizontal-banner-template-online-fashion-shopping_23-2148585404.jpg',
  'https://img.freepik.com/free-vector/flat-horizontal-banner-template-black-friday-sales_23-2149091937.jpg',
  'https://img.freepik.com/free-vector/super-sale-banner-template-design_23-2148560126.jpg',
];

const Home = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { products, total, isMoreLoading, isLoading } = useSelector(
    (state: RootState) => state.products,
  );
  const theme = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(
    {},
  );
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        getAllProducts({
          skip: 0,
          limit: 10,
          category: selectedCategory,
          search: searchQuery,
        }),
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedCategory, searchQuery, dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(
      getAllProducts({
        skip: 0,
        limit: 10,
        category: selectedCategory,
        search: searchQuery,
      }),
    );
    setRefreshing(false);
  };

  const loadMore = () => {
    if (!isMoreLoading && products && products.length < total) {
      dispatch(
        getAllProducts({
          skip: products.length,
          limit: 10,
          category: selectedCategory,
          search: searchQuery,
        }),
      );
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get('products/categories');
      const parsed = res.data.map((item: any) =>
        typeof item === 'string' ? { slug: item, name: item } : item,
      );
      const limited = parsed.slice(0, 5);
      const withAll = [{ slug: 'All', name: 'All' }, ...limited];
      setCategories(withAll);
      fetchCategoryImages(limited);
    } catch (err) {
      console.log('Error fetching categories:', err);
    }
  };

  const fetchCategoryImages = async (cats: any[]) => {
    const results = await Promise.allSettled(
      cats.map((cat: any) => API.get(`products/category/${cat.slug}?limit=1`)),
    );
    const imageMap: Record<string, string> = {};
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        const firstProduct = (result.value as any).data?.products?.[0];
        if (firstProduct?.thumbnail) {
          imageMap[cats[i].slug] = firstProduct.thumbnail;
        }
      }
    });
    setCategoryImages(imageMap);
  };

  const bannerScrollRef = useRef<ScrollView>(null);
  const bannerScrollX = useRef(new Animated.Value(0)).current;
  const { width: SLIDER_WIDTH } = useWindowDimensions();
  const bannerIndexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (bannerIndexRef.current + 1) % BANNERS.length;
      bannerScrollRef.current?.scrollTo({
        x: next * SLIDER_WIDTH,
        animated: true,
      });
      bannerIndexRef.current = next;
    }, 3000);
    return () => clearInterval(timer);
  }, [SLIDER_WIDTH]);

  const filteredProducts = products || [];

  const CategorySkeleton = () => (
    <View
      style={[
        styles.catSection,
        { backgroundColor: theme.colors.surface, paddingVertical: hp(1.5) },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp(2) }}
      >
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View
            key={i}
            style={{
              alignItems: 'center',
              width: wp(22),
              paddingHorizontal: wp(2.5),
            }}
          >
            <Skeleton width={wp(16)} height={wp(16)} borderRadius={wp(8)} />
            <Skeleton
              width={wp(14)}
              height={hp(1.5)}
              style={{ marginTop: hp(1) }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const BannerSkeleton = () => (
    <View style={styles.bannerWrapper}>
      <View style={{ width: SLIDER_WIDTH, alignItems: 'center' }}>
        <Skeleton width={wp(90)} height={hp(22)} borderRadius={hp(1.5)} />
      </View>
    </View>
  );

  const ProductSkeleton = () => (
    <View
      style={[styles.productCard, { backgroundColor: theme.colors.surface }]}
    >
      <Skeleton width="100%" height={hp(12)} borderRadius={wp(2)} />
      <View style={{ marginTop: hp(1) }}>
        <Skeleton width="80%" height={hp(2)} />
        <Skeleton width="40%" height={hp(2)} style={{ marginTop: hp(0.5) }} />
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!isMoreLoading) return null;
    return (
      <View style={{ paddingVertical: hp(2), alignItems: 'center' }}>
        <Text style={{ color: theme.colors.primary }}>Loading more...</Text>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (isLoading) return null;
    return (
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
  };

  const { wishlistData } = useSelector((state: RootState) => state.wishlist);

  const renderProduct = ({ item }: { item: any }) => {
    const isWishlisted = wishlistData.some(w => w.id === item.id);

    return (
      <TouchableOpacity
        style={[styles.productCard, { backgroundColor: theme.colors.surface }]}
        onPress={() =>
          //@ts-ignore
          navigate('SingleProduct', { Product: item })
        }
      >
        <Image source={{ uri: item.thumbnail }} style={styles.productThumb} />

        {/* Wishlist Icon */}
        <TouchableOpacity
          style={styles.wishlistIcon}
          onPress={() => dispatch(toggleWishlist(item))}
        >
          <Icon
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={RFValue(18)}
            color={isWishlisted ? '#E53935' : '#666'}
          />
        </TouchableOpacity>

        <View style={styles.productMeta}>
          <Text
            style={[styles.productTitle, { color: theme.colors.onSurface }]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View style={styles.priceRow}>
            <Text
              style={[styles.productPrice, { color: theme.colors.onSurface }]}
            >
              ₹{item.price}
            </Text>

            {/* Add to Cart Icon */}
            <TouchableOpacity
              style={styles.cartIcon}
              onPress={() => dispatch(addToCart({ ...item, quantity: 1 }))}
            >
              <Icon name="add-circle" size={RFValue(22)} color="#2874F0" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const headerElement = useMemo(
    () => (
      <View style={{ backgroundColor: theme.colors.background }}>
        {categories.length > 0 ? (
          <View
            style={[
              styles.catSection,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <CategoryHeader
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              theme={theme}
              categoryImages={categoryImages}
              FALLBACK_CAT_IMG={FALLBACK_CAT_IMG}
              Fonts={Fonts}
            />
          </View>
        ) : (
          <CategorySkeleton />
        )}

        {isLoading && products?.length === 0 ? (
          <BannerSkeleton />
        ) : (
          <View style={styles.bannerWrapper}>
            <Animated.ScrollView
              ref={bannerScrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: bannerScrollX } } }],
                { useNativeDriver: false },
              )}
              onMomentumScrollEnd={e => {
                bannerIndexRef.current = Math.round(
                  e.nativeEvent.contentOffset.x / SLIDER_WIDTH,
                );
              }}
            >
              {BANNERS.map((item, i) => (
                <View
                  key={i}
                  style={{ width: SLIDER_WIDTH, alignItems: 'center' }}
                >
                  <Image
                    source={{ uri: item }}
                    style={[styles.bannerImg, { width: SLIDER_WIDTH * 0.9 }]}
                  />
                </View>
              ))}
            </Animated.ScrollView>

            <View style={styles.pagination}>
              {BANNERS.map((_, i) => {
                const dotWidth = bannerScrollX.interpolate({
                  inputRange: [
                    (i - 1) * SLIDER_WIDTH,
                    i * SLIDER_WIDTH,
                    (i + 1) * SLIDER_WIDTH,
                  ],
                  outputRange: [wp(2), wp(5), wp(2)],
                  extrapolate: 'clamp',
                });
                const dotOpacity = bannerScrollX.interpolate({
                  inputRange: [
                    (i - 1) * SLIDER_WIDTH,
                    i * SLIDER_WIDTH,
                    (i + 1) * SLIDER_WIDTH,
                  ],
                  outputRange: [0.35, 1, 0.35],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={i}
                    style={[
                      styles.dot,
                      {
                        width: dotWidth,
                        opacity: dotOpacity,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  />
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.trendingHeader}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
          >
            {t('trending_now')}
          </Text>
          <Pressable>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>
      </View>
    ),
    [
      categories,
      selectedCategory,
      theme,
      categoryImages,
      SLIDER_WIDTH,
      t,
      bannerScrollX,
      products?.length,
      isLoading,
    ],
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
        data={
          isLoading && products?.length === 0
            ? [1, 2, 3, 4, 5, 6]
            : filteredProducts
        }
        renderItem={({ item }) =>
          isLoading && products?.length === 0 ? (
            <ProductSkeleton />
          ) : (
            renderProduct({ item })
          )
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any, index) =>
          isLoading && products?.length === 0
            ? index.toString()
            : item.id.toString()
        }
        numColumns={2}
        ListHeaderComponent={headerElement}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
