import type { Entity, Common } from '@strapi/types';
import type { Release } from './release';
import type { errors } from '@strapi/utils';

interface ReleaseActionEntry {
  id: Entity.ID;
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
    body: {
      releaseId: Entity.ID;
      type: ReleaseAction['type'];
      entry: {
        id: Entity.ID;
        contentType: Common.UID.ContentType;
      };
    };
  }

  export interface Response {
    data: ReleaseAction;
    error?: errors.ApplicationError | errors.ValidationError;
  }
}
