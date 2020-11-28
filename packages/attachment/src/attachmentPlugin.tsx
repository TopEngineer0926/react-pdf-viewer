/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import React, { ReactElement, useMemo } from 'react';
import { createStore, Plugin, PluginOnDocumentLoad } from '@react-pdf-viewer/core';

import AttachmentListWithStore from './AttachmentListWithStore';
import StoreProps from './StoreProps';

interface AttachmentPlugin extends Plugin {
    Attachments: () => ReactElement;
}

const attachmentPlugin = (): AttachmentPlugin => {
    const store = useMemo(() => createStore<StoreProps>({}), []);

    const AttachmentsDecorator = () => (
        <AttachmentListWithStore store={store} />
    );

    return {
        onDocumentLoad: (props: PluginOnDocumentLoad) => {
            store.update('doc', props.doc);
        },
        Attachments: AttachmentsDecorator,
    };
};

export default attachmentPlugin;
