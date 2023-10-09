import React, { useState } from "react";
import styles from './PortModal.module.scss';

const PortModal = ({ setModalOpen, }) =>  {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <div className={styles.container}>
            <div className={styles.modalContents}>
                <button className={styles.close} onClick={closeModal}>X</button>
                <div className={styles.name}>
                    <p>생성할 포트폴리오 이름</p>
                    <input></input>
                </div>
                <div className={styles.amount}>
                    <p>포트폴리오 자금 설정</p>
                    <div className={styles.buttonContainer}>
                        <button>1천만원</button>
                        <button>3천만원</button>
                        <button>5천만원</button>
                    </div>
                </div>
                <div className={styles.create}>
                    <button>포트폴리오 생성하기</button>
                    {/* 생성하기를 누르는 순간 post 요청 보내고 그 다음에 get요청으로 현재 포트폴리오 뭐가 있는지 보여줌
                     + index 컴포넌트로 올려주고 */}
                </div>
                
            </div>
        </div>

    );
}

export default PortModal;