export interface User {
  name: {
    first: string;
    last: string;
    title: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  phone: string;
}

export interface UserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface AuthUser {
  name: string;
  email: string;
  picture: string;
  phone: string;
}
