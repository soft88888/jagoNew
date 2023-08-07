import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Modal, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import Header from '../../components/Header';
import ApiObject from '../../support/Api';

const Personal = (props) => {

    const { projectItem } = useSelector((state) => state.base);
    const [data, setData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const result = await ApiObject.projectmemberList({
            id: projectItem.id,
        })
        setData(result)
    };

    const BackBtnPress = async () => {
        props.navigation.push('PromanageMain')
    };



    const renderItem = ({ item }) => {
        return (
            <View style={{ ...styles.maincontent, flexDirection: 'row', backgroundColor: '#F2F2F2', borderBottomColor: "#BCBCBC", borderBottomWidth: 1 }}>
                <Text style={{ width: '25%' }}>{item.name}</Text>
                <Text style={{ width: '25%' }}>{item.rolelist.id}</Text>
                <Text style={{ width: '25%' }}>{item.step}</Text>
                <Text style={{ width: '25%' }}>{item.position}</Text>
            </View>
        );
    };

    return (
        <View style={styles.allcontent}>
            <Header {...props} BtnPress={BackBtnPress} title={'项目管理'} />
            <View style={{ width: '100%', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 17, color: 'black', fontWeight: "bold" }}>人员状态</Text>
            </View>
            <View style={{ paddingHorizontal: 30 }}>
                <View style={styles.maincontent}>
                    <Text style={{ width: '25%' }}>名字</Text>
                    <Text style={{ width: '25%' }}>权限</Text>
                    <Text style={{ width: '25%' }}>STEP</Text>
                    <Text style={{ width: '25%' }}>位置</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.5}
                />
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
    maincontent: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: "#BCBCBC",
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
    },
    buttonWraper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '5%',
        justifyContent: 'space-around',
        width: '90%',
        alignSelf: 'center'
    }
});

export default Personal;