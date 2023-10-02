import { useLayoutEffect, useState } from "react";
import styles from "./Calender.module.scss";

import { Ticker } from "./Stock";

const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const getCalendarDate = (year, month) => {
    const now = new Date(year, month - 1);
    // firstDay : 해당 month 의 첫번째 요일
    const firstDay = now.getDay();
    // lastDate : 해당 month 의 마지막 날짜
    const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    let date = new Array(firstDay).fill();
    return { placeholder: date, date: new Array(lastDate).fill().map((element, index) => index + 1) };
};

// 마음에안듦,, 코드 리팩토링 필요해보임,,,,,,,,,,,,,,,,,,,,,,,,,

export const CalendarItem = ({ date, children, itemRef, ...rest }) => {
    return (
        <div className={styles.item} ref={itemRef} {...rest}>
            <div className={styles.date}>
                <span>{date}</span>
                <div>{children}</div>
            </div>
        </div>
    );
};

export const Calendar = ({ year, month, data, itemWidth, itemHeight }) => {
    // initialState: 오늘날짜에 해당하는 date Element
    const [selectedDate, setSelectedDate] = useState(null);

    const handleClick = (e) => {
        // 이전 selectedDate 의 active class 제거후, 새로운 selectedDate 설정
        // useState 훅은 비동기로 실행되므로, e.target에 active class 적용
        if (selectedDate != null) {
            selectedDate.classList.remove(`${styles.item_active}`);
            e.target.classList.add(styles.item_active);
            setSelectedDate(e.target);
        } else {
            setSelectedDate(e.target);
        }
    };

    useLayoutEffect(() => {
        // 캘린더 month 가 이번달이 아닌경우에 예외처리 해줘야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const today = new Date().getDate();
        const dateElements = document.querySelectorAll(`.${styles.item} > div > span`);
        // 컴포넌트 마운트시 오늘날짜를 selectedDate 초기값으로 적용
        // (이진탐색으로 바꾸면 속도빠를듯)
        for (const element of dateElements) {
            if (Number(element.innerHTML) == today) {
                // span 태그 내의 날짜가 오늘날짜와 일치하는 경우
                // span 태그의 조상노드인 item element 에 item_active 클래스 적용
                element.parentElement.parentElement.classList.add(styles.item_active);
                setSelectedDate(element.parentElement.parentElement);
                break;
            }
        }
    }, []);

    return (
        <div className={styles.wrapper} style={{ width: `${itemWidth.slice(0, -2) * 7}px` }}>
            <div className={styles.head_container} style={{ width: `${itemWidth.slice(0, -2) * 7}px` }}>
                {
                    // 요일
                    day.map((element, index) => {
                        return (
                            <div key={index} style={{ width: itemWidth }}>
                                {element}
                            </div>
                        );
                    })
                }
            </div>
            <div
                className={styles.body_container}
                style={{
                    width: `${itemWidth.slice(0, -2) * 7}px`,
                    gridTemplateColumns: `repeat(7, ${itemWidth})`,
                    gridTemplateRows: `repeat(5, ${itemHeight})`,
                }}>
                {
                    // placeholder : 시작날짜 전까지 빈 div element 리턴
                    getCalendarDate(year, month).placeholder.map((date, index) => {
                        return <CalendarItem key={index} date={date} onClick={handleClick}></CalendarItem>;
                    })
                }
                {
                    // date : 시작날짜 이후 날짜가 들어간 div element 리턴
                    getCalendarDate(year, month).date.map((date, index) => {
                        const dateEvent = data.find((element) => element.date === index + 1);
                        if (dateEvent) {
                            return (
                                <CalendarItem key={index} date={date} onClick={handleClick}>
                                    {dateEvent.content.map((content) => {
                                        if (content > 0) return <p style={{ color: "#0ECB81" }}>+{content.toLocaleString()}</p>;
                                        else return <p style={{ color: "#F6465D" }}>{content.toLocaleString()}</p>;
                                    })}
                                </CalendarItem>
                            );
                        } else {
                            return <CalendarItem key={index} date={date} onClick={handleClick} />;
                        }
                    })
                }
            </div>
        </div>
    );
};

export const CalendarAside = {
    Container: ({ children, year, month, date }) => {
        return (
            <div className={styles.aside_container}>
                <div className={styles.aside_head}>
                    <div className={styles.transaction_count}>
                        <h3>이날의 거래</h3>
                        <div className={styles.indicator}>{children.length}</div>
                    </div>

                    <div className={styles.transaction_date}>
                        <h4>
                            {year}.{month}.{date}
                        </h4>
                    </div>
                </div>

                <div className={styles.aside_body}>{children}</div>
            </div>
        );
    },
    Item: ({ type, ticker, color, amount, price }) => {
        return (
            <div className={styles.aside_item}>
                <Ticker ticker={ticker} color={color} />
                <div className={styles.item_description}>
                    <p>{amount}주</p>
                    <p style={{ color: type === "매수" && "#F6465D" }}>{type}</p>
                    <p>
                        {price > 0 && "-"}
                        {price.toLocaleString()}원
                    </p>
                </div>
            </div>
        );
    },
};
