import { AuctionFormValues } from '../auction/AuctionFormValues';
import { StorageFormValues } from '../storage/StorageFormValues';

export interface ProductInfo {
	product: {
		id?: number;
		name: string;
		description: string;
		weight: number;
		color: string;
		categoryId: number;
		images: string[];
		imagesToDelete: string[];
		photoLinks: string[];
		startPrice: number;
		time: number;
	};
	storage: StorageFormValues;
	auction: AuctionFormValues;
}
