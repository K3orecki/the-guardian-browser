import { ReactElement } from 'react';
import Card from '../card/Card';
import Pagination from '../pagination/Pagination';
import { SearchResponseResults } from '../../types/types';
import { ResultsData } from './types';

export default function Results(props: ResultsData): ReactElement {
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
        <div className='results'>
            <h1 className='page-title'>
                {props.title}
            </h1>
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
        </div>
    );
}