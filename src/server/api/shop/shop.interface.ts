import { CommonApiResponse } from './../common.interface';

export enum verificationStatus {
    registered = 'Registered',
    processing = 'Processing',
    rejected = 'Rejected',
    verified = 'Verified',
}

export interface shopMemberInterface {
    firstName: string;
    lastName: string;
    //photo: [{_id:ObjectId}];
    permissions: string;
    phoneNumber: string;
    shop: string;
    role: string;
    _id: string;
    password: string;
    isTerminated: boolean;
    isDeleted: boolean;
    languagePreference: ['Hindi', 'English', 'Message'];
}

export interface Shop {
    _id: string;
    shopName: string;
    shopDescription: string;
    addressOfShop: string;
    shopImage: [{ _id: string }];
    ownerImage: [{ _id: string }];
    verificationStatus: verificationStatus;
    remarks: string;
    // whatYouSell: string[];

    state: string;
    city: string;
    area: string;
    pincode: string;
    localAddress: string;

    owner: string | shopMemberInterface;
    coOwner: string | shopMemberInterface[];
    worker: string | shopMemberInterface[];

    isVerified: boolean;
    isTerminated: boolean;
    membersDetailSkipped: boolean;
    rating: Number;
    noOfRating: Number;
    category: [string];
    subCategory: [[string]];
    subCategory1: [[[string]]];
}

export const ShopFields = {
    shopName: 'shopName',
    addressOfShop: 'addressOfShop',
    shopPhoto: 'shopPhoto',
    ownerPhoto: 'ownerPhoto',
    whatYouSell: 'whatYouSell',
    owner: 'owner',
    coOwner: 'Co-owner',
    worker: 'worker',
};

export interface IRgetShops extends CommonApiResponse {
    payload: { payload: Partial<Shop>[]; searchCount: number; lastTime: Date };
}

export interface IRShop extends CommonApiResponse {
    payload: Partial<Shop>;
}
