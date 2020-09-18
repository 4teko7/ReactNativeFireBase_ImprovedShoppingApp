import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import loadFonts from './utils/loadFonts';
import Loading from './components/Loading';

import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';

//REDUX
import {createStore , combineReducers } from 'redux';
import {Provider} from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import {composeWithDevTools} from 'redux-devtools-extension';

//Navigator
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer
});

const store = createStore(rootReducer,composeWithDevTools()); //RemoveThisWhenProductionOccurs


const beforeStarting = (setFontLoaded) => {
  loadFonts(setFontLoaded);
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  beforeStarting(setFontLoaded)

  if(!fontLoaded) return <Loading textStyle={{fontSize:20}} size={40}/>

  
  return (
   <Provider store={store}>
     <ShopNavigator />
   </Provider>
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