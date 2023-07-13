import React, { useMemo } from 'react';
import { ViewStyle } from "react-native"
import { IPoint } from "../../utils/types"
import { styles } from './style';
import { Svg, Line as SVGLine } from 'react-native-svg';



export interface ILineProps {
    start: IPoint
    end: IPoint
    fromBottomCorner?: boolean
};



export const Line: React.FC<ILineProps> = (props) => {
    const {
        start,
        end,
        fromBottomCorner,
    } = props;

    // Calculate line geometry and style
    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    const style = useMemo<ViewStyle>(() => ({
        left: x,
        top: y,
        width,
        height,
        ...styles.root
    }), [x, y, width, height]);


    return <Svg
        pointerEvents='none'
        width={width}
        height={height}
        style={style}
    >
        <SVGLine
            x1={0} y1={fromBottomCorner ? height : 0}
            x2={width} y2={fromBottomCorner ? 0 : height}
            stroke="white"
            strokeWidth={5}
        />
    </Svg>
};
