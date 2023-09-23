import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faMinus } from "@fortawesome/free-solid-svg-icons";

import styles from "./Stock.module.scss";
import { PreviewLineChart } from "./Chart";

export const Ticker = ({ color, ticker }) => {
    return (
        <div className={styles.ticker}>
            <span style={{ backgroundColor: color }} />
            <span>{ticker}</span>
        </div>
    );
};
