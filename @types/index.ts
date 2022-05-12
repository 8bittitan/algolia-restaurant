export type FN<T> = (...agrs: T[]) => void;

export type Hit = {
  objectID: string;
  name: string;
  image_url: string;
  rounded_stars_count: number;
  price: number;
  food_type: string;
  city: string;
  state: string;
  postal_code: string;
};
