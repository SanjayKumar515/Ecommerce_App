import React, { memo } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import styles from './CategoryHeader.style';
import { Images } from '../../constant';

const CategoryHeader = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  theme,
  categoryImages,
  FALLBACK_CAT_IMG,
  Fonts,
}: {
  categories: any;
  selectedCategory: any;
  setSelectedCategory: any;
  theme: any;
  categoryImages: any;
  FALLBACK_CAT_IMG: any;
  Fonts: any;
}) => {
  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedCategory === item.slug;

    return (
      <Pressable
        style={styles.topTabItem}
        onPress={() => setSelectedCategory(item.slug)}
      >
        <Image
          source={
            categoryImages[item.slug]
              ? { uri: categoryImages[item.slug] }
              : Images.ic_allItem
          }
          style={styles.catIcon}
        />

        <Text
          numberOfLines={1}
          style={[
            styles.catLabel,
            {
              color: isSelected ? theme.colors.primary : '#666',
              fontFamily: isSelected ? Fonts.Bold : Fonts.Medium,
            },
          ]}
        >
          {item.name}
        </Text>

        {/* 🔥 Active underline like Flipkart */}
        {isSelected && <View style={styles.activeIndicator} />}
      </Pressable>
    );
  };

  return (
    <View style={styles.headerContainer}>
      <FlatList
        data={categories}
        keyExtractor={item => item.slug}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topTabScroll}
      />
    </View>
  );
};

export default memo(CategoryHeader);
