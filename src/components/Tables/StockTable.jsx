import { Table } from "../Table";

const StockTable = () => {
    return(
        <Table.Container  ratio={[1,1,1,1,1,1]} width="100%">
            <Table.Head>
                <Table.Row  fontSize='14px' color='#989898' height="30px">
                    <Table.Col position="center-center"></Table.Col>
                    <Table.Col position="center-center">평가손익</Table.Col>
                    <Table.Col position="center-center">잔고수량</Table.Col>
                    <Table.Col position="center-center">평균매입가</Table.Col>
                    <Table.Col position="center-center">매도가</Table.Col>
                    <Table.Col position="center-center">손익분기매입가</Table.Col>
                </Table.Row>
                <Table.Row borderBottom fontSize='14px' color='#989898' height="40px">
                    <Table.Col >종목</Table.Col>
                    <Table.Col position="center-center">평가손익</Table.Col>
                    <Table.Col position="center-center">현재가</Table.Col>
                    <Table.Col position="center-center">등락률</Table.Col>
                    <Table.Col position="center-center">등락률</Table.Col>
                    <Table.Col position="center-center">등락률</Table.Col>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row borderBottom height="50px" fontSize='14px'>
                    <Table.Col>#1</Table.Col>
                    <Table.Col>삼성전자</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col >11.8%</Table.Col>
                </Table.Row>
                <Table.Row height="55px" fontSize='14px'>
                    <Table.Col >#2</Table.Col>
                    <Table.Col>AAPL</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col >7.31%</Table.Col>
                </Table.Row>
                <Table.Row height="55px" fontSize='14px'>
                    <Table.Col >#3</Table.Col>
                    <Table.Col>INVSC QQQ TRUST SRS</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col >11.8%</Table.Col>
                </Table.Row>
                <Table.Row height="55px" fontSize='14px'>
                    <Table.Col >#4</Table.Col>
                    <Table.Col>AAPL</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col >7.31%</Table.Col>
                </Table.Row>
                <Table.Row height="55px" fontSize='14px'>
                    <Table.Col >#5</Table.Col>
                    <Table.Col>AAPL</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col>55,100</Table.Col>
                    <Table.Col >7.31%</Table.Col>
                </Table.Row>  
            </Table.Body>
        </Table.Container>
    );
}

export default StockTable;