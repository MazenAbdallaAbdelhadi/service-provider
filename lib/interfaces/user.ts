export interface ProviderAccount {
  isActive: boolean;
  balance: number;
  commissionRate: number;
}

export interface User {
  providerAccount: ProviderAccount;
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  bio?: string;
  wishlist: any[];
  addresses: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Token {
  token: string;
}
