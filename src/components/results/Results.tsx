import { ReactElement } from 'react';
import Card from '../card/Card';
import Pagination from '../pagination/Pagination';
import type { SearchResponseResults } from '../../types/types';
import type { DataResults } from './Results.types';

export default function Results(props: DataResults): ReactElement {
    const articles = props.data.results;
    const items = (
        (articles.length) ? 
        articles.map((obj: SearchResponseResults, idx: number) =>
            <Card
                key={obj.id} {...obj}
                author={props.authors[idx]}
            />   
        ) :
        <strong className='no-results'>Sorry! No results found!</strong>
    );

    return (
        <>
            {/* <h1 className='page-title'>
                {props.title}
            </h1> */}
            <div className='articles'>
                {items}
            </div>
            {
                (articles.length) ?
                <Pagination
                    pagesAll={props.data.pages}
                    pagesCurrent={props.data.currentPage}
                    onClick={props.onClick}
                    onPageUp={props.onPageUp}
                    onPageDown={props.onPageDown}
                /> : 
                null
            }
        </>
    );
}