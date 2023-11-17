import type { Entity } from '@strapi/types';
import type { ReleaseAction } from './release-action';
import type { UserInfo } from '../types';
import { errors } from '@strapi/utils';

export interface Release {
  id: Entity.ID;
  name: string;
  createdAt: string;
  updatedAt: string;
  releasedAt: Date;
  actions: ReleaseAction[];
}

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

interface ReleaseDataResponse extends Omit<Release, 'actions'> {
  actions: { meta: { count: number } };
}

/**
 * GET /content-releases/ - Get all releases
 */
export declare namespace GetReleases {
  export interface Request {
    state: {
      userAbility: {};
    };
    query?: {
      [key: string]: unknown;
      page?: number;
      pageSize?: number;
    };
  }

  export interface Response {
    data: ReleaseDataResponse[] | null;
    pagination: Pagination;
    error?: errors.ApplicationError;
  }
}

/**
 * GET /content-releases/:id - Get a single release
 */
export declare namespace GetRelease {
  export interface Request {
    state: {
      userAbility: {};
    };
    body: {};
    params: {
      id: Entity.ID;
    };
    query?: Record<string, unknown>;
  }

  export interface Response {
    data: ReleaseDataResponse | null;
    error?: errors.NotFoundError;
  }
}

/**
 * POST /content-releases/ - Create a release
 */
export declare namespace CreateRelease {
  export interface Request {
    state: {
      user: UserInfo;
    };
    body: {
      name: string;
    };
  }

  export interface Response {
    data: ReleaseDataResponse;
    error?: errors.ApplicationError | errors.ValidationError;
  }
}
