import React, { ForwardedRef, useCallback, useMemo, useState } from 'react';
import { GestureResponderEvent, ImageBackground, ImageSourcePropType, View, ViewProps } from 'react-native';
import { styles } from './style';
// import { ILineProps, Line } from '../Line'; // Use this import to test drawing with react-native-canvas
import { ILineProps, Line } from '../SVGLine';
import { IPoint } from '../../utils/types';
import { distanceBetweenPoints } from '../../utils/geometry';



export interface IInteractiveCanvasHandle {
    clear(): void
}

export interface IInteractiveCanvasProps extends ViewProps {
    backgroundImage: ImageSourcePropType
};

const minLineLength = 10;




export const InteractiveCanvas = React.forwardRef<IInteractiveCanvasHandle, IInteractiveCanvasProps>((
    props: IInteractiveCanvasProps,
    forwardedRef: ForwardedRef<IInteractiveCanvasHandle>,
) => {
    const {
        backgroundImage,
        ...viewProps
    } = props;

    const [lineStart, setLineStart] = useState<IPoint>();
    const [lineEnd, setLineEnd] = useState<IPoint>();
    const [lines, setLines] = useState<ILineProps[]>([]);

    // Create ref handle
    React.useImperativeHandle(forwardedRef, () => ({
        clear() {
            setLines([]);
        }
    }), [setLines]);

    // Calculate new line geometry
    const newLineProps = useMemo<ILineProps | undefined>(() => {
        if (!lineStart || !lineEnd) return;

        const fromBottomCorner = (lineStart.x < lineEnd.x) ?
            (lineStart.y > lineEnd.y) :
            (lineStart.y < lineEnd.y);
        return {
            start: lineStart,
            end: lineEnd,
            fromBottomCorner,
        };
    }, [lineStart, lineEnd]);

    // Handle touches to draw new line
    const onTouchStart = useCallback((event: GestureResponderEvent) => {
        setLineStart({
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
        });
    }, []);

    const onTouchMove = useCallback((event: GestureResponderEvent) => {
        if (!lineStart) return;

        const point = {
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
        };
        const distance = distanceBetweenPoints(lineStart, point);
        if (distance < minLineLength) setLineEnd(undefined);
        else setLineEnd(point);
    }, [lineStart]);

    const onTouchEnd = useCallback((event: GestureResponderEvent) => {
        setLineStart(undefined);
        setLineEnd(undefined);

        if (newLineProps) {
            setLines([...lines, newLineProps]);
        }
    }, [lines, newLineProps]);

    const onTouchCancel = useCallback((event: GestureResponderEvent) => {
        setLineStart(undefined);
        setLineEnd(undefined);
    }, []);

    return (
        <View {...viewProps}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
        >
            <ImageBackground
                style={styles.background}
                source={backgroundImage}
            />

            {
                lines.map(
                    (line, index) => <Line {...line}
                        key={`line_${index}`}
                    />
                )
            }

            {newLineProps &&
                <Line {...newLineProps} />
            }
        </View>
    );
});
