import Container from '../../../components/Container';
import Favorite from './body/Favorite';
import Order from './body/Order';
import Account from './body/Account';
import styles from './Experiment.module.scss';
import React, { useState } from 'react';
function Experiment() {
  const [select, setSelect] = useState(0);
  const buttons = [
    { text: '관심종목' },
    { text: '포트폴리오' },
    { text: '주식주문' },
  ];
  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '23px' }}>
        <div className={styles.menu}>
          {buttons.map((item, index) => {
            return (
              <>
                <button
                  className={`${select === index ? styles['selected'] : ''}`}
                  onClick={() => setSelect(index)}
                >
                  {item.text}
                </button>
              </>
            );
          })}
        </div>
      </div>
      {[<Favorite></Favorite>, <Account></Account>, <Order></Order>][select]}
    </div>
  );
}

export default Experiment;
