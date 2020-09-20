import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const MySuccess = props => {
    const {message} = props;
    return (
        <View style={{ ...styles.centered }}>
            <View style={{ width: "80%", margin: 20 }}>
            <Text
                style={{
                textAlign: "center",
                fontFamily: "Courgette",
                color: "green",
                fontWeight: "bold",
                fontSize: 20
                }}
            >
                {message}
            </Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
})

export default MySuccess;