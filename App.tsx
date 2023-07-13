import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { IInteractiveCanvasHandle, InteractiveCanvas } from './src/components/InteractiveCanvas';
import { useCallback, useRef } from 'react';



const ImageURI = 'https://images.pexels.com/photos/3472690/pexels-photo-3472690.jpeg?cs=srgb&dl=pexels-%C3%B6mer-ayd%C4%B1n-3472690.jpg&fm=jpg';



export default function App() {
    const canvasRef = useRef<IInteractiveCanvasHandle>(null);

    const onClearPress = useCallback(() => {
        canvasRef?.current?.clear();
    }, []);


    return (
        <View style={styles.container} >
            <StatusBar style="auto" />

            <InteractiveCanvas
                ref={canvasRef}
                style={styles.canvas}
                backgroundImage={{ uri: ImageURI }}
            />

            <View style={styles.bottomBar}>
                <SafeAreaView>
                    <Button
                        title="Clear"
                        color="white"
                        onPress={onClearPress}
                    />
                </SafeAreaView>
            </View>
        </View >
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    canvas: {
        flex: 1,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
});
