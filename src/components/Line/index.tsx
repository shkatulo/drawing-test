import React, { useCallback, useMemo } from 'react';
import { ViewStyle } from "react-native"
import { IPoint } from "../../utils/types"
import { styles } from './style';
import Canvas from 'react-native-canvas';



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

    // Draw line
    const handleCanvas = useCallback((canvas: Canvas) => {
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;

        ctx.clearRect(0, 0, width, height);

        console.log(width, height);

        ctx.beginPath();
        ctx.moveTo(0, fromBottomCorner ? height : 0);
        ctx.lineTo(width, fromBottomCorner ? 0 : height);
        ctx.stroke();
    }, [width, height, fromBottomCorner]);


    return <Canvas
        ref={handleCanvas}
        style={style}
    />;
};
