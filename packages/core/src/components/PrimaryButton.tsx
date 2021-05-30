/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';

interface PrimaryButtonProps {
    onClick(): void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick }) => (
    <button className='rpv-core__primary-button' onClick={onClick}>
        {children}
    </button>
);

export default PrimaryButton;
