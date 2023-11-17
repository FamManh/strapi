import { useTypedSelector } from '../store/hooks';

const useContentTypeHasI18n = (): boolean => {
  const pluginOptions = useTypedSelector(
    (state) => state['content-manager_listView'].contentType.pluginOptions
  );

  return pluginOptions?.i18n?.localized ?? false;
};

export { useContentTypeHasI18n };
