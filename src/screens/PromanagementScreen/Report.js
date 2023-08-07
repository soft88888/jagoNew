import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import Header from '../../components/Header';
import CStyles from '../../styles/CommonStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import { useSelector, useDispatch } from 'react-redux';

const Report = (props) => {

    const { projectItem } = useSelector((state) => state.base);

    useEffect(() => {
        fetchData();

    }, []);

    const [isVisible, setisVisible] = useState(false)

    const fetchData = () => {

    };

    const BackBtnPress = async () => {
        props.navigation.push('PromanageMain')
    };


    return (
        <View style={styles.allcontent}>
            <Header {...props} BtnPress={BackBtnPress} title={'项目管理'} />
            <View style={styles.main}>
                <Button
                    ButtonTitle={'盘点确认单'}
                    BtnPress={() => alert("")}
                    type={'yellowBtn'}
                    BTnWidth={300}
                    BTnHeight={"85%"}
                />
                <TouchableOpacity style={{zIndex:100000000,position:'absolute',right:70}}>
                    <Icon name="file-download" style={{alignSelf:'center',marginBottom:10}} color={'#FFFFFF'} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Button
                    ButtonTitle={'单品差异确认单'}
                    BtnPress={() => alert("")}
                    type={'yellowBtn'}
                    BTnWidth={300}
                    BTnHeight={"85%"}
                />
                <TouchableOpacity style={{zIndex:100000000,position:'absolute',right:70}}>
                    <Icon name="file-download" style={{alignSelf:'center',marginBottom:10}} color={'#FFFFFF'} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Button
                    ButtonTitle={'实盘清单'}
                    BtnPress={() => alert()}
                    type={'yellowBtn'}
                    BTnWidth={300}
                    BTnHeight={"85%"}
                />
                <TouchableOpacity style={{zIndex:100000000,position:'absolute',right:70}}>
                    <Icon name="file-download" style={{alignSelf:'center',marginBottom:10}} color={'#FFFFFF'} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Button
                    ButtonTitle={'片区报告'}
                    BtnPress={() => alert("")}
                    type={'yellowBtn'}
                    BTnWidth={300}
                    BTnHeight={"85%"}
                />
                <TouchableOpacity style={{zIndex:100000000,position:'absolute',right:70}}>
                    <Icon name="file-download" style={{alignSelf:'center',marginBottom:10}} color={'#FFFFFF'} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Button
                    ButtonTitle={'盘点数据'}
                    BtnPress={() => alert("")}
                    type={'yellowBtn'}
                    BTnWidth={300}
                    BTnHeight={"85%"}
                />
                <TouchableOpacity style={{zIndex:100000000,position:'absolute',right:70}}>
                    <Icon name="file-download" style={{alignSelf:'center',marginBottom:10}} color={'#FFFFFF'} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Button
                    ButtonTitle={'不在档盘点数据'}
                    BtnPress={() => alert()}
                    type={'yellowBtn'}
                    BTnWidth={300}
                    BTnHeight={"85%"}
                />
                <TouchableOpacity style={{zIndex:100000000,position:'absolute',right:70}}>
                    <Icon name="file-download" style={{alignSelf:'center',marginBottom:10}} color={'#FFFFFF'} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    allcontent: {
        position: 'relative',
        height: Dimensions.get('window').height,
        backgroundColor: '#F2F2F2',
    },
    main: {
        position: 'relative',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        height: "10%",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        height: '30%',
    },
    modalheader: {
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    modalMain: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBottom: {
        height: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});

export default Report;