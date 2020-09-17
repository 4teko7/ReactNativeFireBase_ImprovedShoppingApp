import * as Font from 'expo-font';

//Fetching Fonts
export default loadFonts = async (setFontLoaded) => {
    await Font.loadAsync({
        "Yanone":require('../assets/fonts/YanoneKaffeesatz-VariableFont_wght.ttf'),
        "PlayfairDisplay":require('../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf'),
        "PlayfairDisplayItalic":require('../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf'),
        "Oswald":require('../assets/fonts/Oswald-VariableFont_wght.ttf'),
        "Pacifico":require('../assets/fonts/Pacifico-Regular.ttf'),
        "BreeSerif":require('../assets/fonts/BreeSerif-Regular.ttf'),
        "Courgette":require('../assets/fonts/Courgette-Regular.ttf'),
        "fa-solid-900":require('../assets/fonts/fa-solid-900.ttf'),
        "fa-regular-400":require('../assets/fonts/fa-regular-400.ttf'),
        "fa-brands-400":require('../assets/fonts/fa-brands-400.ttf')
        
    });
    setFontLoaded(true);
}