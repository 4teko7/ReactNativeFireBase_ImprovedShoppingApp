import React from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.action}>
                <Button color={Colors.primary} title="Show Details"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        margin:20,
        padding:10
    },
    summary: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:"center",
        width:"100%",
        padding:10
    },
    action:{
        display:"flex",
        alignItems:"center",
        width:"100%"
    },
    totalAmount: {
        fontFamily:"Courgette",
        fontSize:16
    },
    date: {
        fontFamily:"Courgette",
        fontSize: 16,
        color:"#888"
    }
});

export default OrderItem;