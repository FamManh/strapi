import type { Common } from '@strapi/types';
import type { Release } from './release';
import type { Entity } from '../types';
import type { errors } from '@strapi/utils';

interface ReleaseActionEntry extends Entity {
  // Entity attributes
  [key: string]: unknown;
}

export interface ReleaseAction {
  type: 'publish' | 'unpublish';
  entry: ReleaseActionEntry;
  contentType: Common.UID.ContentType;
  release: Release;
}

/**
 * POST /content-releases/release-actions/ - Create a release action
 */
export declare namespace CreateReleaseAction {
  export interface Request {
    params: {
      id: Release['id'];
    };
    body: {
      type: ReleaseAction['type'];
      entry: {
        id: ReleaseActionEntry['id'];
        contentType: Common.UID.ContentType;
      };
    };
  }

  export interface Response {
    data: ReleaseAction;
    error?: errors.ApplicationError | errors.ValidationError;
  }
}
