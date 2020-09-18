import React from "react";
import { FlatList,Platform,Button } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {useDispatch} from 'react-redux';
import * as productActions from '../../store/actions/products';

//Components
import CustomHeaderButton from "../../components/UI/HeaderButton";

//Constants
import Colors from '../../constants/Colors';

const UserProductsScreen = (props) => {
    const dispatch = useDispatch();
    const userProducts = useSelector((state) => {
        return state.products.userProducts;
    });

    const onSelectHandler = (id, title) => {
        props.navigation.navigate("ProductDetailScreen", {
        productId: id,
        productTitle: title,
        });
    };

    const onEditHandler = (productId,title) => {
        props.navigation.navigate('EditProductScreen',{
            productId: productId,
            title: title
        })
    }

    const onDeleteHandler = (productId) => {
        dispatch(productActions.deleteProduct(productId));
    }

    return (
        <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={() => {
                    onSelectHandler(itemData.item.id, itemData.item.title);
                }
            }
            >

            <Button
                color={Colors.primary}
                title="Edit"
                onPress={() => {
                onEditHandler(itemData.item.id,itemData.item.title);
                }}
            />
            <Button
                color={Colors.primary}
                title="Delete"
                onPress={() => {
                    onDeleteHandler(itemData.item.id)
                }}
            />  

            </ProductItem>
        )}
        />
    );
};

UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item
                    title="Create"
                    iconName={
                      Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                    }
                    onPress={() => {
                      navData.navigation.navigate('EditProductScreen')
                    }}
                  />
                </HeaderButtons>
        )
    }
}

export default UserProductsScreen;
