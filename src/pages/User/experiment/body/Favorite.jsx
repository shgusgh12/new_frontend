import { useState } from "react";
import styles from './Favorite.module.scss';
import Rank from "../../../../components/Rank";
const Favorite = () => {
    return(
      <div className={styles.container}>
        <div className={styles['table-container']}>
          <Rank name={'관심종목'}></Rank>
          <Rank name={'실시간 BEST'}></Rank>
        </div>
          <Tag ></Tag>
      </div>
    );
}


const Tag = () => {
  const [tag, setTag] = useState(['#삼성전자', '#AAPL', '#INVS QQQ TRUST SRS', '#카카오'])
  return(
    <>
      <div className={styles.tag}>
        <div className={styles.text}>
          <p>오늘 핫한 태그들👉</p>      
          {
            tag.map((item, index) => {
              return(
                <span className={tag}>{item}</span>
              );
            })
          }
        </div>
      </div>
      
    </>
    
  );
}
export default Favorite;