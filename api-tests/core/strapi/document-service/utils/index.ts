import { Attribute } from '@strapi/strapi';

export const ARTICLE_UID = 'api::article.article';
export type Article = Attribute.GetAll<typeof ARTICLE_UID> & { documentId: string };

export const findArticleDb = async (where: any) => {
  return (await strapi.query(ARTICLE_UID).findOne({ where })) as Article | undefined;
};

export const findArticlesDb = async (where: any) => {
  return (await strapi.query(ARTICLE_UID).findMany({ where })) as Article[];
};
