import classNames from "classnames";
import styles from "./Container.module.scss";

function Container({ className, children }) {
    return <div className={classNames(className, styles.container)}>{children}</div>;
}

export default Container;
