import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { Playground } from './Playground';
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
  .addPage({
    path: '/amplitude',
    title: 'Amplitude Playground',
    element: <Playground />,
  })
  .render();
