import styles from "./Ledger.module.scss";

import { Calendar, CalendarAside } from "../../../components/Calender";

const dummyData = [
    {
        date: 13,
        content: [123000, -123000],
    },
];

const data = [
    {
        date: 13,
        content: [
            {
                ticker: "AAPL",
                type: "매수",
                amount: 10,
                price: 124000,
            },
            {
                ticker: "AAPL",
                type: "매수",
                amount: 10,
                price: 124000,
            },
        ],
    },
];

export default function LedgerSection() {
    return (
        <section className={styles.section}>
            <Calendar year={2023} month={9} itemWidth="130px" itemHeight="150px" data={dummyData} />

            <CalendarAside.Container year={2023} month={9} date={24}>
                <CalendarAside.Item type={"매수"} ticker={"AAPL"} color={"#3993FA"} amount={10} price={124000} />
                <CalendarAside.Item type={"매수"} ticker={"AAPL"} color={"#3993FA"} amount={10} price={124000} />
            </CalendarAside.Container>
        </section>
    );
}
