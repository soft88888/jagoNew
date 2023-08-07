import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import ApiObject from '../../support/Api';
import Header from '../../components/Header';
import CStyles from '../../styles/CommonStyles';
import DropBox from '../../components/DropBox';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import CalendarPicker from 'react-native-calendar-picker';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

const InforEdit = (props) => {

  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState([]);
  const [isVisible, setisVisible] = useState(false)
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [calendarType, setCalendarType] = useState();

  const [settingList, setSettingList] = useState([]);
  const [settingAllList, setSettingAllList] = useState([]);
  const [settingListOpen, setSettingListOpen] = useState(false);
  const [settingId, setSettingId] = useState(0);

  const [schdulerList, setSchdulerList] = useState([]);
  const [schdulerAllList, setSchdulerAllList] = useState([]);
  const [schdulerListOpen, setSchdulerListOpen] = useState(false);
  const [schduleid, setSchduleid] = useState(0);

  const [leaderList, setLeaderList] = useState([]);
  const [leaderAllList, setLeaderAllList] = useState([]);
  const [leaderListOpen, setLeaderListOpen] = useState(false);
  const [leaderid, setLeaderid] = useState('');

  const [brand, setBrand] = useState('');
  const [storename, setStorename] = useState('');
  const [storeid, setStoreid] = useState('');
  const [storelinkname, setStorelinkname] = useState('');
  const [storelinkphone, setStorelinkphone] = useState('');
  const [storemanager, setStoremanager] = useState('')
  const [clientId, setClientId] = useState('');
  const [clientstoreleader, setClientstoreleader] = useState('');
  const [storeaddress, setStoreaddress] = useState('');
  const [estimated, setEstimated] = useState('');

  const [preferstarttime, setPreferstarttime] = useState('');
  const [preferendtime, setPreferendtime] = useState('');
  const [prostarttime, setProstarttime] = useState('');
  const [proendtime, setProendtime] = useState('');
  const [adress, setAdress] = useState('');
  const [adressList, setAdressList] = useState([]);
  const [adressListOpen, setAdressListOpen] = useState(false);
  const [workingarea, setWorkingarea] = useState('');
  const [visitername, setVisitername] = useState('');
  const [firstvisitedate, setFirstvisitedate] = useState('');
  const [secondvistedate, setSecondvistedate] = useState('');
  const [firstvisitestimated, setFirstvisitestimated] = useState('');
  const [secondvisitestimated, setSecondvisitestimated] = useState('');
  const [methodtype, setMethodtype] = useState('');
  const [userids, setUserids] = useState('');

  const extractYearAndMonth = (date) => {
    const year = moment(date).format('YYYY');
    const month = moment(date).format('MM');
    const day = moment(date).format('DD');
    return { year, month, day };
  };

  const handleDateSelect = async (date) => {
    const { year, month, day } = date
      ? extractYearAndMonth(date)
      : { year: null, month: null, day: null };

    switch (calendarType) {
      case 0:
        setSelectedDate(`${year}:${month}:${day}`)
        break;
      case 1:
        setPreferstarttime(`${year}:${month}:${day}`)
        break;
      case 2:
        setPreferendtime(`${year}:${month}:${day}`)
        break;
      case 3:
        setProstarttime(`${year}:${month}:${day}`)
        break;
      case 4:
        setProendtime(`${year}:${month}:${day}`)
        break;
      default:
        break;
    }
   
    setCalendarVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (settingAllList.length > 0) {
      if (settingId == 0) {
        setClientId('');
      }
      else {
        setClientId(settingAllList.filter((item) => item.id == settingId)[0].client_id.toString())
      }
    }
  }, [settingId])

  const getAddressList = async () => {
    var results = await ApiObject.getAddressList();
    if (results) {
      var tempArray = [];
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        var tempObject = {};
        tempObject.label = element.city_name;
        tempObject.value = element.id;
        tempArray.push(tempObject);
      }
      setAdressList(tempArray);
    }
  };

  const fetchData = async() => {
    getAddressList();
    var AllList = await ApiObject.getSettingList();
    setSettingAllList(AllList);
    let list = [];
    for (let i = 0; i < AllList.length; i++) {
      let temp = {};
      temp.label = AllList[i].client_name.replace(" ", "") + "_" + AllList[i].inventory_type;
      temp.value = AllList[i].id;
      list.push(temp);
    }
    setSettingList(list)
    setSettingId(list[0].value)
    var schdluerAlllist = await ApiObject.getSchedulerList({
      client_id: list[0].value
    });

    setSchdulerAllList(schdluerAlllist);

    let schedulerlist = [];

    for (let i = 0; i < schdluerAlllist.length; i++) {
      let temp = {};
      temp.label = schdluerAlllist[i].name;
      temp.value = schdluerAlllist[i].id;
      schedulerlist.push(temp);
    }
    setSchdulerList(schedulerlist)
    setSchduleid(schedulerlist[0].value)

    var leaderAlllist = await ApiObject.getLeaderList({
      client_id: list[0].value
    });

    setLeaderAllList(leaderAlllist);

    let leaderlist = [];
    for (let i = 0; i < leaderAlllist.length; i++) {
      let temp = {};
      temp.label = leaderAlllist[i].name;
      temp.value = leaderAlllist[i].id;
      leaderlist.push(temp);
    }
    setLeaderList(leaderlist)
    setLeaderid(leaderlist[0].value)

  };

  const BackBtnPress = async () => {
    props.navigation.push('PromanageInfor')
  };


  const updateProject = async () => {
    if (storename == '' || preferendtime == '' || preferstarttime == ''
      || storeaddress == ""
    ) {

    }
    else {
      setisVisible(false);
      await ApiObject.updateProject({
        setting_id: settingId,
        brand: brand,
        store_name: storename,
        store_id: storeid,
        store_link_name: storelinkname,
        store_link_phone: storelinkphone,
        store_manager: storemanager,
        client_store_leader: clientstoreleader,
        store_address: storeaddress,
        estimated: estimated,
        scheduler_id: schduleid,
        leader_id: leaderid,
        prefer_starttime: preferstarttime,
        prefer_endtime: preferendtime,
        pro_starttime: prostarttime,
        pro_endtime: proendtime,
        adress: '',

        working_area: '',
        visiter_name: '',
        first_visit_date: '',
        second_visit_date: '',
        first_visit_estimated: '',
        second_visit_estimated: '',
        method_type: '',
        user_ids: '',
      })
      // props.navigation.push('PromanageMain')
    }
  }

  return (
    <ScrollView style={styles.allcontent}>
      <Header {...props} BtnPress={BackBtnPress} title={'项目管理'} />
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalheader}>
              <Text>提示</Text>
              <TouchableOpacity onPress={() => setisVisible(false)}>
                <Icon name="close" size={20} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalMain}>
              <Text>您会保留输入的用户信息吗?</Text>
            </View>
            <View style={styles.modalBottom}>
              <Button
                ButtonTitle={'是(Y)'}
                BtnPress={() => { updateProject() }}
                type={'yellowBtn'}
                BTnWidth={120}
              />
              <Button
                ButtonTitle={'否(N)'}
                BtnPress={() => setisVisible(false)}
                type={'blueBtn'}
                BTnWidth={120}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isCalendarVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={{...styles.modalContent,height:'50%',width:'95%'}}>
            <CalendarPicker onDateChange={handleDateSelect} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCalendarVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '5%', height: '8%' }}>
          <View style={{ width: '95%' }}>
            <Text style={{ paddingLeft: 10 }}>客户名称*庳存类型</Text>
            <View style={{ width: '100%', height: '68%' }}>
              <DropBox
                zIndex={3000}
                zIndexInverse={1000}
                open={settingListOpen}
                setOpen={setSettingListOpen}
                value={settingId}
                setValue={setSettingId}
                items={settingList}
                setItems={setSettingList}
                searchable={true}
                listMode='MODAL'
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '2%', height: '8%' }}>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>客户编码</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={clientId}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={{
                  ...CStyles.InputStyle,
                  backgroundColor: '#F2F2F2',
                  color: '#000000'
                }}
                editable={false}
                multiline={true}
              />
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>品牌</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={brand}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={CStyles.InputStyle}
                multiline={true}
                onChangeText={setBrand}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '2%', height: '8%' }}>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>门店名称*</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={storename}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={CStyles.InputStyle}
                multiline={true}
                onChangeText={setStorename}
              />
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>门店编码</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={storeid}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={CStyles.InputStyle}
                multiline={true}
                onChangeText={setStoreid}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '2%', height: '8%' }}>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>门店联系人</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={storelinkname}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={CStyles.InputStyle}
                multiline={true}
                onChangeText={setStorelinkname}
              />
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>门店联系电话</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={storelinkphone}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={CStyles.InputStyle}
                multiline={true}
                onChangeText={setStorelinkphone}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '2%', height: '8%' }}>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>门店经理</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={storemanager}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={CStyles.InputStyle}
                multiline={true}
                onChangeText={setStoremanager}
              />
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>客户现场代表</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={clientstoreleader}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={CStyles.InputStyle}
                multiline={true}
                onChangeText={setClientstoreleader}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '2%', height: '8%' }}>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>门店地址*</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={storeaddress}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={CStyles.InputStyle}
                multiline={true}
                onChangeText={setStoreaddress}
              />
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>参考库存</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <TextInput
                value={estimated}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={CStyles.InputStyle}
                multiline={true}
                onChangeText={setEstimated}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '2%', height: '8%' }}>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>排班人</Text>
            <View style={{ width: '100%', height: '68%' }}>
              <DropBox
                zIndex={3000}
                zIndexInverse={1000}
                open={schdulerListOpen}
                setOpen={setSchdulerListOpen}
                value={schduleid}
                setValue={setSchduleid}
                items={schdulerList}
                setItems={setSchdulerList}
                searchable={true}
                listMode='MODAL'
              />
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>领队</Text>
            <View style={{ width: '100%', height: '68%' }}>
              <DropBox
                zIndex={3000}
                zIndexInverse={1000}
                open={leaderListOpen}
                setOpen={setLeaderListOpen}
                value={leaderid}
                setValue={setLeaderid}
                items={leaderList}
                setItems={setLeaderList}
                searchable={true}
                listMode='MODAL'
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '2%', height: '8%' }}>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>建议起始日期*</Text>
            <View style={{ flexDirection: 'row', width: '100%', height: '100%', alignItems: 'flex-start' }}>
              <TouchableOpacity onPress={() => { setCalendarVisible(true), setCalendarType(1) }}>
                <Icon name="calendar" size={25} style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TextInput
                value={preferstarttime}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={{
                  ...CStyles.InputStyle,
                  backgroundColor: '#ffffff',
                  color: '#000000'
                }}
                editable={false}
                multiline={true}
              />
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>建议结束日期*</Text>
            <View style={{ flexDirection: 'row', width: '100%', height: '100%', alignItems: 'flex-start' }}>
              <TouchableOpacity onPress={() => { setCalendarVisible(true), setCalendarType(2) }}>
                <Icon name="calendar" size={25} style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TextInput
                value={preferendtime}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={{
                  ...CStyles.InputStyle,
                  backgroundColor: '#ffffff',
                  color: '#000000'
                }}
                editable={false}
                multiline={true}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '2%', height: '8%' }}>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>盘点起始日期</Text>
            <View style={{ flexDirection: 'row', width: '100%', height: '100%', alignItems: 'flex-start' }}>
              <TouchableOpacity onPress={() => { setCalendarVisible(true), setCalendarType(3) }}>
                <Icon name="calendar" size={25} style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TextInput
                value={prostarttime}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={{
                  ...CStyles.InputStyle,
                  backgroundColor: '#ffffff',
                  color: '#000000'
                }}
                editable={false}
                multiline={true}
              />
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ paddingLeft: 10 }}>盘点结束日期</Text>
            <View style={{ flexDirection: 'row', width: '100%', height: '100%', alignItems: 'flex-start' }}>
              <TouchableOpacity onPress={() => { setCalendarVisible(true), setCalendarType(4) }}>
                <Icon name="calendar" size={25} style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TextInput
                value={proendtime}
                autoFocus={true}
                placeholder={''}
                selectTextOnFocus={true}
                style={{
                  ...CStyles.InputStyle,
                  backgroundColor: '#ffffff',
                  color: '#000000'
                }}
                editable={false}
                multiline={true}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '2%', height: '8%' }}>
          <View style={{ width: '95%' }}>
            <Text style={{ paddingLeft: 10 }}>省</Text>
            <View style={{ width: '100%', height: '60%' }}>
              <DropBox
                zIndex={3000}
                zIndexInverse={1000}
                open={adressListOpen}
                setOpen={setAdressListOpen}
                value={adress}
                setValue={setAdress}
                items={adressList}
                setItems={setAdressList}
                searchable={true}
                listMode='MODAL'
              // listMode='SCROLLVIEW'
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: '3%', justifyContent: 'center', width: '95%', alignItems: 'center', alignSelf: 'center' }}>
          <Button
            ButtonTitle={'保存'}
            BtnPress={() => setisVisible(true)}
            type={'yellowBtn'}
            BTnWidth={300}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  allcontent: {
    position: 'relative',
    height: Dimensions.get('window').height,
    backgroundColor: '#F2F2F2',
  },
  textinputContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '90%',
    alignSelf: 'center'
  },
  calendarContent: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%'
  },
  scrollContentTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%'
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
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
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

export default InforEdit;