import * as React from 'react';
import { View, FlatList } from 'react-native';
import { FLEX, PH } from '../../common/styles';
import { initializeAxios } from '../../server';
import { getAllShopAccToCon } from '../../server/api/shop/shop.api';
import { IRgetShops, Shop } from '../../server/api/shop/shop.interface';
import ShopCard from './component/ShopCard';

export interface ListShopProps {}

const ListShop: React.FC<ListShopProps> = () => {
    const [shops, setShops] = React.useState<Partial<Shop>[]>([]);

    async function fetchShopFromServer() {
        try {
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
        <View style={[FLEX(1), PH(0.5)]}>
            <FlatList
                data={shops}
                renderItem={(item) => {
                    return <ShopCard shop={item} />;
                }}
            />
        </View>
    );
};

export default ListShop;
