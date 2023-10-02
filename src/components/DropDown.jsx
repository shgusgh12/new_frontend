import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./DropDown.module.scss";

export const DropDown = {
    Container: ({ get, set, children, width, ...rest }) => {
        const container = useRef();
        const [toggleOpen, setToggleOpen] = useState(false);

        const handleClick = (e) => {
            setToggleOpen(!toggleOpen);
        };

        useLayoutEffect(() => {
            // container border radius 조정
            if (toggleOpen) {
                container.current.style.borderBottomLeftRadius = "0px";
                container.current.style.borderBottomRightRadius = "0px";
            } else {
                container.current.style.borderBottomLeftRadius = "20px";
                container.current.style.borderBottomRightRadius = "20px";
            }
        }, [toggleOpen]);

        useLayoutEffect(() => {
            // 하위 element 에 eventListener 부착
            if (toggleOpen) {
                const items = document.querySelector(`.${styles.items}`);
                for (let idx = 0; idx < items.children.length; idx++) {
                    items.children[idx].addEventListener("click", () => {
                        set({ index: idx, value: items.children[idx].innerHTML });
                        setToggleOpen(false);
                    });
                }
            }
        }, [toggleOpen]);

        return (
            <div ref={container} className={styles.container} style={{ width: width }} {...rest} onClick={handleClick}>
                <div className={styles.content}>
                    <span>{get.value}</span>
                    <span>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                </div>
                {toggleOpen && <div className={styles.items}>{children}</div>}
            </div>
        );
    },
    Item: ({ children, ...rest }) => {
        return (
            <div className={styles.item} {...rest}>
                {children}
            </div>
        );
    },
};
