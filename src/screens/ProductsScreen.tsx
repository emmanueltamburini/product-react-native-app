import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {ProductContext} from '../context/ProductContext';
import {Product} from '../interfaces/appInterfaces';
import {ThemeText} from '../components/ThemeText';
import {ItemSeparator} from '../components/ItemSeparator';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductStackParams} from '../navigator/ProductsNavigator';
import {TouchableIcon} from '../components/TouchableIcon';
import {ThemeContext} from '../context/ThemeContext';

interface Props
  extends StackScreenProps<ProductStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {theme} = useContext(ThemeContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {products, loadProducts, refreshProducts} = useContext(ProductContext);
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
        color={theme.colors.text}
        style={styles.headerRightItem}
        onPress={() => navigation.navigate('ProductScreen', {})}
      />
    );
  };

  const refreshProductsFunction = async () => {
    setIsRefreshing(true);
    await refreshProducts();
    setIsRefreshing(false);
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
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshProductsFunction}
            progressViewOffset={10}
            progressBackgroundColor={theme.colors.primary}
            colors={['white', 'red', 'orange']}
            tintColor={theme.colors.text}
            title="Refreshing"
            titleColor={theme.colors.text}
          />
        }
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
