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
            <Text style={{ alignSelf: 'center', marginBottom: 2 }}>{projectItem.id}</Text>
            <View style={styles.container}>
                <QRCode value={qrcode} size={250} />
            </View>
            <View style={{ position: 'relative', marginTop: '10%', alignSelf: 'center' }}>
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
        alignItems: 'center',
        marginTop: '20%',
        backgroundColor: '#F2F2F2',
        borderColor: '#DEEBFD',
        borderWidth: 2,
        width: 270,
        height: 270,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5
    },
});

export default QrScreen;