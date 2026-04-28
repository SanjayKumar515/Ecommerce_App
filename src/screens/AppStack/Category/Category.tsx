import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { API } from '../../../api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '../../../constant';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const { navigate } = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await API.get('products/categories');
      // DummyJSON can return strings or objects depending on version
      const parsed = res.data.map((item: any) =>
        typeof item === 'string' ? { slug: item, name: item } : item
      );
      setCategories(parsed);
      if (parsed.length > 0) {
        setSelectedCategory(parsed[0].slug);
      }
    } catch (err) {
      console.log('Error fetching categories:', err);
    }
  };

  const fetchProductsByCategory = async (slug: string) => {
    setIsLoading(true);
    try {
      const res = await API.get(`products/category/${slug}`);
      setProducts(res.data.products);
    } catch (err) {
      console.log('Error fetching category products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCategoryItem = ({ item }: { item: any }) => {
    const isSelected = item.slug === selectedCategory;
    return (
      <Pressable
        style={[
          styles.categoryBtn,
          {
            backgroundColor: isSelected
              ? theme.colors.surface
              : theme.colors.background,
            borderLeftColor: isSelected
              ? theme.colors.primary
              : 'transparent',
          },
        ]}
        onPress={() => setSelectedCategory(item.slug)}
      >
        <Text
          style={[
            styles.categoryText,
            {
              color: isSelected
                ? theme.colors.primary
                : theme.colors.onSurfaceVariant,
              fontFamily: isSelected ? Fonts.Bold : Fonts.Medium,
            },
          ]}
          numberOfLines={2}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  const renderProductItem = ({ item }: { item: any }) => {
    return (
      <Pressable
        style={[styles.productCard, { backgroundColor: theme.colors.surface }]}
        onPress={() => navigate('SingleProduct' as never, { Product: item } as never)}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.productImg} />
        <Text
          style={[styles.productTitle, { color: theme.colors.onSurface }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={[styles.productPrice, { color: theme.colors.onSurface }]}>
          ₹{item.price}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          Categories
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Left Sidebar */}
        <View
          style={[
            styles.sidebar,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.slug}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Right Content */}
        <View
          style={[styles.rightPane, { backgroundColor: theme.colors.surface }]}
        >
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <Text style={{ color: theme.colors.onSurfaceVariant }}>
                Loading...
              </Text>
            </View>
          ) : (
            <FlatList
              data={products}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={styles.row}
              contentContainerStyle={{ padding: wp(2) }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: RFValue(18),
    fontFamily: Fonts.Bold,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: wp(25),
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  categoryBtn: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    borderLeftWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: RFValue(12),
    textAlign: 'center',
  },
  rightPane: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: wp(34),
    padding: wp(2),
    marginBottom: hp(1.5),
    borderRadius: wp(2),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  productImg: {
    width: wp(25),
    height: wp(25),
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: RFValue(11),
    fontFamily: Fonts.Medium,
    marginTop: hp(1),
    textAlign: 'center',
  },
  productPrice: {
    fontSize: RFValue(12),
    fontFamily: Fonts.Bold,
    marginTop: hp(0.5),
  },
});
