import { ReactElement, useState } from 'react';
import { SectionsResponseResults } from '../../types/types';
import HamburgerIcon from '../hamburger-icon/HamburgerIcon';
import styles from './Sections.module.scss';
import type { DataSections } from './Sections.types';

export default function Sections(props: DataSections): ReactElement {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const sectionsData = props.sectionsData;
    const searchParams = props.searchParams;
    const currentSection = searchParams.get('section');
    const items = sectionsData.map((section: SectionsResponseResults) =>
        <li 
            key={section.id} 
            className={styles['sections-item']}
            data-href={section.webUrl}
            onClick={() => {
                props.onClick(section.id);
            }}
            data-selected={(section.id === currentSection) ? true : false}
        >
            {section.webTitle}
        </li>
    );
    
    return (
        <div className={styles['sections-container']}>
            <div 
                className={`'hidden' ${styles['sections-item']} ${styles['sections-toggle']}`} 
                data-iscollapsed={isCollapsed} 
                onClick={() => setIsCollapsed(!isCollapsed)}>
                    Sections
                    <HamburgerIcon isCollapsed={isCollapsed}/>
            </div>
            <ul className={styles.sections} data-iscollapsed={isCollapsed}>
                {items}
            </ul>
        </div>
    );
}