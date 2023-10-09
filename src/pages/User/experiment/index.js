import Favorite from './body/Favorite';
import Order from './body/Order';
import Account from './body/Account';
import styles from './Experiment.module.scss';
import React, { useState } from 'react';
import PortModal from '../../../components/PortModal';
import PortDrop from '../../../components/PortDrop';
function Experiment() {
  const [select, setSelect] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const options = ['포트폴리오1', '포트폴리오2', '포트폴리오3', '포트폴리오4'];
  const [selectedPort, setSelectedPort] = useState(null);
  // 여기에 선택된 포트폴리오 이름이 들어가고 이걸 account에 props로 보내서 get요청 받으면됨
  const buttons = [
    { text: '관심종목' },
    { text: '포트폴리오' },
    { text: '주식주문' },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
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
        {select === 1 && (
          <>
            <div style={{ width: '200px' }}>
              <PortDrop
                options={options}
                onModal={showModal}
                onSelectedPort={setSelectedPort}
              ></PortDrop>
            </div>
          </>
        )}
      </div>
      {[<Favorite></Favorite>, <Account></Account>, <Order></Order>][select]}
      {modalOpen && <PortModal setModalOpen={setModalOpen} />}
    </div>
  );
}

export default Experiment;
