import { useRef, useEffect } from "react";
import styles from './AccountTable.module.scss';

const AccountTable = () => {

    const tableRef = useRef(null);

    useEffect(() => {
        const table = tableRef.current;
        const thElements = table.querySelectorAll('th');
        const tdElements = table.querySelectorAll('td');
    
        const containerWidth = table.parentElement.offsetWidth;
        let totalThWidth = 0;
    
        // th 요소들의 너비를 측정하고 총 너비 계산
        thElements.forEach((th, index) => {
            const tdWidth = tdElements[index].offsetWidth;
            totalThWidth += tdWidth;
            th.style.marginRight = '0'; // 초기 margin을 0으로 설정
        });
    
        // 총 너비가 container의 width를 넘어가지 않도록 간격 설정
        const maxMargin = Math.floor((containerWidth - totalThWidth) / (thElements.length - 1));
        thElements.forEach((th, index) => {
            if (index < thElements.length - 1) {
            th.style.marginRight = `${maxMargin}px`;
            }
        });
        }, []);
    
    return(
        <div className={styles.table}>
            <table ref={tableRef}>
                <tr>
                    <th>총 평가자산</th>
                    <th>보유현금</th>
                    <th>누적수익률</th>
                    <th>평가수익금</th>
                    <th>주식평가금</th>
                </tr>
                <tr>
                    <td><span style={{color :'#00A968',fontWeight:'700'}}>10,000,000원</span></td>
                    <td>10,000,000원</td>
                    <td>0.00%</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
            </table>
        </div>
    );
}

export default AccountTable;