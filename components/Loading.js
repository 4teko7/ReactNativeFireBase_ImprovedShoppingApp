import React from 'react';
import {Text,View,StyleSheet,ActivityIndicator} from 'react-native';
import {absoluteCenter} from '../DATABASE';


const Loading = (props) => {
    const {parentStyle,textStyle,size,color,info} = props;
    return (
        <View style={{...styles.loadingDiv,...parentStyle}}>
            <ActivityIndicator size={size} color={color}/>
            <Text style={textStyle}>{info}</Text>
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

export default Loading;