export type Address = { street: string; city: string; country: string; zipCode: string };

export type RoleEnum = 'admin' | 'user' | 'guest';

export type User = {
  id: number;
  email: string;
  name: string;
  roleEnumUnnamed: 'user_role' | 'admin_role' | 'guest_role';
  roleEnumReferenced: RoleEnum;
  tags: Array<string>;
  // metadata: AnyObject;
  birthDate: string;
  score: number;
  isActive: boolean;
  address: Address;
}