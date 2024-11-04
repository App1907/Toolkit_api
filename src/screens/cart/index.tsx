import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { plus, minus, removeFromCart } from '../../redux/config/configSlice'; 
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.mainapi.cartProducts); 
  const Navigation = useNavigation(); 

  const gotoWishlist=()=>{
    Navigation.navigate('Wishlist');
  }
  const gotoCart=()=>{
    Navigation.navigate('Cart');
  }
  const goback = () => {
    Navigation.goBack();
  };
  const gotoProduct = item => {
    Navigation.navigate('Product', {data: item});
  };
  const removeItem = (item) =>{
    dispatch(removeFromCart(item));
  };
  const addToCart=(item)=>{
    dispatch(plus(item));
  };
  const decrementQuantity = (item) =>{
    dispatch(minus(item));
  };

  const renderItem = ({ item }) => {
    const productInCart = cartProducts.find(product => product.id === item.id);

    return(
    <TouchableOpacity style={styles.itemContainer} onPress={()=>gotoProduct(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => removeItem(item)} style={styles.removeButton}>
              <Text style={styles.removeButton}>Remove From Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => decrementQuantity(item)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{productInCart.quantity}</Text>
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
      </View>
    </TouchableOpacity>
  )};

  return (
    <View style={styles.container}>
      <Header
        heading={'Cart'}
        desc={'Order now!'}
        img={true}
        callWishlist={gotoWishlist}
        callCart={gotoCart}
        onPress={goback}
      />
      {cartProducts.length === 0 ? (
        <Text style={styles.emptyText}>The cart is empty!</Text>
      ) : (
        <FlatList
          data={cartProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: '#000000',
  },
  removeButton: {
    color: 'red',
    marginTop: 5,
    marginRight:10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    paddingHorizontal: SCREEN_WIDTH > 400 ? 8 : 7,
    paddingVertical: SCREEN_WIDTH > 400 ? 6 : 5,
    backgroundColor: '#88C273',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: SCREEN_WIDTH > 400 ? 18 : 16,
    marginHorizontal: 10,
  },
});

export default Cart;
