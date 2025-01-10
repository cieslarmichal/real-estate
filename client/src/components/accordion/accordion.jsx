import { useState } from 'react';
import styles from './accordion.module.css';

function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.accordionItem}
        >
          <div
            className={styles.accordionHeader}
            onClick={() => toggleItem(index)}
          >
            {item.title}
            <span className={styles.accordionIcon}>{index === activeIndex ? '-' : '+'}</span>
          </div>
          {activeIndex === index && (
            <div className={styles.accordionContent}>
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
