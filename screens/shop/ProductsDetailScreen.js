import React from 'react';
import {ScrollView,View,Text,Image,Button,StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

//Constants
import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));

    console.log('title',props.navigation.getParam('productTitle'))
    console.log(selectedProduct);
    console.log(productId);
    return (
        <ScrollView>
            <Image style={styles.image} source={{uri:selectedProduct.imageUrl}} />
            <View style={styles.action}>
                <Button color={Colors.primary} title={"Add To Cart"} onPress ={()=>{console.log("CaRT")}}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width:"100%",
        height:300
    },
    action: {
        marginVertical: 10,
        alignItems:'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign:"center",
        marginVertical: 20
    },
    description: {
        fontSize:14,
        textAlign:"center",
        marginHorizontal:20
    }

});

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle : navData.navigation.getParam("productTitle")
    }
}

export default ProductDetailScreen;