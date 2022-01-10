import * as React from 'react';
import { ScrollMode, SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const App = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {
            fullScreenPlugin: {
                onEnterFullScreen: (zoom) => {
                    zoom(SpecialZoomLevel.PageFit);
                    defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
                        ScrollMode.Wrapped
                    );
                },
                onExitFullScreen: (zoom) => {
                    zoom(SpecialZoomLevel.PageWidth);
                    defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
                        ScrollMode.Horizontal
                    );
                },
            },
        },
    });

    return (
        <div
            style={{
                height: '50rem',
            }}
        >
            <Viewer
                fileUrl="/pdf-open-parameters.pdf"
                defaultScale={0.75}
                plugins={[defaultLayoutPluginInstance]}
                scrollMode={ScrollMode.Wrapped}
            />
        </div>
    );
};

export default App;
