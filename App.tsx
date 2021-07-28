import * as React from 'react';
import { View, FlatList } from 'react-native';
import { fs24, NavigationProps } from './src/common';
import { BGCOLOR, FLEX, PH, PT } from './src/common/styles';
import WrappedText from './src/component/WrappedText';
import { NavigationKey } from './src/labels';
import { getAllShopAccToCon } from './src/server/api/shop/shop.api';
import { IRgetShops, Shop } from './src/server/api/shop/shop.interface';
import ShopCard from './src/screens/shop/component/ShopCard';
import { initializeAxios } from './src/server';

export interface ListShopProps extends NavigationProps {}

const ListShop: React.FC<ListShopProps> = ({ navigation }) => {
    const [shops, setShops] = React.useState<Partial<Shop>[]>([]);

    async function fetchShopFromServer() {
        try {
            console.log('Fetch shop =>');
            const response: IRgetShops = await getAllShopAccToCon({
                query: { isVerified: false },
            });

            if (response.status == 1) {
                setShops(response.payload.payload);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    React.useEffect(() => {
        initializeAxios();
        fetchShopFromServer();
        return () => {};
    }, []);

    return (
        <View style={[FLEX(1), PH(0.5), PT(0.5), BGCOLOR('#FFFFFF')]}>
            <WrappedText text={'Unverfied Shops'} fontSize={fs24} />
            <FlatList
                data={shops}
                renderItem={({ item, index }) => {
                    return (
                        <ShopCard
                            shop={item}
                            onPress={() => {
                                navigation.navigate(NavigationKey.SHOPDETAILS, { shop: item });
                            }}
                        />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default ListShop;
