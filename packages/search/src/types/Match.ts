/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

export default interface Match {
    // The index of match in the page
    // Each page may have multiple matches
    matchIndex: number;
    pageIndex: number;
}
