import React from 'react';
import { View, ViewStyle, DimensionValue } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius, style }) => {
  return (
    <SkeletonPlaceholder borderRadius={borderRadius || 4}>
      <View
        style={[
          {
            width: width || '100%',
            height: height || 20,
            borderRadius: borderRadius || 4,
          },
          style,
        ]}
      />
    </SkeletonPlaceholder>
  );
};

export default Skeleton;
