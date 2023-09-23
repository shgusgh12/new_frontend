import { Outlet } from "react-router-dom";
import { NavAside } from "../../../components/Nav";

import styles from "./index.module.scss";

export default function MyPage() {
    return (
        <main className={styles.page}>
            <NavAside />
            <Outlet />
        </main>
    );
}
