import get from 'lodash/get';
import { useSelector } from 'react-redux';

const selectContentManagerListViewPluginOptions = (state: any) =>
  state['content-manager_listView'].contentType.pluginOptions;

const useHasI18n = () => {
  const pluginOptions = useSelector(selectContentManagerListViewPluginOptions);

  return get(pluginOptions, 'i18n.localized', false);
};

export default useHasI18n;
