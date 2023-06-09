import React from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import Map from '../Map/Map';
import Card2 from '../Card2/Card2';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';

const RideInfoD = () => {
    const route = useRoute();
    const { selectedItem } = route.params;
    console.log(selectedItem);
    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* <Text>This is the RideInfo-Customer page</Text> */}
                <View style={tw`h-1/2`}>
                    <Map />
                </View >
                <View style={tw`h-1/2`}>
                    <Card2 />
                </View>

                {/* <View style={styles.container}> </View> */}
            </View>
        </SafeAreaView >
    )
}

export default RideInfoD;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        //     position: 'absolute',
        //     top: '50%',
        //     width: '100 %',
        // transform: 'translateY(-50 %)'
    }
})
