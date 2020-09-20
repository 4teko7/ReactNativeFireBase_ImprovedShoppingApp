import React from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import Colors from '../../constants/Colors';

const MyError = props => {
    const {message,method,setError} = props;
    return (
        <View style={{ ...styles.centered }}>
        <View style={{ width: "80%", margin: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Courgette",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </Text>
        </View>
        <View style={styles.action}>
        <Button
          title="try again"
          color={Colors.primary}
          onPress={method}
        />
        <Button title="Cancel" color={Colors.accent} onPress={setError.bind(this,null)}/>
        </View>
      </View>
    );

}

MyError.navigationOptions = navData => {
    headerTitle: 'Error'
} 

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      action: {
        width:"60%",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    }
})

export default MyError;