import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  ActivityIndicator,
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

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  const {theme} = useContext(ThemeContext);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const {loadProduct} = useContext(ProductContext);
  const styles = stylesFunction(theme);

  const {categories, isLoading} = useCategory();
  const {id, name, category, image, onChange, setFormValue, form} = useForm({
    id: route.params.id ? route.params.id : '',
    name: route.params.name ? route.params.name : '',
    category: '',
    image: '',
  });

  const loadCurrentProduct = async () => {
    if (route.params.id) {
      const product = await loadProduct(route.params.id);
      setFormValue({
        id,
        name,
        category: product?.category.id ? product?.category.id : '',
        image: product?.image ? product?.image : '',
      });
    }
  };

  const loadCurrentProductStatic = useRef(loadCurrentProduct);

  useEffect(() => {
    loadCurrentProductStatic.current();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.name ? route.params.name : 'New Product',
    });
  }, [navigation, route]);

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
            selectedValue={selectedLanguage}
            onValueChange={itemValue => setSelectedLanguage(itemValue)}>
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
          onPress={() => {}}
          style={styles.button}
          textStyle={styles.buttonText}
        />

        <View style={styles.buttonsContainer}>
          <ThemeButton
            title={
              <View style={styles.buttonIcon}>
                <ThemeText style={styles.buttonText}>Camera </ThemeText>
                <Icon name="camera-outline" size={25} color="white" />
              </View>
            }
            onPress={() => {}}
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
            onPress={() => {}}
            style={styles.innerButton}
          />
        </View>
        <ThemeText>{JSON.stringify(form, null, 5)}</ThemeText>
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
      marginTop: 10,
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
  });
