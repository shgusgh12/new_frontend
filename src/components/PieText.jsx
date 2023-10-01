import styles from './PieText.module.scss';

const PieText = ({data, color}) => {
    
    return(
        <div className={styles.textContainer}>
            {data.map((item, index) => 
            {
                return(
                    <div className={styles.pieText}>
                        <div style={{display:'flex' ,flexDirection:'row' ,gap:'12px', alignItems : 'center'}}>
                            <div style={{width :'12px', height:'12px',borderRadius:'50%', backgroundColor : `${color[index]}`}}></div><p>{item.id}</p> 
                        </div>
                        <span>{item.value}%</span>
                    </div>
                )
            })}
        </div>
    );
}

export default PieText;