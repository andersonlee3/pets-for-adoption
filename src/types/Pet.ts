export type Pet = {
  id: number;
  url: string | null;
  type: string | null;
  species: string | null;
  gender: string | null;
  age: string | null;
  size: string | null;
  name: string | null;
  description: string | null;
  breeds: {
    primary: string | null;
    secondary: string | null;
    mixed: boolean;
  };
  colors: {
    primary: string | null;
    secondary: string | null;
  };
  photos: Array<{
    small: string | null;
    medium: string | null;
    large: string | null;
    full: string | null;
  }>;
  status: string | null;
  attributes: {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed: boolean | null;
    special_needs: boolean;
    shots_current: boolean;
  };
  environment: {
    children: boolean | null;
    dogs: boolean | null;
    cats: boolean | null;
  };
  tags: string[];
  contact: {
    email: string | null;
    phone: string | null;
    address: {
      city: string | null;
      state: string | null;
      postcode: string | null;
      country: string | null;
    };
  };
  published_at: string | null;
  distance: number | null;
};
