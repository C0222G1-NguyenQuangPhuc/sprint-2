import {Category} from './category';

export interface Product {
  id?: number;
  name?: string;
  releaseTime?: string;
  manufactureTime?: string;
  manufacturer?: string;
  price?: number;
  warranty?: string;
  quantity?: number;
  image?: string;
  category?: Category;
}
