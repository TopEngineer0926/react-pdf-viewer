/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { ReactElement } from 'react';
import { Plugin } from '@react-pdf-viewer/core';

export interface AttachmentPlugin extends Plugin {
    Attachments: () => ReactElement;
}

export function attachmentPlugin(): AttachmentPlugin;
