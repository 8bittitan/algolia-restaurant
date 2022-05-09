export type noop = (...agrs: any) => void;

export type Hit = {
  objectID: string;
  name: string;
  image_url: string;
  rounded_stars_count: number;
  price: number;
  food_type: string;
};
