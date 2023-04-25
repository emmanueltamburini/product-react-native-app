import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductStackParams} from '../navigator/ProductsNavigator';
import {ThemeText} from '../components/ThemeText';
import {ThemeContext} from '../context/ThemeContext';
import {ThemeState} from '../context/themeReducer';
import {ThemeButton} from '../components/ThemeButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {useCategory} from '../hooks/useCategory';
import {useForm} from '../hooks/useForm';
import {ProductContext} from '../context/ProductContext';
import {FadeInImage} from '../components/FadeInImage';
import {TouchableIcon} from '../components/TouchableIcon';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  const {theme} = useContext(ThemeContext);
  const {
    loadProduct,
    addProducts,
    updateProducts,
    deleteProducts,
    uploadImage,
  } = useContext(ProductContext);

  const {categories, isLoading} = useCategory();
  const [tempUri, setTempUri] = useState<string>();
  const {id, name, category, image, onChange, setFormValue} = useForm({
    id: route.params.id ? route.params.id : '',
    name: route.params.name ? route.params.name : '',
    category: '',
    image: '',
  });

  const categoryRef = useRef('');
  const styles = stylesFunction(theme);

  const loadCurrentProduct = async () => {
    if (route.params.id) {
      const product = await loadProduct(route.params.id);
      setFormValue({
        id,
        name,
        category: product?.category._id ? product?.category._id : '',
        image: product?.image ? product?.image : '',
      });
      categoryRef.current = product?.category._id ? product?.category._id : '';
    }
  };

  const deleteItem = async () => {
    const resp = await deleteProducts(id);
    if (!resp.message) {
      Alert.alert(
        'Delete product',
        'Product has deleted',
        [{text: 'Ok', onPress: () => navigation.navigate('ProductsScreen')}],
        {
          cancelable: true,
          onDismiss: () => navigation.navigate('ProductsScreen'),
        },
      );
    } else {
      Alert.alert('Something was wrong', resp.message);
    }
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      const resp = await updateProducts({category, name, id});
      Alert.alert(
        resp.message ? 'Bad data' : 'Product updated',
        resp.message ? resp.message : 'Your product has updated',
      );
    } else {
      const resp = await addProducts({category, name});
      Alert.alert(
        resp.message ? 'Bad data' : 'Product created',
        resp.message ? resp.message : 'Your product has created',
      );

      onChange(resp.id, 'id');
    }
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      async resp => {
        if (resp.didCancel) {
          return;
        }

        if (!resp.assets || !resp.assets[0].uri) {
          return;
        }

        setTempUri(resp.assets[0].uri);

        const response = await uploadImage(resp, id);

        if (response.message) {
          Alert.alert('Something was wrong', response.message);
        }
      },
    );
  };

  const selectPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      async resp => {
        if (resp.didCancel) {
          return;
        }

        if (!resp.assets || !resp.assets[0].uri) {
          return;
        }

        setTempUri(resp.assets[0].uri);

        const response = await uploadImage(resp, id);

        if (response.message) {
          Alert.alert('Something was wrong', response.message);
        }
      },
    );
  };

  const showDeleteAlert = () =>
    Alert.alert(
      'Delete product',
      'Do you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Confirm', onPress: deleteItem},
      ],
      {
        cancelable: true,
      },
    );

  const renderHeaderRightItem = () => {
    return (
      <TouchableIcon
        name="trash-outline"
        size={25}
        color={theme.colors.text}
        style={styles.headerRightItem}
        onPress={showDeleteAlert}
      />
    );
  };

  const renderHeaderRightItemStatic = useRef(renderHeaderRightItem);
  const loadCurrentProductStatic = useRef(loadCurrentProduct);
  const onChangeStatic = useRef(onChange);

  useEffect(() => {
    loadCurrentProductStatic.current();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && categoryRef.current === '') {
      const categoryValue = categories[0].id ? categories[0].id : '';
      onChangeStatic.current(categoryValue, 'category');
      categoryRef.current = categoryValue;
    }
  }, [categories]);

  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'Product name',
    });
  }, [navigation, name]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: id ? renderHeaderRightItemStatic.current : undefined,
    });
  }, [navigation, id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ThemeText style={styles.label}>Product name</ThemeText>
        <TextInput
          placeholder="Product"
          style={styles.textInput}
          placeholderTextColor={theme.opacityContrastColor}
          value={name}
          onChangeText={value => onChange(value, 'name')}
        />

        <ThemeText style={styles.label}>Category</ThemeText>
        {isLoading ? (
          <ActivityIndicator
            size={50}
            color={theme.colors.text}
            style={styles.loading}
          />
        ) : (
          <Picker
            style={styles.picker}
            selectedValue={category}
            onValueChange={value => onChange(value, 'category')}>
            {categories.map(currentCategory => (
              <Picker.Item
                key={currentCategory.id}
                label={currentCategory.name}
                value={currentCategory.id}
              />
            ))}
          </Picker>
        )}

        <ThemeButton
          title="Save"
          onPress={saveOrUpdate}
          style={styles.button}
          textStyle={styles.buttonText}
        />

        {id.length > 0 && (
          <View style={styles.buttonsContainer}>
            <ThemeButton
              title={
                <View style={styles.buttonIcon}>
                  <ThemeText style={styles.buttonText}>Camera </ThemeText>
                  <Icon name="camera-outline" size={25} color="white" />
                </View>
              }
              onPress={takePhoto}
              style={styles.innerButton}
            />
            <View style={styles.spacer} />
            <ThemeButton
              title={
                <View style={styles.buttonIcon}>
                  <ThemeText style={styles.buttonText}>Gallery </ThemeText>
                  <Icon name="albums-outline" size={25} color="white" />
                </View>
              }
              onPress={selectPhoto}
              style={styles.innerButton}
            />
          </View>
        )}

        {!!image && !tempUri && (
          <FadeInImage
            uri={image}
            style={styles.image}
            containerStyle={styles.imageContainer}
          />
        )}

        {!!tempUri && (
          <FadeInImage
            uri={tempUri}
            style={styles.image}
            containerStyle={styles.imageContainer}
          />
        )}
      </ScrollView>
    </View>
  );
};

const stylesFunction = (theme: ThemeState) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
      marginHorizontal: 20,
    },
    label: {
      fontSize: 18,
      marginVertical: 15,
    },
    textInput: {
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      borderColor: theme.opacityContrastColor,
      height: 45,
      color: theme.colors.text,
    },
    button: {
      width: '100%',
    },
    buttonText: {
      color: 'white',
    },
    buttonIcon: {
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonsContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    spacer: {
      width: 15,
    },
    innerButton: {
      flex: 1,
    },
    picker: {
      color: theme.colors.text,
    },
    loading: {
      marginBottom: 20,
    },
    imageContainer: {
      marginHorizontal: 10,
      maxHeight: 200,
      marginTop: 30,
    },
    image: {
      width: '100%',
      maxHeight: 200,
      borderRadius: 10,
      marginHorizontal: 10,
    },
    headerRightItem: {
      marginRight: 10,
    },
  });
