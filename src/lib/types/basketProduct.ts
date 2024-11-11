export interface BasketProduct {
  name: string;
  variationId: string;
  id: string;
  imgHash: string;
  categoryId: string;
  quantity: number;
  price: number;
  currentStock: number;
  giftWrap: boolean;
  giftDescription: string;
  giftWrapToUse: string;
}
