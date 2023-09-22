import classNames from "classnames";
import styles from "./Container.module.scss";

export default function Container({ className, children }) {
    return <div className={classNames(className, styles.container)}>{children}</div>;
}

export const CardContainer = ({ title, width, height, children, ...rest }) => {
    return (
        <div className={styles.card_container} style={{ width: width, height: height }} {...rest}>
            {title && <h4>{title}</h4>}
            {children}
        </div>
    );
};
