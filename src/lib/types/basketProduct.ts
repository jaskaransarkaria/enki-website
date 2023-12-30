export interface BasketProduct {
  name: string;
  id: number;
  imgHash: string;
  categoryId: number;
  quantity: number;
  price: number;
  currentStock: number;
  giftWrap: boolean;
  giftDescription: string;
  giftWrapToUse: string;
}
