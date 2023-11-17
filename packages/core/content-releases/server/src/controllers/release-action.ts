import type Koa from 'koa';
import { validateReleaseActionCreateSchema } from './validation/release-action';
import { CreateReleaseAction } from '../../../shared/contracts/release-action';
import { getService } from '../utils';
import { Release } from '../../../shared/contracts/release';

const releaseActionController = {
  async create(ctx: Koa.Context) {
    const releaseId: Release['id'] = ctx.params.id;
    const releaseActionArgs: CreateReleaseAction.Request['body'] = ctx.request.body;

    await validateReleaseActionCreateSchema(releaseActionArgs);

    const releaseService = getService('release', { strapi });
    const releaseAction = await releaseService.createAction(releaseId, releaseActionArgs);

    ctx.body = {
      data: releaseAction,
    };
  },
};

export default releaseActionController;
