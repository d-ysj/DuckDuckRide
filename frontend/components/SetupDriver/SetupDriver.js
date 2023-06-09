import React from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import NavOptions from '../NavOptions/NavOptions';
import TripInfo from '../TripInfo/TripInfo';
import Counter from '../Counter/Counter';
import { useNavigation } from '@react-navigation/native';


const SetupDriver = () => {
    const route = useRoute();
    const { userId } = route.params;
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    style={{ height: 50, width: 50, resizeMode: 'contain' }}
                    source={
                        require('../../assets/logo.jpeg')
                    }
                />
                <TripInfo role='driver' userId={userId} />
                <Counter />
            </View>
            <Image
                style={{ height: '100%', width: '100%', resizeMode: 'contain', flex: 1, justifyContent: 'center', alignContent: 'center' }}
                source={
                    require('../../assets/background.png')
                }
            />
        </SafeAreaView>
    )
}

export default SetupDriver;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 5,
        backgroundColor: '#fff', // add this to set the background color to white
    },
});
