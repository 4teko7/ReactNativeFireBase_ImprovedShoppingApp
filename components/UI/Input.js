import React,{useReducer,useEffect} from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_END_EDITING = 'INPUT_END_EDITING';

const inputReducer = (state,action) => {
    switch(action.type){
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_END_EDITING:
            return {
                ...state,
                isValid: action.isValid
            }
        default:
            return state;
    }
    
}


const MyInput = props => {
    const {label,name,errorText,onInputChange,initialValue,initiallyValid} = props;

    const [inputState,dispatchInputState] = useReducer(inputReducer,{
        value: initialValue ? initialValue : '',
        isValid: initiallyValid ? true : false,
    }) 

    const onInputChangeHandler = text => {
        let isValid = false;
        if(text.length > 0) isValid = true;

        dispatchInputState({
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid
        })
    }

    const onEndEditingHandler = text => {
        if(text.nativeEvent.text.length === 0){
            dispatchInputState({
                type: INPUT_END_EDITING,
                isValid: false
            })
        }
    }

    useEffect(()=>{
        onInputChange(name,inputState.value,inputState.isValid);
    },[inputState,onInputChange])

    return (
        <View style={styles.formControl}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            {...props}
            style={styles.input}
            value={inputState.value}
            onChangeText={onInputChangeHandler}
            onEndEditing={onEndEditingHandler}
          />
          {!inputState.isValid && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
    );

}

const styles = StyleSheet.create({
    formControl: {
        width: "100%",
      },
      label: {
        fontFamily: "Courgette",
        marginVertical: 8,
      },
      input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
      },
      errorText: {
          fontFamily:'fa-brands-400',
          color:'red',
          fontSize:12
      }
})

export default MyInput;