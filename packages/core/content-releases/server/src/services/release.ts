import { setCreatorFields } from '@strapi/utils';
import type { LoadedStrapi } from '@strapi/types';
import { RELEASE_ACTION_MODEL_UID, RELEASE_MODEL_UID } from '../constants';
import type { Release, GetReleases, CreateRelease } from '../../../shared/contracts/release';
import type { CreateReleaseAction } from '../../../shared/contracts/release-action';
import type { UserInfo } from '../../../shared/types';
import { getService } from '../utils';

const createReleaseService = ({ strapi }: { strapi: LoadedStrapi }) => ({
  async create(releaseData: CreateRelease.Request['body'], { user }: { user: UserInfo }) {
    const releaseWithCreatorFields = await setCreatorFields({ user })(releaseData);

    return strapi.entityService.create(RELEASE_MODEL_UID, {
      data: releaseWithCreatorFields,
    });
  },
  findMany(query?: GetReleases.Request['query']) {
    return strapi.entityService.findPage(RELEASE_MODEL_UID, {
      // Default query
      populate: {
        actions: {
          // @ts-expect-error TS error on populate, is not considering count
          count: true,
        },
      },
      // Query request, overrides default
      ...query,
    });
  },
  findOne(id: Release['id']) {
    return strapi.entityService.findOne(RELEASE_MODEL_UID, id, {
      // Default query
      populate: {
        actions: {
          // @ts-expect-error TS error on populate, is not considering count
          count: true,
        },
      },
    });
  },
  async createAction(
    id: Release['id'],
    action: Pick<CreateReleaseAction.Request['body'], 'type' | 'entry'>
  ) {
    const { validateEntryContentType, validateUniqueEntry } = getService('release-validation', {
      strapi,
    });

    await Promise.all([
      validateEntryContentType(action.entry.contentType),
      validateUniqueEntry(id, action),
    ]);

    const { entry, type } = action;

    return strapi.entityService.create(RELEASE_ACTION_MODEL_UID, {
      data: {
        type,
        contentType: entry.contentType,
        entry: {
          id: entry.id,
          __type: entry.contentType,
          __pivot: { field: 'entry' },
        },
        release: id,
      },
      populate: { release: { fields: ['id'] }, entry: { fields: ['id'] } },
    });
  },
});

export default createReleaseService;
