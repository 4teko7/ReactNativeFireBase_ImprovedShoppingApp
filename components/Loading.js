import React from 'react';
import {Text,View,StyleSheet,ActivityIndicator} from 'react-native';
import {absoluteCenter} from '../DATABASE';


export default function LoadingSpinner(props) {
    const {parentStyle,textStyle,size,color} = props;
    return (
        <View style={{...styles.loadingDiv,...parentStyle}}>
            <ActivityIndicator size={size} color={color}/>
            <Text style={textStyle}>Loading</Text>
        </View>


    );
}



const styles = StyleSheet.create({
    loadingDiv: {
        flex:1,
        alignItems:'center',
        justifyContent:"center",
        fontSize:15,
        zIndex:9999
      }
});