import styles from './Order.module.scss';
import Apple from '../../../../assets/apple.svg';
import Minus from '../../../../assets/btnminus.svg';
import Plus from '../../../../assets/btnplus.svg';
import StockChart from '../../../../components/StockChart';
import Search from '../../../../assets/search.svg';
import { DropDown } from '../../../../components/DropDown';
import { useState } from 'react';
const Order = () => {
    const [selected, setSelected] = useState({ index: -1, value: "포트폴리오 선택" });
    return(
        <div className={styles.container}>
            <div className={styles.chartContainer}>
                <div className={styles.stockInfo}>
                    <div className={styles.stockContents}>
                        <StockName></StockName>
                        <StockPrice></StockPrice>
                        <StockTransaction transAmount={10000} transactionPrice={10000}></StockTransaction>
                    </div>
                    <StockSearch></StockSearch>
                </div>
                <div className={styles.chart}>
                    <StockChart></StockChart>
                </div>
            </div>
            <div className={styles.orderContainer}>
                <DropDown.Container width="100%" get={selected} set={setSelected}>
                    <DropDown.Item>유의_포트폴리오 1</DropDown.Item>
                    <DropDown.Item>유의_포트폴리오 2</DropDown.Item>
                    <DropDown.Item>유의_포트폴리오 3</DropDown.Item>
                    <DropDown.Item>유의_포트폴리오 4</DropDown.Item>
                </DropDown.Container>
                <div className={styles.orderMenu}>
                    <OrderType></OrderType>
                    <OrderQuantity></OrderQuantity>
                    <OrderPercent></OrderPercent>
                    <div style={{marginBottom : '24px'}}> 
                        <hr></hr>
                    </div>
                    <OrderView></OrderView>
                    <OrderStock></OrderStock>
                </div>
                
            </div>
        </div>
    )
}

const StockName = () => {
    return(
        <div className={styles.stockName}>
            <img src={Apple}></img>
            <p>애플</p>
        </div>
    );
}

const StockPrice = () => {
    const price = 10000;
    const priceChange = 0.19
    const pricePercent = 0.14
    return(
        <div className={styles.stockPrice}>
            <span>${price}</span>
            <div className={styles.stockRate}>
                <PriceColor priceChange={priceChange}></PriceColor>
                <PriceColor priceChange={pricePercent}></PriceColor>
            </div>
            
        </div>
    );
}

const PriceColor = ({priceChange}) => {
    const positiveStyle = {
        color: 'red',
    };
    
    const negativeStyle = {
        color: 'blue',
    };

    const priceChangeStyle = priceChange >= 0 ? positiveStyle : negativeStyle

    return <span style={priceChangeStyle}>+{priceChange}</span>
}

const StockTransaction = () => {
    // const transAmount = transAmount;
    // const transactionPrice = transactionPrice;
    
    return(
        <div className={styles.stockTransaction}>
            <div className={styles.transactionAmount}>
                <p>거래량</p>
                <span>68,483,589</span>
            </div>
            <div className={styles.transactionPrice}>
                <p>거래대금</p>
                <span>$109억 2,89만</span>
            </div>
        </div>
    );
}
const StockSearch = () => {
    return( 
        <form className={styles.stockSearch}>
            <input placeholder='종목 검색'></input>
            <button>
                <img src={Search}></img>
            </button>
        </form>
    );
}

const OrderType = () => {
    const [buyType, setBuyType] = useState('');
    const handleType = (e) => {
        setBuyType(e.target.value);
        console.log(buyType)
    } 
    return (
       <div className={styles.orderType}>
            <input type='radio' name='orderType' ></input>
            <p>지정가</p>
            <input type='radio' name='orderType' ></input>
            <p>현재가</p>
       </div>
    );
}

const OrderQuantity = () => {
    let [share, setShare] = useState(0);
    let [won, setWon] = useState(0);
    let plusShare = () => {
        setShare(share + 1);
    }
    let minusShare = () => {
        if(share > 0){
            setShare(share - 1);
        }
        else{
            return
        }
    }
    let plusWon = () => {
        setWon(won + 1);
    }
    let minusWon = () => {
        if(won > 0){
            setWon(won - 1);    
        }
        else{
            return
        }
    }

    return(
        <div className={styles.orderQuantity}>
            <div className={styles.volume}>
                <p>수량</p>
                <div className={styles.orderBtn}>
                    <img onClick={minusShare} src={Minus} style={{background: '#EDFFEF'}}></img>
                    <span>{share} 주</span>
                    <img onClick={plusShare} src={Plus} style={{background : '#0ECB81'}}></img>
                </div>
            </div>
            <div className={styles.price}>
                <p>가격</p>
                <div className={styles.orderBtn}>
                    <img onClick={minusWon} src={Minus} style={{background: '#EDFFEF'}}></img>
                    <span>{won} 원</span>
                    <img onClick={plusWon} src={Plus} style={{background : '#0ECB81'}}></img>
                </div>
            </div>
        </div>
    );
}

const OrderPercent = () => {
    const [percent, setPercent] = useState([10,25,50,100]);
    return(
        <div className={styles.percentContainer}>
            {
                percent.map((item, index) => {
                    return(
                        <div className={styles.percentBtn}>{item}%</div>
                    )
                })
            }
        </div> 
    );
}

const OrderView = ({ /*price*/ }) => {


    return(
        <div className={styles.orderView}>
            <div className={styles.orderPrice}>
                <p>주문단가</p>
                <p><span>{0}</span> 원</p>
            </div>
            <div className={styles.orderPrice}>
                <p>주문총액</p>
                <p><span>{0}</span> 원</p>
            </div>

        </div>
    );
}

const OrderStock = () => {
    return(
        <div className={styles.orderStock}>
            <button>매수하기</button>
            <button style={{background : '#0ECB81'}} >매도하기</button>
        </div>
    );
}


export default Order;