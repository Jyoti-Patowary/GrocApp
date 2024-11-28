import React, { FC, useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '@utils/Scaling';
import { imageData } from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';


const ProductSlider: FC = () => {
  const rows = useMemo(() => {
    const results = [];
    for (let i = 0; i < imageData.length; i += 4) {
      results.push(imageData.slice(i, i + 4));
    }
    return results;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000}>
        <View style={styles.gridContainer}>
          {rows?.map((row: any, rowIndex: number) => {
            return(
            <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex}/>
            );
            })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({ row, rowIndex }) => {
    const hozirontalShift = rowIndex % 2 === 0 ? -18 : 18;
    return (
      <View style={styles.row}>
        {row.map((image, imageIndex) => (
          <View
            key={imageIndex}
            style={[
              styles.itemContainer,
              { transform: [{ translateX: hozirontalShift }] },
            ]}
          >
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </View>
    );
  };

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 12,
    marginTop: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.22,
    height: screenHeight * 0.12,
    backgroundColor: '#e9f7f8',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  autoScroll: {
    position: 'absolute',
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: 'center',
    overflow: 'visible',
    alignItems: 'center',
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default ProductSlider;