import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductsAction} from '../../redux/config/configAction';
import {toggleWishlist, plus, minus, removeFromCart } from '../../redux/config/configSlice';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/header';


const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);  
  const [isAtBottom, setIsAtBottom] = useState(false);
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList<any>>(null);
  const apidata = useSelector((state: any) => {
    return state.mainapi.products;
  });
  const wishlistProducts = useSelector((state: any) => {
    return state.mainapi.wishlistProducts;
  });

  const cartProducts = useSelector((state: any) => state.mainapi.cartProducts);

  const isLoading = useSelector((state: any) => {
    return state.mainapi.isLoading;
  });

  const gotoProduct = item => {
    Navigation.navigate('Product', {data: item});
  };

  const gotoWishlist = () => {
    Navigation.navigate('Wishlist');
  };

  const gotoCart = () => {
    Navigation.navigate('Cart');
  };

  const addToWishlist = item => {
    dispatch(toggleWishlist(item));
  };

  const isItemInWishlist = itemId => {
    return wishlistProducts.some(product => product.id === itemId);
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


  const fetchProducts = async () => {
    setRefreshing(true);
    await dispatch(getProductsAction());
    setRefreshing(false);
  };

  const renderItem = ({item, index}: {item: any; index: any}) => {
    const isInWishlist = isItemInWishlist(item.id);
    const productInCart = cartProducts.find(product => product.id === item.id);

    return (
      <TouchableOpacity
        style={styles.listinside}
        onPress={() => gotoProduct(item)}>x
        <View style={styles.imgCont}>x
          <TouchableOpacity
            style={styles.likeCont}
            onPress={() => addToWishlist(item)}>
            <Image
              source={isInWishlist ? Images.heartFilled : Images.heart}
              style={styles.like}
            />
          </TouchableOpacity>
          <Image source={{uri: item.image}} style={styles.img} />
        </View>
        <View style={styles.secondCont}>
          <Text numberOfLines={8} style={styles.titletext}>
            {item.title}
          </Text>
          <Text style={styles.pricetext}>₹{item.price}</Text>
          <View style={styles.ratingview}>
            {/* <Text style={styles.ratetext}>{item.rating.rate} ★</Text> */}
            <Text style={styles.counttext}>({item.rating.count}+ Reviews)</Text>
          </View>
          {/* <Text numberOfLines={5}>{item.description}</Text> */}


          {productInCart ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => removeItem(item)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove From Cart</Text>
              </TouchableOpacity>

              <View style={styles.quantitysubContainer}>
              <TouchableOpacity onPress={() => decrementQuantity(item)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{productInCart.quantity}</Text>
              <TouchableOpacity onPress={() => addToCart(item)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
              </View>
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

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);
  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  const handleScroll = (event:any) => {
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
      {!isAtTop && ( <TouchableOpacity style={styles.upButton} onPress={scrollToTop}>
        <Image source={Images.up} style={styles.up} />
      </TouchableOpacity>)}
      {!isAtBottom && (<TouchableOpacity onPress={scrollToBottom} style={styles.downButton}>
        <Image source={Images.down} style={styles.down} />
      </TouchableOpacity>)}
      
      {apidata.length === 0 ? (
        <Text style={styles.emptyText}>
          TyagiMart list is empty!
        </Text>
      ) : (
        <FlatList
          data={apidata}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          onScroll={handleScroll}
          ListFooterComponent={<View style={{height: 50}}></View>}
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
    marginVertical: 10,
    backgroundColor: '#D4BEE4',
    borderRadius: 15,

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  titletext: {
    fontSize: 17,
    fontWeight: '800',
  },
  ratetext: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#608BC1',
    borderRadius: 10,
    marginRight: 5,
    padding: 3,
  },
  pricetext: {
    fontSize: SCREEN_WIDTH > 400 ? 25 : 22,
    fontWeight: '600',
    color: '#000000',
    marginTop: 10,
  },

  ratingview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  counttext: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000000',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cartbutton: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'orange',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    margin: 10,
  },

  imgCont: {
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    // backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // elevation: 1,
  },
  likeCont: {
    alignItems: 'flex-start',
    marginTop: 5,
  },
  like: {
    width: 25,
    height: 25,
  },
  img: {
    height: SCREEN_WIDTH > 400 ? 200 : 150,
    width: SCREEN_WIDTH > 400 ? 100 : 80,
    resizeMode: 'contain',
  },
  secondCont: {
    flex: 2,
    paddingHorizontal: 10,
  },


  removeButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    // paddingVertical: SCREEN_WIDTH > 400 ? 13 : 10,
    paddingHorizontal: 5,
    margin: 10,
    // marginTop: 40,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: SCREEN_WIDTH > 400 ? 18 : 16,
  },
  quantitysubContainer:{
    flexDirection: 'row',
    alignItems: 'center',

  },
  quantityContainer: {
    flexDirection: 'column',
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
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  up: {
    width: 30,
    height: 30,
  },
  upButton: {
    backgroundColor: 'white',
    // width: 35,
    // height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 150,
    zIndex: 2,
    // borderTopEndRadius:20,
    // borderTopStartRadius:20,
  },
  down: {
    width: 30,
    height: 30,
  },
  downButton: {
    backgroundColor: 'white',
    // width: 35,
    // height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomEndRadius:20,
    // borderBottomStartRadius:20,
    position: 'absolute',
    right: 20,
    bottom: 50,
    zIndex: 2,
  },
});
