import * as React from 'react';
import { ResponsivePie } from '@nivo/pie';
const Piechart = ({data, color, height, width}) => {
    
    const handle = {
        padClick: (data) => {
            console.log(data);
        },
    };

    return (
        <div>
            <div style={{height: height, width : width}}>
                <div style={{ width: '100%', height: '100%', }}>
                    <ResponsivePie 
                        /**
                         * chart에 사용될 데이터
                         */
                        data={data}
                        sortByValue={false}
                        /**
                         * chart margin
                         */
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        /**
                         * chart 중간 빈공간 반지름
                         */
                        innerRadius={0.25}
                        /**
                         * pad 간격
                         */
                        padAngle={0.5}
                        /**
                         * pad radius 설정 (pad별 간격이 있을 시 보임)
                         */
                        cornerRadius={1}
                        /**
                         * chart 색상
                         */
                        colors={color} // 커스터하여 사용할 때
                        // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                        /**
                         * pad border 두께 설정
                         */
                        borderWidth={0}
                        /**
                         * link label skip할 기준 각도
                         */
                        arcLinkLabelsSkipAngle={360}
                        /**
                         * link label 색상
                         */
                        arcLinkLabelsTextColor="#000000"
                        /**
                         * link label 연결되는 선 두께
                         */
                        arcLinkLabelsThickness={2}
                        /**
                         * link label 연결되는 선 색상
                         */
                        arcLinkLabelsColor={{ from: 'color' }} // pad 색상에 따라감
                        /**
                         * label (pad에 표현되는 글씨) skip할 기준 각도
                         */
                        arcLabelsSkipAngle={360}
                        isInteractive={true}
                        theme={{
                            /**
                             * label style (pad에 표현되는 글씨)
                             */
                            
                            /**
                             * legend style (default로 하단에 있는 색상별 key 표시)
                             */
                            
                        }}
                        /**
                         * pad 클릭 이벤트
                         */
                        onClick={handle.padClick}
                        /**
                         * legend 설정 (default로 하단에 있는 색상별 key 표시)
                         */
                    />
                </div>
            </div>
        </div>
    );
};

export default Piechart;