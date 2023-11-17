import type { Entity } from '@strapi/types';

// @TODO: Probably user & role types should be imported from a common package
interface RoleInfo {
  id: Entity.ID;
  name: string;
  code: string;
  description?: string;
  usersCount?: number;
}

export interface UserInfo {
  id: Entity.ID;
  firstname: string;
  lastname?: string;
  username?: null | string;
  email: string;
  isActive: boolean;
  blocked: boolean;
  preferedLanguage: null | string;
  roles: RoleInfo[];
  createdAt: string;
  updatedAt: string;
}
