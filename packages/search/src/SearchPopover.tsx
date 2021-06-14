/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { Button, LocalizationContext, MinimalButton, Position, Store, TextBox, Tooltip } from '@react-pdf-viewer/core';

import NextIcon from './NextIcon';
import PreviousIcon from './PreviousIcon';
import StoreProps from './types/StoreProps';
import useSearch from './useSearch';

interface SearchPopoverProps {
    store: Store<StoreProps>;
    onToggle(): void;
}

// `new RegExp('')` will treat the source as `(?:)` which is not an empty string
const PORTAL_OFFSET = { left: 0, top: 8 };

const SearchPopover: React.FC<SearchPopoverProps> = ({ store, onToggle }) => {
    const l10n = React.useContext(LocalizationContext);

    const {
        clearKeyword,
        changeMatchCase,
        changeWholeWords,
        currentMatch,
        jumpToNextMatch,
        jumpToPreviousMatch,
        keyword,
        matchCase,
        numberOfMatches,
        wholeWords,
        search,
        setKeyword,
    } = useSearch(store);

    const onKeydownSearch = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        // Press the Enter key
        if (e.keyCode !== 13 || !keyword) {
            return;
        }
        search();
    };

    const onChangeMatchCase = (e: React.ChangeEvent<HTMLInputElement>): void => {
        changeMatchCase(e.target.checked);
    };

    const onChangeWholeWords = (e: React.ChangeEvent<HTMLInputElement>): void => {
        changeWholeWords(e.target.checked);
    };

    const onClose = (): void => {
        onToggle();
        clearKeyword();
    };

    return (
        <div className='rpv-search__popover'>
            <div className='rpv-search__popover-input-counter'>
                <TextBox
                    placeholder={(l10n && l10n.search ? l10n.search.enterToSearch : 'Enter to search') as string}
                    type='text'
                    value={keyword}
                    onChange={setKeyword}
                    onKeyDown={onKeydownSearch}
                />
                <div className='rpv-search__popover-counter'>
                    {currentMatch}/{numberOfMatches}
                </div>
            </div>
            <label className='rpv-search__popover-label'>
                <input
                    className='rpv-search__popover-label-checkbox'
                    checked={matchCase}
                    type='checkbox'
                    onChange={onChangeMatchCase}
                /> {l10n && l10n.search ? l10n.search.matchCase : 'Match case'}
            </label>
            <label className='rpv-search__popover-label'>
                <input
                    className='rpv-search__popover-label-checkbox'
                    checked={wholeWords}
                    type='checkbox'
                    onChange={onChangeWholeWords}
                /> {l10n && l10n.search ? l10n.search.wholeWords : 'Whole words'}
            </label>
            <div className='rpv-search__popover-footer'>
                <div className='rpv-search__popover-footer-item'>
                    <Tooltip
                        position={Position.BottomCenter}
                        target={<MinimalButton onClick={jumpToPreviousMatch}><PreviousIcon /></MinimalButton>}
                        content={() => (l10n && l10n.search ? l10n.search.previousMatch : 'Previous match')}
                        offset={PORTAL_OFFSET}
                    />
                </div>
                <div className='rpv-search__popover-footer-item'>
                    <Tooltip
                        position={Position.BottomCenter}
                        target={<MinimalButton onClick={jumpToNextMatch}><NextIcon /></MinimalButton>}
                        content={() => (l10n && l10n.search ? l10n.search.nextMatch : 'Next match')}
                        offset={PORTAL_OFFSET}
                    />
                </div>
                <div className='rpv-search__popover-footer-button'>
                    <Button onClick={onClose}>
                        {l10n && l10n.search ? l10n.search.close : 'Close'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchPopover;
