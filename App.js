import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import loadFonts from './utils/loadFonts';
import Loading from './components/Loading';

import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';

const beforeStarting = (setFontLoaded) => {
  loadFonts(setFontLoaded);
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  console.log("fontLoaded ",fontLoaded);
  beforeStarting(setFontLoaded)

  if(!fontLoaded) return <Loading textStyle={{fontSize:20}} size={40}/>

  
  return (
    <View style={styles.container}>
      <Text style={{fontFamily:"Courgette"}}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


{/* <FontAwesome icon={SolidIcons.spinner} size={30} />
<FontAwesome icon={RegularIcons.smileWink} />
<FontAwesome icon={BrandIcons.github} /> */}