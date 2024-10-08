import { IRgetShops, IRShop, Shop } from './shop.interface';
import axios from 'axios';

export function getAllShopAccToCon(data: { query: Partial<Shop> }): Promise<IRgetShops> {
    return axios.post('/shop/getAllShop', data);
}

export function getShop(data: { _id: string }): Promise<IRShop> {
    return axios.post('/shop/get', data);
}

export function updateShop(data: Partial<Shop>): Promise<IRShop> {
    return axios.patch('/shop/update', data);
}
