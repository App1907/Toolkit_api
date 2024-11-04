import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/header';
import { Images } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, plus, minus, removeFromCart } from '../../redux/config/configSlice';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Individual = () => {
  const route = useRoute();
  const { data } = route.params;
  const Navigation = useNavigation();

  const wishlistProducts = useSelector((state: any) => {
    return state.mainapi.wishlistProducts;
  });

  const cartProducts = useSelector((state: any) => {
    return state.mainapi.cartProducts;
  })
  const dispatch = useDispatch();

  const goback = () => {
    Navigation.goBack();
  };

  const gotoWishlist = () => {
    Navigation.navigate('Wishlist');
  }

  const gotoCart = () => {
    Navigation.navigate('Cart');
  }

  const isInWishlist = (itemId) => {
    return wishlistProducts.some(product => product.id === itemId);
  };

  const addToWishlist = (item) => {
    dispatch(toggleWishlist(item))
  };

  const addToCart = (item) => {
    dispatch(plus(item));
  };

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const decrementQuantity = (item) => {
    dispatch(minus(item));
  };



  const productInCart = cartProducts.find(product => product.id === data.id);
  console.log(data);

  return (
    <View style={styles.container}>
      <Header
        heading={'TyagiMart'}
        desc={'What would you like to purchase?'}
        img={true}
        onPress={goback}
        callWishlist={gotoWishlist}
        callCart={gotoCart}
      />
      <View style={styles.listinside}>
        <TouchableOpacity style={styles.likeCont} onPress={() => addToWishlist(data)}>
          <Image
            source={isInWishlist(data.id) ? Images.heartFilled : Images.heart}
            style={styles.like}
          />
        </TouchableOpacity>
        <Image style={styles.img} source={{ uri: data.image }} alt={'Unloaded image'} />
        <Text style={styles.titletext} numberOfLines={5}>
          {data.title}
        </Text>
        <Text style={styles.pricetext}>₹{data.price}</Text>
        <View style={styles.ratingview}>
          <Text style={styles.ratetext}>{data.rating.rate} ★</Text>
          <Text style={styles.counttext}>{data.rating.count}+ Reviews</Text>
        </View>
        <Text style={styles.textdescription} numberOfLines={12}>
          {data.description}
        </Text>
        {productInCart ? (
          <View style={styles.quantityContainer}>

            <TouchableOpacity onPress={() => removeItem(data)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove From Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => decrementQuantity(data)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{productInCart.quantity}</Text>
            <TouchableOpacity onPress={() => addToCart(data)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>

          </View>
        ) : (
          <TouchableOpacity onPress={() => addToCart(data)}>
            <Text style={styles.cartbutton}>Add To Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Individual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  listinside: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    // backgroundColor: 'white',
    // borderRadius: 15,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  img: {
    height: SCREEN_WIDTH > 400 ? 300 : 200,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titletext: {
    fontSize: SCREEN_WIDTH > 400 ? 20 : 17,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
  },
  ratetext: {
    fontSize: SCREEN_WIDTH > 400 ? 20 : 17,
    fontWeight: '800',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#608BC1',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  pricetext: {
    fontSize: SCREEN_WIDTH > 400 ? 25 : 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    marginTop: 10,
  },
  textdescription: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: SCREEN_WIDTH > 400 ? 15 : 10,
    color: 'gray',
  },
  ratingview: {
    flexDirection: 'row',
  },
  counttext: {
    fontSize: SCREEN_WIDTH > 400 ? 20 : 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000000',
    margin: 10,
  },
  cartbutton: {
    fontSize: SCREEN_WIDTH > 400 ? 18 : 16,
    backgroundColor: '#4CC9FE',
    borderRadius: 20,
    paddingVertical: SCREEN_WIDTH > 400 ? 13 : 10,
    paddingHorizontal: SCREEN_WIDTH > 400 ? 25 : 22,
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  fliptext: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
  },
  subtext: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
  },
  likeCont: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  like: {
    width: 35,
    height: 35,
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    paddingVertical: SCREEN_WIDTH > 400 ? 13 : 10,
    paddingHorizontal: SCREEN_WIDTH > 400 ? 25 : 22,
    margin: 10,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: SCREEN_WIDTH > 400 ? 18 : 16,

  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    fontSize: SCREEN_WIDTH > 400 ? 18 : 16,
    padding: 10,
    backgroundColor: '#88C273',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: SCREEN_WIDTH > 400 ? 18 : 16,
    marginHorizontal: 10,
  },
});
