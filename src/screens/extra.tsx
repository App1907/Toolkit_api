import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/header';
import { getProductsAction, toggleWishlist, plus, minus, removeFromCart } from '../../redux/config/configSlice';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const flatListRef = useRef(null);

  const apidata = useSelector((state: any) => state.mainapi.products);
  const wishlistProducts = useSelector((state: any) => state.mainapi.wishlistProducts);
  const cartProducts = useSelector((state: any) => state.mainapi.cartProducts);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);

  const fetchProducts = () => {
    setRefreshing(true);
    dispatch(getProductsAction()).then(() => setRefreshing(false));
  };

  const gotoWishlist = () => {
    navigation.navigate('Wishlist');
  };

  const gotoCart = () => {
    navigation.navigate('Cart');
  };

  const gotoProduct = (item) => {
    navigation.navigate('Individual', { data: item });
  };

  const isInWishlist = (itemId) => {
    return wishlistProducts.some(product => product.id === itemId);
  };

  const addToWishlist = (item) => {
    dispatch(toggleWishlist(item));
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

  const renderItem = ({ item }) => {
    const productInCart = cartProducts.find(product => product.id === item.id);

    return (
      <TouchableOpacity
        style={styles.listinside}
        onPress={() => gotoProduct(item)}>
        <View style={styles.imgCont}>
          <TouchableOpacity
            style={styles.likeCont}
            onPress={() => addToWishlist(item)}>
            <Image
              source={isInWishlist(item.id) ? Images.heartFilled : Images.heart}
              style={styles.like}
            />
          </TouchableOpacity>
          <Image source={{ uri: item.image }} style={styles.img} />
        </View>
        <View style={styles.secondCont}>
          <Text numberOfLines={8} style={styles.titletext}>
            {item.title}
          </Text>
          <Text style={styles.pricetext}>₹{item.price}</Text>
          <View style={styles.ratingview}>
            <Text style={styles.counttext}>({item.rating.count}+ Reviews)</Text>
          </View>

          {productInCart ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => removeItem(item)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove From Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => decrementQuantity(item)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{productInCart.quantity}</Text>
              <TouchableOpacity onPress={() => addToCart(item)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Text style={styles.cartbutton}>Add To Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    setIsAtTop(offsetY === 0);
    setIsAtBottom(offsetY + layoutHeight >= contentHeight);
  };

  return (
    <View style={styles.container}>
      <Header
        heading={'TyagiMart'}
        desc={'Find appropriate items for yourself!'}
        img={false}
        callWishlist={gotoWishlist}
        callCart={gotoCart}
      />
      {!isAtTop && (
        <TouchableOpacity style={styles.upButton} onPress={scrollToTop}>
          <Image source={Images.up} style={styles.up} />
        </TouchableOpacity>
      )}
      {!isAtBottom && (
        <TouchableOpacity onPress={scrollToBottom} style={styles.downButton}>
          <Image source={Images.down} style={styles.down} />
        </TouchableOpacity>
      )}
      {apidata.length === 0 ? (
        <Text style={styles.emptyText}>TyagiMart list is empty!</Text>
      ) : (
        <FlatList
          data={apidata}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          onScroll={handleScroll}
          ListFooterComponent={<View style={{ height: 50 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchProducts} />
          }
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listinside: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imgCont: {
    alignItems: 'center',
  },
  img: {
    height: SCREEN_WIDTH > 400 ? 300 : 200,
    width: 300,
    resizeMode: 'contain',
  },
  secondCont: {
    alignItems: 'center',
  },
  titletext: {
    fontSize: SCREEN_WIDTH > 400 ? 20 : 17,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
  },
  pricetext: {
    fontSize: SCREEN_WIDTH > 400 ? 25 : 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginTop: 10,
  },
  ratingview: {
    flexDirection: 'row',
  },
  counttext: {
    fontSize: SCREEN_WIDTH > 400 ? 20 : 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
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
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
  },
  upButton: {
    position: 'absolute',
    bottom: 80,
    right: 10,
  },
  downButton: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  up: {
    height: 50,
    width: 50,
  },
  down: {
    height: 50,
    width: 50,
  },
});
