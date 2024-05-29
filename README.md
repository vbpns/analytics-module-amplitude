# Analytics Module: Amplitude Analytics

This plugin provides an opinionated implementation of the Backstage Analytics
API for Amplitude Analytics. Once installed and configured, analytics events will
be sent to Amplitude as your users navigate and use your Backstage instance.

This plugin contains no other functionality.

## Installation

1. Install the plugin package in your Backstage app:

```sh
# From your Backstage root directory
yarn --cwd packages/app add @backstage-community/plugin-analytics-module-amplitude

2. Wire up the API implementation to your App:

```tsx

import {
  analyticsApiRef,
  configApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { AmplitudeAnalytics } from '../src';

createDevApp()
  .registerApi({
    api: analyticsApiRef,
    deps: { configApi: configApiRef, identityApi: identityApiRef },
    factory: ({ configApi, identityApi }) =>
      AmplitudeAnalytics.fromConfig(configApi, {
        identityApi,
      }),
  })
```
3. Configure the plugin in your `app-config.yaml`:

The following is the minimum configuration required to start sending analytics
events to Amplitede. All that's needed is your amplitude Api Key:

```yaml
# app-config.yaml
app:
  analytics:
    amplitude:
      amplitudeApiKey: "YOUR API KEY GOES HERE"

## Development

If you would like to contribute improvements to this plugin, the easiest way to
make and test changes is to do the following:

1. Clone the main Backstage monorepo `git clone git@github.com:backstage/backstage.git`
2. Install all dependencies `yarn install`
3. If one does not exist, create an `app-config.local.yaml` file in the root of
   the monorepo and add config for this plugin (see below)
4. Enter this plugin's working directory: `cd plugins/analytics-provider-amplitude`
5. Start the plugin in isolation: `yarn start`
6. Navigate to the playground page at `http://localhost:3000/amplitude`
7. Open the web console to see events fire when you navigate or when you
   interact with instrumented components.

Code for the isolated version of the plugin can be found inside the [/dev](./dev)
directory. Changes to the plugin are hot-reloaded.