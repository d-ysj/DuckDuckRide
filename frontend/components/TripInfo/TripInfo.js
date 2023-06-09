import { FlatList, StyleSheet, Button, Text, View, TouchableOpacity, Image } from 'react-native';

import React, { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useNavigation } from '@react-navigation/native';

const TripInfo = ({ role, userId }) => {

    // const [userId, setUserId] = useState(null);
    const [startData, setStartData] = useState(null);
    const [endData, setEndData] = useState(null);

    const navigation = useNavigation();
    const requestRiderListInfo = async () => {
        try {
            const queryParams = new URLSearchParams({
                findstart: true,
                stLat: startData.stLat,
                stLon: startData.stLon,
                enLat: endData.enLat,
                enLon: endData.enLon,
                near: 10
            });

            const response = await fetch(`http://localhost:8000/api/ride?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            if (json) {
                navigation.navigate("RiderList", { riderListData: json, stAddr: startData.stAddr, enAddr: endData.enAddr });
            } else {
                console.error("Failed to fetch rider list data");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const createRide = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/ride', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    driverId: userId,
                    passengersId: [],
                    ...startData,
                    ...endData,
                }),
            });

            const json = await response.json();
            if (json) {
                if (!json.ok) console.error('Server Error!');
                else navigation.navigate("RideInfo-Driver", { selectedItem: null });
            }
            else {
                console.error('Empty response body');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addRide = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/ride', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    passengersId: [],
                    ...startData,
                    ...endData,
                }),
            });
            const json = await response.json();
            if (json) {
                if (!json.ok) console.error('Server Error!');
            }
            else {
                console.error('Empty response body');
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={{ flexDirection: 'column' }}>
            <GooglePlacesAutocomplete
                placeholder="From"
                styles={{
                    container: {
                        flex: 0,
                        width: '100%',
                    },
                    textInput: {
                        fontSize: 18,
                    }
                }}
                onPress={(data, details = null) => {
                    setStartData({
                        stLat: details.geometry.location.lat,
                        stLon: details.geometry.location.lng,
                        stAddr: data.description
                    });
                }}
                fetchDetails={true}
                returnKeyType={'search'}
                minLength={2}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
            <GooglePlacesAutocomplete
                placeholder="To"
                styles={{
                    container: {
                        flex: 0,
                        width: '100%',
                    },
                    textInput: {
                        fontSize: 18,
                    }
                }}
                onPress={(data, details = null) => {

                    setEndData({
                        enLat: details.geometry.location.lat,
                        enLon: details.geometry.location.lng,
                        enAddr: data.description
                    });
                }}
                fetchDetails={true}
                returnKeyType={'search'}
                minLength={2}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />

            <TouchableOpacity
                onPress={async () => {
                    if (role === 'driver') await createRide();
                    else if (role === 'passenger') {
                        await addRide();
                        await requestRiderListInfo();
                    }

                }}
                style={{ ...styles.container }}
            >
                <View>
                    <Text style={styles.text}>Continue</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default TripInfo

const styles = StyleSheet.create({
    TouchableOpacity: {
        width: 50,
        height: 50
    }
})