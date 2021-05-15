/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';

import useClickOutside from '../hooks/useClickOutside';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';
import usePosition from '../hooks/usePosition';
import ThemeContext from '../theme/ThemeContext';
import Arrow from './Arrow';
import Offset from './Offset';
import Position from './Position';

interface PopoverBodyProps {
    closeOnClickOutside: boolean;
    offset: Offset;
    position: Position;
    targetRef: React.RefObject<HTMLElement>;
    onClose(): void;
}

const PopoverBody: React.FC<PopoverBodyProps> = ({
    children, closeOnClickOutside, offset, position, targetRef, onClose,
}) => {
    const theme = React.useContext(ThemeContext);
    const contentRef = React.createRef<HTMLDivElement>();
    const innerRef = React.createRef<HTMLDivElement>();
    const anchorRef = React.createRef<HTMLDivElement>();

    useClickOutside(closeOnClickOutside, contentRef, onClose);
    usePosition(contentRef, targetRef, anchorRef, position, offset);

    useIsomorphicLayoutEffect(() => {
        const innerContentEle = innerRef.current;        
        if (!innerContentEle) {
            return;
        }

        // Limit the height of popover content
        const maxHeight = document.body.clientHeight * 0.75;
        if (innerContentEle.getBoundingClientRect().height >= maxHeight) {
            innerContentEle.style.overflow = 'auto';
            innerContentEle.style.maxHeight = `${maxHeight}px`;
        }
    }, []);

    return (
        <>
        <div
            ref={anchorRef}
            style={{ left: 0, position: 'absolute', top: 0 }}
        />
        <div className={`${theme.prefixClass}-popover-body`} ref={contentRef}>
            <Arrow customClassName={`${theme.prefixClass}-popover-body-arrow`} position={position} />
            <div ref={innerRef}>
                {children}
            </div>
        </div>
        </>
    );
};

export default PopoverBody;
