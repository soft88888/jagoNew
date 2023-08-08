import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';

const QrScreen = (props) => {

    const { qrcode } = useSelector((state) => state.base);

    const BackBtnPress = () => {
        props.navigation.push('PromanageMain')
    }

    return (
        <View style={styles.allcontent}>
            <Header {...props} BtnPress={BackBtnPress} title={'项目'} proNoName={true} />
            <View style={styles.container}>
                <QRCode value={qrcode} size={250} />
            </View>
            <View style={{ position: 'relative', marginTop: '100%', alignSelf: 'center' }}>
                <Text style={{ fontSize: 20, color: 'black' }}>{qrcode}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    allcontent: {
        position: 'relative',
        backgroundColor: '#F2F2F2',
        flexDirection: 'column'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: '20%',
        backgroundColor: '#F2F2F2',
    },
});

export default QrScreen;