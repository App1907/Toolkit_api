import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Images} from '../../assets';
import { useSelector } from 'react-redux';

type head = {
  heading: string | undefined;
  desc?: string | undefined;
  img: boolean;
  onPress?: any,
  callWishlist?:any,
  callCart?:any,
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const Header = ({heading, desc, img, onPress, callWishlist, callCart}: head) => {
    const wishlistProducts = useSelector((state) => state.mainapi.wishlistProducts); 
    const cartProducts = useSelector((state) => state.mainapi.cartProducts); 

    const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);


  return (
    <View style={styles.headerCont}>
      {img ? (
        <TouchableOpacity style={styles.prevCont} onPress={onPress}>
          <Image source={Images.back} style={styles.previous} />
        </TouchableOpacity>
      ) : null}

     
      <View style={img?styles.header: styles.header2}>
        <Text style={styles.fliptext}>{heading}</Text>
        {/* <Text style={styles.subtext}>{desc}</Text> */}
      </View>
 
      <View style={styles.cartView}>
        <TouchableOpacity style={styles.cartBox} onPress={callCart}>
            <Image source={Images.cart} style={styles.cart}/>
            {cartProducts.length>0?(  <View style={styles.wishlistCountCont}>
              <Text style={styles.wishlistCount}>{cartProducts.length}</Text>
            </View>):null}
        </TouchableOpacity>

        <TouchableOpacity style={styles.wishlistBox} onPress={callWishlist}>
            <Image source={Images.wishlist} style={styles.wishlist}/>
            {wishlistProducts.length>0?(<View style={styles.wishlistCountCont}>
              <Text style={styles.wishlistCount}>{wishlistProducts.length}</Text>
            </View>):null}
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerCont: {
    flexDirection: 'row',
    backgroundColor: '#37AFE1',
    paddingVertical: 20,
    marginBottom: 10,
    paddingTop: SCREEN_WIDTH > 400 ? 60 : 30,
    paddingHorizontal:20,
  },
  header: {
    flex: 1,
    alignItems:'center',
    paddingLeft:30
  },
  header2: {
    flex: 1,
    alignItems:'center',
    paddingLeft:70,
  },
  fliptext: {
    fontSize: SCREEN_WIDTH > 400 ? 25 : 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  subtext: {
    fontSize: SCREEN_WIDTH > 400 ? 15 : 12,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
  },
  previous: {
    width: SCREEN_WIDTH > 400 ? 35 : 30,
    height: SCREEN_WIDTH > 400 ? 35 : 30,
  },
  prevCont: {
    justifyContent: 'flex-end',
  },
  wishlist:{
    height:35,
    width:35,
  },
  cart:{
    height:35,
    width:35,
  },
  cartView:{
    flexDirection:'row',
    gap:10
  },
  cartBox:{
    justifyContent:'flex-end'
},
wishlistBox:{
    flexDirection:'row',
    alignItems:'flex-end',
},
wishlistCount:{
    color:'#FFFFFF',
},
wishlistCountCont:{
    borderRadius: 20,
    backgroundColor:'#859F3D',
    padding:5,
    position:'absolute',
    top: -15,
    right:-10,
}
});
