import { createPlugin } from '@backstage/core-plugin-api';

/**
 * @deprecated Importing and including this plugin in an app has no effect.
 * This will be removed in a future release.
 *
 * @public
 */
export const analyticsModuleAmplitude = createPlugin({
    id: 'analytics-provider-amplitude',
});
