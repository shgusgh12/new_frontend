import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./PortDrop.module.scss";

const PortDrop =({options, onModal, onSelectedPort }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        onSelectedPort(value)
        console.log(value)
    };

    return (
        <div className={styles.dropContainer}>
            <div className={styles.dropheader} onClick={toggling}>
                {selectedOption || "포트폴리오 선택"}
                <span>
                    <FontAwesomeIcon icon={faCaretDown} />
                </span>
            </div>
            {isOpen && (
                <div className={styles.droplist}>
                    {options.map(option => (
                        <div className={styles.drop} onClick={onOptionClicked(option)}  key={Math.random()}>
                        {option}
                        </div>
                    ))}
                    <button className={styles.dropButton} onClick={onModal}>포트폴리오 추가</button>
                </div>
            )}
        </div>
    );
        
};

export default PortDrop;
