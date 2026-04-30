import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { API } from '../../../api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts } from '../../../constant';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Skeleton } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { addToCart } from '../../../redux/features/CartSlice';
import { toggleWishlist } from '../../../redux/features/WishlistSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

const FALLBACK_IMG = 'https://cdn-icons-png.flaticon.com/512/679/679821.png';


const CategoryScreen = () => {
  const [ categories, setCategories ] = useState<any[]>( [] );
  const [ selectedCategory, setSelectedCategory ] = useState<string>( '' );
  const [ products, setProducts ] = useState<any[]>( [] );
  const [ isLoading, setIsLoading ] = useState<boolean>( false );
  // Dynamically fetched thumbnail for each category (slug -> image URL)
  const [ categoryImages, setCategoryImages ] = useState<Record<string, string>>( {} );
  const theme = useTheme();
  const { navigate } = useNavigation();

  useEffect( () => {
    fetchCategories();
  }, [] );

  useEffect( () => {
    if ( selectedCategory ) {
      fetchProductsByCategory( selectedCategory );
    }
  }, [ selectedCategory ] );

  const fetchCategories = async () => {
    try {
      const res = await API.get( 'products/categories' );
      // DummyJSON can return strings or objects depending on version
      const parsed = res.data.map( ( item: any ) =>
        typeof item === 'string' ? { slug: item, name: item } : item
      );
      setCategories( parsed );
      if ( parsed.length > 0 ) {
        setSelectedCategory( parsed[ 0 ].slug );
      }
      // Fetch the first product thumbnail for each category in parallel
      fetchCategoryImages( parsed );
    } catch ( err ) {
      console.log( 'Error fetching categories:', err );
    }
  };

  // Fires parallel limit=1 requests to get a real product thumbnail per category
  const fetchCategoryImages = async ( cats: any[] ) => {
    const results = await Promise.allSettled(
      cats.map( ( cat: any ) =>
        API.get( `products/category/${ cat.slug }?limit=1` ),
      ),
    );
    const imageMap: Record<string, string> = {};
    results.forEach( ( result, i ) => {
      if ( result.status === 'fulfilled' ) {
        const firstProduct = result.value.data?.products?.[ 0 ];
        if ( firstProduct?.thumbnail ) {
          imageMap[ cats[ i ].slug ] = firstProduct.thumbnail;
        }
      }
    } );
    setCategoryImages( imageMap );
  };

  const fetchProductsByCategory = async ( slug: string ) => {
    setIsLoading( true );
    try {
      const res = await API.get( `products/category/${ slug }` );
      setProducts( res.data.products );
    } catch ( err ) {
      console.log( 'Error fetching category products:', err );
    } finally {
      setIsLoading( false );
    }
  };

  const renderCategoryItem = ( { item }: { item: any } ) => {
    const isSelected = item.slug === selectedCategory;
    // Use real product thumbnail from API, fall back to placeholder
    const imageUri = categoryImages[ item.slug ] ?? FALLBACK_IMG;

    return (
      <Pressable
        style={ [
          styles.categoryBtn,
          {
            backgroundColor: isSelected
              ? theme.colors.surface
              : theme.colors.background,
            borderLeftColor: isSelected
              ? theme.colors.primary
              : 'transparent',
          },
        ] }
        onPress={ () => setSelectedCategory( item.slug ) }
      >
        <View
          style={ [
            styles.categoryImgWrapper,
            {
              backgroundColor: isSelected
                ? theme.colors.primaryContainer
                : theme.colors.surfaceVariant,
            },
          ] }
        >
          <Image
            source={ { uri: imageUri } }
            style={ styles.categoryImg }
          />
        </View>
        <Text
          style={ [
            styles.categoryText,
            {
              color: isSelected
                ? theme.colors.primary
                : theme.colors.onSurfaceVariant,
              fontFamily: isSelected ? Fonts.Bold : Fonts.Medium,
            },
          ] }
          numberOfLines={ 2 }
        >
          { item.name }
        </Text>
      </Pressable>
    );
  };

  const dispatch = useDispatch<AppDispatch>();
  const { wishlistData } = useSelector((state: RootState) => state.wishlist);

  const renderProductItem = ( { item }: { item: any } ) => {
    const isWishlisted = wishlistData.some(w => w.id === item.id);

    return (
      <Pressable
        style={ [ styles.productCard, { backgroundColor: theme.colors.surface } ] }
        //@ts-ignore
        onPress={ () => navigate( 'SingleProduct' as never, { Product: item } as never ) }
      >
        <Image source={ { uri: item.thumbnail } } style={ styles.productImg } />
        
        {/* Wishlist Icon */}
        <Pressable 
          style={styles.wishlistIcon}
          onPress={() => dispatch(toggleWishlist(item))}
        >
          <Icon 
            name={isWishlisted ? "heart" : "heart-outline"} 
            size={RFValue(16)} 
            color={isWishlisted ? "#E53935" : "#666"} 
          />
        </Pressable>

        <Text
          style={ [ styles.productTitle, { color: theme.colors.onSurface } ] }
          numberOfLines={ 2 }
        >
          { item.title }
        </Text>
        <View style={styles.priceRow}>
          <Text style={ [ styles.productPrice, { color: theme.colors.onSurface } ] }>
            ₹{ item.price }
          </Text>
          
          {/* Add to Cart Icon */}
          <Pressable 
            onPress={() => dispatch(addToCart({ ...item, quantity: 1 }))}
          >
            <Icon name="add-circle" size={RFValue(20)} color="#2874F0" />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const CategorySkeleton = () => (
    <View style={ styles.categoryBtn }>
      <Skeleton width={ wp( 12 ) } height={ wp( 12 ) } borderRadius={ wp( 6 ) } />
      <Skeleton width={ wp( 14 ) } height={ hp( 1.5 ) } style={ { marginTop: hp( 1 ) } } />
    </View>
  );

  const ProductSkeleton = () => (
    <View style={ [ styles.productCard, { backgroundColor: theme.colors.surface } ] }>
      <Skeleton width="100%" height={ hp( 10 ) } borderRadius={ wp( 2 ) } />
      <Skeleton width="80%" height={ hp( 1.5 ) } style={ { marginTop: hp( 1 ) } } />
      <Skeleton width="40%" height={ hp( 1.5 ) } style={ { marginTop: hp( 0.5 ) } } />
    </View>
  );

  return (
    <View
      style={ [
        styles.mainContainer,
        { backgroundColor: theme.colors.background },
      ] }
    >
      {/* Header */ }
      <View style={ [ styles.header, { backgroundColor: theme.colors.surface } ] }>
        <Text style={ [ styles.headerTitle, { color: theme.colors.onSurface } ] }>
          Categories
        </Text>
      </View>

      <View style={ styles.contentContainer }>
        {/* Left Sidebar */ }
        <View
          style={ [
            styles.sidebar,
            { backgroundColor: theme.colors.background },
          ] }
        >
          <FlatList
            data={ categories.length > 0 ? categories : [ 1, 2, 3, 4, 5, 6, 7, 8 ] }
            renderItem={ categories.length > 0 ? renderCategoryItem : () => <CategorySkeleton /> }
            keyExtractor={ ( item, index ) => categories.length > 0 ? item.slug : index.toString() }
            showsVerticalScrollIndicator={ false }
          />
        </View>

        {/* Right Content */ }
        <View
          style={ [ styles.rightPane, { backgroundColor: theme.colors.surface } ] }
        >
          <FlatList
            data={ isLoading ? [ 1, 2, 3, 4, 5, 6 ] : products }
            renderItem={ isLoading ? () => <ProductSkeleton /> : renderProductItem }
            keyExtractor={ ( item, index ) => isLoading ? index.toString() : item.id.toString() }
            numColumns={ 2 }
            showsVerticalScrollIndicator={ false }
            columnWrapperStyle={ styles.row }
            contentContainerStyle={ { padding: wp( 2 ) } }
          />
        </View>
      </View>
    </View>
  );
};

export default CategoryScreen;

