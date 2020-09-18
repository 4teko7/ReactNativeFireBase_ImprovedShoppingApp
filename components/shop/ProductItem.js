import React from 'react';
import {View,Text,Image,StyleSheet,Button,TouchableOpacity,TouchableNativeFeedback, Platform} from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style = {styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp useForeground onPress={props.onViewDetail}>
                    <View>
                        <View style={styles.parenOfImage}>
                            <Image source={{uri: props.image}} style={styles.image}/>
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.action}>
                            {props.children}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height: 300,
        margin:20,
    },
    touchable: {
        borderRadius:10,
        overflow:"hidden"

    },
    parenOfImage:{
        width: "100%",
        height:"60%"
    },
    image: {
        height:"100%",
        width:"100%"
    },
    detail: {
        alignItems:"center",
        height:"15%",
        padding:10
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily:'Courgette'
    },
    price: {
        fontSize:14,
        color:"#888"
    },
    action: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:"25%",
        paddingHorizontal:20
    }
});

export default ProductItem;