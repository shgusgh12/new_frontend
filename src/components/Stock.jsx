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

export const RateOfChange = ({ value }) => {
    if (Number(value) > 0) {
        return (
            <div className={styles.rate_of_change}>
                <span>
                    <FontAwesomeIcon icon={faCaretUp} color="#0ECB81" />
                </span>
                <span style={{ color: "#0ECB81" }}>{value} %</span>
            </div>
        );
    }
    if (Number(value) < 0) {
        return (
            <div className={styles.rate_of_change}>
                <span>
                    <FontAwesomeIcon icon={faCaretDown} color="#F6465D" />
                </span>
                <span style={{ color: "#F6465D" }}>{value} %</span>
            </div>
        );
    }
    if (Number(value) == 0) {
        return (
            <div className={styles.rate_of_change}>
                <span>
                    <FontAwesomeIcon icon={faMinus} />
                </span>
                <span>{value} %</span>
            </div>
        );
    }
};
