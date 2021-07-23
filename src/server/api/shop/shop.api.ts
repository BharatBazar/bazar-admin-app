import { IRgetShops, Shop } from './shop.interface';
import axios from 'axios';

export async function getAllShopAccToCon(data: { query: Partial<Shop> }): Promise<IRgetShops> {
    return axios.post('/shop/getAllShop', data);
}
