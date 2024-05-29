export interface Config {
    analytics?: {
        amplitude: {
            /**
             * Amplitude Analytics Api Key
             * @visibility frontend
             */
            amplitudeApiKey: string;
        };
    };
}