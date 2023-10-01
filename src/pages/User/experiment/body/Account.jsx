import React, { useEffect, useRef } from "react";
import styles from './Account.module.scss';
import PieChart from "../../../../components/PieChart";
import PieText from "../../../../components/PieText";
import AccountTable from "../../../../components/Tables/AccountTable";
import StockTable from "../../../../components/Tables/StockTable";
const Account = () => {
    const data = [
        { id: 'cola', value: 800 },
        { id: 'cidar', value: 88 },
        { id: 'fanta', value: 221 },
        { id: 'coffee', value: 88 },
        { id: 'orange', value: 88 },
        { id: 'lime', value: 48 },
        { id: 'lemon', value: 28 },
        { id: 'peach', value: 88 },
    ]

    const color  = ['#F25840', '#FF7F50','#FED749','#1DE180','#89EAF3','#54B6FF','#A65CF4','#E19EC7','#465A65']

    return(
        <div className={styles.container}>
            <div className={styles.leftContent}>
                <div className={styles.total}>
                    <AccountTable></AccountTable>
                </div>
                <div className={styles.stock}>
                    <StockTable></StockTable>
                </div>
            </div>
            <div className={styles.rightContent}>
                <PieChart height={'250px'} width={'200px'} color={color} data={data}></PieChart>
                <PieText data={data} color={color}></PieText>
            </div>
        </div>
    );
}




export default Account;