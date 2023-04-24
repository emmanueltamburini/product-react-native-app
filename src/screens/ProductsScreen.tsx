import React, {useContext, useEffect, useRef} from 'react';
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
import {StackScreenProps} from '@react-navigation/stack';
import {ProductStackParams} from '../navigator/ProductsNavigator';
import {TouchableIcon} from '../components/TouchableIcon';

interface Props
  extends StackScreenProps<ProductStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductContext);
  const styles = stylesFunction();

  const renderItem = (product: Product) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('ProductScreen', {
            id: product.id,
            name: product.name,
          })
        }>
        <ThemeText style={styles.productItemName}>{product.name}</ThemeText>
      </TouchableOpacity>
    );
  };

  const renderSeparatorItem = () => {
    return <ItemSeparator />;
  };

  const renderHeaderRightItem = () => {
    return (
      <TouchableIcon
        name="add-outline"
        size={35}
        style={styles.headerRightItem}
        onPress={() => navigation.navigate('ProductScreen', {})}
      />
    );
  };

  const renderHeaderRightItemStatic = useRef(renderHeaderRightItem);

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRightItemStatic.current,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={p => p.id}
        renderItem={({item}) => renderItem(item)}
        onEndReachedThreshold={0.5}
        onEndReached={loadProducts}
        ItemSeparatorComponent={renderSeparatorItem}
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
    headerRightItem: {
      marginRight: 10,
    },
  });
