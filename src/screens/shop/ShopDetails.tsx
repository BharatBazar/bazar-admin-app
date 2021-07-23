import * as React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationProps } from '../../common';
import { borderColor } from '../../common/color';
import { BC, BGCOLOR, BR, BW, FLEX, HP, MT, PH, PV } from '../../common/styles';
import Header from '../../component/Header';
import WrappedText from '../../component/WrappedText';
import { getShop, updateShop } from '../../server/api/shop/shop.api';
import { IRShop, Shop } from '../../server/api/shop/shop.interface';

export interface ShopDetailsProps extends NavigationProps {
    route: {
        params: {
            shop: Partial<Shop>;
        };
    };
}

const ShopDetails: React.SFC<ShopDetailsProps> = ({
    route: {
        params: { shop },
    },
    navigation,
}) => {
    const [shopD, setShop] = React.useState<Partial<Shop>>({});

    async function getShopFromServer() {
        try {
            const response: IRShop = await getShop({ _id: shop._id });
            if (response.status == 1) {
                setShop(response.payload);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    async function updateShopFromServer(data: Partial<Shop>) {
        try {
            const response: IRShop = await updateShop({ _id });
        } catch (error) {
            console.log('error', error);
        }
    }

    React.useEffect(() => {
        //getShopFromServer();
        return () => {};
    }, []);

    return (
        <View style={[FLEX(1)]}>
            <Header screenName={shop.shopName} onPress={navigation.goBack} />
            <View style={[FLEX(1)]}>
                <View style={[MT(0.2), BGCOLOR('#FFFFFF'), PV(0.2), PH(0.5)]}>
                    <WrappedText text={shopD.shopName} />
                    <TextInput
                        value={''}
                        onChangeText={(experience) => {}}
                        placeholder={'Message for dukandar '}
                        style={[HP(2), { borderWidth: 0.18 }, BC('#646464'), BR(0.1), PH(0.2), PV(0.1)]}
                        placeholderTextColor={'#58595B'}
                        multiline={true}
                    />
                </View>
            </View>
        </View>
    );
};

export default ShopDetails;
