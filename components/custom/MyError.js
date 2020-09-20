import React from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import Colors from '../../constants/Colors';

const MySuccess = props => {
    const {message,method} = props;
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
        <Button
          title="try again"
          color={Colors.primary}
          onPress={method}
        />
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