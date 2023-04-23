import React, {useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ProductContext} from '../context/ProductContext';
import {Product} from '../interfaces/appInterfaces';
import {ThemeText} from '../components/ThemeText';
import {ItemSeparator} from '../components/ItemSeparator';

export const ProductsScreen = () => {
  const {products, loadProducts} = useContext(ProductContext);
  const styles = stylesFunction();

  const renderItem = (product: Product) => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <ThemeText style={styles.productItemName}>{product.name}</ThemeText>
      </TouchableOpacity>
    );
  };

  const renderItemSeparator = () => {
    return <ItemSeparator />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={p => p.id}
        renderItem={({item}) => renderItem(item)}
        onEndReachedThreshold={0.5}
        onEndReached={loadProducts}
        ItemSeparatorComponent={renderItemSeparator}
      />
    </SafeAreaView>
  );
};

const stylesFunction = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 10,
    },
    productItemName: {
      fontSize: 20,
    },
  });
