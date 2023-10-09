import { Table } from "./Table";
import styles from './Rank.module.scss';
import { getApi } from "../utils/http";
import { useEffect, useState } from "react";
import { sendRequestWithAccessToken } from "../utils/token";
import axios from "axios";

const Rank = ({name}) => {
    

    
  
    if(name === '관심종목'){
      
      
    }
    else{
      //아닐때
    }
    return(
      <div className={styles.rank}>
        <Table.Container  ratio={[1,3,1,1]} width="100%" padding='40px'>
          <h2>{name}</h2>
          <Table.Head>
            <Table.Row borderBottom fontSize='14px' color='#989898' height="50px">
                <Table.Col position="center-left">순위</Table.Col>
                <Table.Col position="center-center">종목명</Table.Col>
                <Table.Col position="center-center">현재가</Table.Col>
                <Table.Col position="center-right">등락률</Table.Col>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row height="55px" fontSize='14px'> 
              <Table.Col position='center-left'>#1</Table.Col>
              <Table.Col>삼성전자</Table.Col>
              <Table.Col>55,100</Table.Col>
              <Table.Col position="center-right">11.8%</Table.Col>
            </Table.Row>
            <Table.Row height="55px" fontSize='14px'>
              <Table.Col position='center-left'>#2</Table.Col>
              <Table.Col>AAPL</Table.Col>
              <Table.Col>55,100</Table.Col>
              <Table.Col position="center-right">7.31%</Table.Col>
            </Table.Row>
            <Table.Row height="55px" fontSize='14px'>
              <Table.Col position='center-left'>#3</Table.Col>
              <Table.Col>INVSC QQQ TRUST SRS</Table.Col>
              <Table.Col>55,100</Table.Col>
              <Table.Col position="center-right">11.8%</Table.Col>
            </Table.Row>
            <Table.Row height="55px" fontSize='14px'>
              <Table.Col position='center-left'>#4</Table.Col>
              <Table.Col>AAPL</Table.Col>
              <Table.Col>55,100</Table.Col>
              <Table.Col position="center-right">7.31%</Table.Col>
            </Table.Row>
            <Table.Row height="55px" fontSize='14px'>
              <Table.Col position='center-left'>#5</Table.Col>
              <Table.Col>AAPL</Table.Col>
              <Table.Col>55,100</Table.Col>
              <Table.Col position="center-right">7.31%</Table.Col>
            </Table.Row>  
          </Table.Body>
        </Table.Container>
      </div>
    );
  }
  
export default Rank;