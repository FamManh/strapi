import get from 'lodash/get';

const hasLocalePermission = (permissions: any, localeCode: any) => {
  if (permissions) {
    const hasPermission = permissions.some((permission: any) =>
      get(permission, 'properties.locales', []).includes(localeCode)
    );

    if (hasPermission) {
      return true;
    }
  }

  return false;
};

const getFirstLocale = (permissions: any) => {
  if (permissions && permissions.length > 0) {
    const firstAuthorizedNonDefaultLocale = get(permissions, [0, 'properties', 'locales', 0], null);

    if (firstAuthorizedNonDefaultLocale) {
      return firstAuthorizedNonDefaultLocale;
    }
  }

  return null;
};

/**
 * Entry point of the module
 */
const getDefaultLocale = (ctPermissions: any, locales: any = []) => {
  const defaultLocale = locales.find((locale: any) => locale.isDefault);

  if (!defaultLocale) {
    return null;
  }

  const readPermissions = ctPermissions['plugin::content-manager.explorer.read'];
  const createPermissions = ctPermissions['plugin::content-manager.explorer.create'];

  if (hasLocalePermission(readPermissions, defaultLocale.code)) {
    return defaultLocale.code;
  }

  if (hasLocalePermission(createPermissions, defaultLocale.code)) {
    return defaultLocale.code;
  }

  // When the default locale is not authorized, we return the first authorized locale
  const firstAuthorizedForReadNonDefaultLocale = getFirstLocale(readPermissions);

  if (firstAuthorizedForReadNonDefaultLocale) {
    return firstAuthorizedForReadNonDefaultLocale;
  }

  return getFirstLocale(createPermissions);
};

export default getDefaultLocale;
