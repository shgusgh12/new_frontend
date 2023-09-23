import { useEffect, useState } from "react";
import { CardContainer } from "../../../../components/Container";
import { DropDown } from "../../../../components/DropDown";
import { Ticker, RateOfChange, HoldingStock, RecentTransaction } from "../../../../components/Stock";
import { PreviewLineChart } from "../../../../components/Chart";
import Chart from "react-apexcharts";

import styles from "./Portfolio.module.scss";

export default function Portfolio() {
    const [selected, setSelected] = useState({ index: -1, value: "포트폴리오 선택" });

    return (
        <section className={styles.section}>
            <DropDown.Container width="225px" get={selected} set={setSelected}>
                <DropDown.Item>유의_포트폴리오 1</DropDown.Item>
                <DropDown.Item>유의_포트폴리오 2</DropDown.Item>
                <DropDown.Item>유의_포트폴리오 3</DropDown.Item>
                <DropDown.Item>유의_포트폴리오 4</DropDown.Item>
            </DropDown.Container>

            <div className={styles.top_wrapper}>
                <CardContainer title="총 평가자산" width="275px" height="120px">
                    <h1 className={styles.total_assets}>
                        <span>{(10000000).toLocaleString()}</span>
                        <span>원</span>
                    </h1>
                </CardContainer>

                <CardContainer title="누적수익률" width="150px" height="120px">
                    <h1 className={styles.total_ror}>0.0%</h1>
                </CardContainer>

                <CardContainer width="725px" height="120px">
                    <div className={styles.top_item}>
                        <div className={styles.total_cash}>
                            <h4>보유현금</h4>
                            <h1>
                                <span>{(10000000).toLocaleString()}</span>
                                <span>원</span>
                            </h1>
                        </div>

                        <div className={styles.total_earn}>
                            <h4>평가수익금</h4>
                            <h1>
                                <span>{(0).toLocaleString()}</span>
                                <span>원</span>
                            </h1>
                        </div>

                        <div className={styles.total_eval}>
                            <h4>주식평가금</h4>
                            <h1>
                                <span>{(0).toLocaleString()}</span>
                                <span>원</span>
                            </h1>
                        </div>
                    </div>
                </CardContainer>
            </div>

            <div className={styles.bottom_wrapper}>
                <CardContainer width="450px" height="600px" title="보유 종목">
                    <div className={styles.total_hold}>
                        <Chart
                            type="pie"
                            series={[66, 24, 10]}
                            options={{
                                chart: {
                                    id: "pie",
                                },
                                labels: ["AAPL", "NVDA", "U"],
                                dataLabels: {
                                    enabled: false,
                                },
                                legend: {
                                    position: "bottom",
                                    width: "100%",
                                    verticalAlign: "center",
                                },
                            }}
                        />
                    </div>
                </CardContainer>

                <CardContainer width="450px" height="600px" title="보유 종목 등락">
                    <HoldingStock
                        width="400px"
                        height="80px"
                        chartWidth={250}
                        chartHeight={80}
                        ticker="NVDA"
                        dataX={[1, 2, 3, 4, 5, 6, 7, 8]}
                        dataY={[0, 2, 5, 2, 6, 3, 1, 5]}
                        color={"#45cf7f"}
                        rateOfChange={12}
                    />

                    <HoldingStock
                        width="400px"
                        height="80px"
                        chartWidth={250}
                        chartHeight={80}
                        ticker="AAPL"
                        dataX={[1, 2, 3, 4, 5, 6, 7, 8]}
                        dataY={[0, 2, 5, 2, 6, 3, 1, 5]}
                        color={"#3993FA"}
                        rateOfChange={-12}
                    />

                    <HoldingStock
                        width="400px"
                        height="80px"
                        chartWidth={250}
                        chartHeight={80}
                        ticker="NVDA"
                        dataX={[1, 2, 3, 4, 5, 6, 7, 8]}
                        dataY={[0, 2, 5, 2, 6, 3, 1, 5]}
                        color={"#FF8F48"}
                        rateOfChange={-5}
                    />
                </CardContainer>

                <CardContainer width="250px" height="600px" title="최근 거래 기록">
                    <RecentTransaction.Container year={2023} month={7} date={13}>
                        <RecentTransaction.Item ticker="AAPL" color="#FF8F48" amount={10} price={100000} />
                        <RecentTransaction.Item ticker="AAPL" color="#FF8F48" amount={10} price={100000} />
                        <RecentTransaction.Item ticker="AAPL" color="#FF8F48" amount={10} price={100000} />
                    </RecentTransaction.Container>

                    <RecentTransaction.Container year={2023} month={7} date={12}>
                        <RecentTransaction.Item ticker="NVDA" color="#3993FA" amount={10} price={100000} />
                        <RecentTransaction.Item ticker="NVDA" color="#3993FA" amount={10} price={100000} />
                        <RecentTransaction.Item ticker="NVDA" color="#3993FA" amount={10} price={100000} />
                    </RecentTransaction.Container>
                </CardContainer>
            </div>
        </section>
    );
}
