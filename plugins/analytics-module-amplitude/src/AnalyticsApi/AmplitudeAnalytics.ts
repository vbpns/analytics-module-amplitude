import {
    AnalyticsApi,
    AnalyticsEvent,
    IdentityApi,
} from '@backstage/core-plugin-api';
import {
    AnalyticsApi as NewAnalyticsApi,
    AnalyticsEvent as NewAnalyticsEvent,
} from '@backstage/frontend-plugin-api';
import { Config } from '@backstage/config';
import * as amplitude from '@amplitude/analytics-browser';

/**
 * Amplitude Analytics API provider for the Backstage Analytics API.
 * @public
 */
export class AmplitudeAnalytics implements AnalyticsApi, NewAnalyticsApi {

    private constructor(
        options: {
            identityApi?: IdentityApi;
            amplitudeApiKey: string;
        }) {
        const { identityApi, amplitudeApiKey } = options;

        // Initialize Amplitude Analytics.
        amplitude.init(amplitudeApiKey, {
            defaultTracking: true,
        });

        if (identityApi) {
            this.setUserFrom(identityApi);
        }
    }

    /**
     * Instantiate a fully configured Amplitude Analytics API implementation.
     */
    static fromConfig(
        config: Config,
        options: {
            identityApi?: IdentityApi;
        } = {},
    ) {
        const amplitudeApiKey = config.getString('amplitude.apiKey');

        return new AmplitudeAnalytics({
            ...options,
            amplitudeApiKey,
        });
    }

    /**
     * Primary event capture implementation for Amplitude.
     */
    captureEvent(event: AnalyticsEvent | NewAnalyticsEvent) {

        const { action, subject, value } = event;

        const eventData = {
            event_type: action,
            event_properties: {
                subject,
                value,
            },
        };

        amplitude.track("page - portal", eventData);
    }

    private async setUserFrom(identityApi: IdentityApi) {
        const { email } = await identityApi.getProfileInfo();

        // Set the user ID in Amplitude
        amplitude.setUserId(email);
    }
}
