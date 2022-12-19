import { Link } from 'react-router-dom';
import type { DataPages } from './Pagination.types';

function getPaginationBaseValue(pagesAll: number, pagesCurrent: number): number {
    return (Math.floor(pagesCurrent / 10) <= Math.floor(pagesAll / 10)) ?
        (Math.floor((pagesCurrent - 1) / 10)) :
        (Math.floor((pagesAll - 1) / 10));
}

function getPaginationListLength(pagesAll: number, baseValue: number): number {
    return ((baseValue * 10 + 10) <= pagesAll) ? 10 : pagesAll % 10;
}

function getPaginationList(pagesAll: number, pagesCurrent: number): number[] {
    const baseValue = getPaginationBaseValue(pagesAll, pagesCurrent);
    const paginationListLength = getPaginationListLength(pagesAll, baseValue);

    return Array.from(
        new Array(paginationListLength),
        (_, idx) => baseValue * 10 + idx + 1
    );
}

function getPageDown(pagesCurrent: number): number {
    return (pagesCurrent === 1) ?
        pagesCurrent :
        pagesCurrent - 1;
}

function getPageUp(pagesCurrent: number, pagesAll: number): number {
    return (pagesCurrent === pagesAll) ?
        pagesCurrent :
        pagesCurrent + 1;
}

function getPaginationItems(props: DataPages) {
    const paginationList = getPaginationList(props.pagesAll, props.pagesCurrent);

    return paginationList.map((value) => {
        return (
            <li
                key={value}
                className='pagination-list-item'
                data-selected={(value === props.pagesCurrent) ? true : false}
                onClick={() => props.onClick(value)}
                data-title={value}
            >
                {value}
            </li>
        );
    });
}

export default function Pagination(props: DataPages) {
    return (
        <ul className='pagination'>
            <li
                className='pagination-btn'
                data-title='Previous'
                onClick={() => props.onClick(getPageDown(props.pagesCurrent))}
            >
                Previous
            </li>
            <ul className='pagination-list'>
                {getPaginationItems(props)}
            </ul>
            <li
                className='pagination-btn'
                data-title='Next'
                onClick={() => props.onClick(getPageUp(props.pagesCurrent, props.pagesAll))}
            >
                Next
            </li>
        </ul>
    );
}