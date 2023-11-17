import type Koa from 'koa';
import { validateReleaseActionCreateSchema } from './validation/release-action';
import { CreateReleaseAction } from '../../../shared/contracts/release-action';
import { getService } from '../utils';

const releaseActionController = {
  async create(ctx: Koa.Context) {
    const releaseActionArgs: CreateReleaseAction.Request['body'] = ctx.request.body;

    await validateReleaseActionCreateSchema(releaseActionArgs);

    const releaseService = getService('release', { strapi });
    const { releaseId, ...action } = releaseActionArgs;
    const releaseAction = await releaseService.createAction(releaseId, action);

    ctx.body = {
      data: releaseAction,
    };
  },
};

export default releaseActionController;
