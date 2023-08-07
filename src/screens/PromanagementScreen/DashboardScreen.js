import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Modal, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import DropBox from '../../components/DropBox';
import CStyles from '../../styles/CommonStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Svg, Line } from 'react-native-svg';
import ApiObject from '../../support/Api';
import { subDays } from 'date-fns';
import { setProjectItem, setqrcode } from '../../reducers/BaseReducer';

const DashboardScreen = (props) => {

  const dispatch = useDispatch();

  const [element, setElement] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [ListOpen, setListOpen] = useState(false);
  const [listValue, setlistValue] = useState(0);
  const [List, setList] = useState([]);
  const [isVisible, setisVisible] = useState(false)

  const [calendarType, setCalendarType] = useState();

  const [data, setData] = useState([]);
  const [firstdata, setfirstData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  // Modal 

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



  useEffect(() => {
    fetchData();
    getList()
  }, []);

  useEffect(() => {
    if (listValue == 0) {
      setData(firstdata)
    }
    else {
      setData(firstdata.filter((item) => item.state_id === listValue))
    }
  }, [listValue]);

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


  const getList = async () => {
    setList([
      {
        'label': '全部',
        'value': 0
      },
      {
        'label': '排班',
        'value': 1
      },
      {
        'label': '排班',
        'value': 2
      },
      {
        'label': '进行',
        'value': 3
      },
      {
        'label': '完成',
        'value': 4
      },
      {
        'label': '取消',
        'value': 5
      }
    ])
  }


  const addProject = async () => {

    if (storename == '' || preferendtime == '' || preferstarttime == ''
      || storeaddress == ""
    ) {

    }
    else {
      const result = await ApiObject.addProject({
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
      if (result == '') {
        setisVisible(false)
      }

    }

  }

  const fetchData = async () => {
    // setLoading(true);
    // Simulated API call or data fetching
    getAddressList();
    let currentDate = new Date();
    currentDate = subDays(currentDate, 30);
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();
    const day = currentDate.getDate().toString();
    setSelectedDate(`${year}:${month}:${day}`)
    // currentDate.setMonth(currentDate.getMonth() - 1);
    var data = await ApiObject.getProjectList({
      starttime: `${year}-${month}-${day}`
    });

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

    // setTimeout(() => {
    //   const newData = Array.from({ length: 10 }, (_, index) => ({
    //     id: page + index,
    //     text: `Item ${page + index}`,
    //   }));
    //   setData((prevData) => [...prevData, ...newData]);
    //   setPage((prevPage) => prevPage + 1);
    //   setLoading(false);
    // }, 1500);
    setData(data)
    setfirstData(data)
  };

  const handleLoadMore = () => {
    // if (!loading) {
    //   fetchData();
    // }
  };

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const handleDetail = async (item) => {
    await dispatch(setProjectItem(item));
    if (item.state_id == 3) {
      await dispatch(setqrcode(item?.qrcode));
      props.navigation.push('PromanageMain')
    }
    else {
      props.navigation.push('PromanageCard')
    }
  }

  const renderItem = ({ item }) => {
    let result = 'red';
    switch (item.state_id) {
      case 1:
        result = 'blue';
        break;
      case 3:
        result = 'green';
        break;
      case 4:
        result = 'black';
        break;
      case 54:
        result = 'red';
        break;
      default:
        result = 'red';
        break;
    }
    return (
      <View>
        <TouchableOpacity onPress={() => handleDetail(item)} style={styles.scrollContent}>
          <View style={{ width: '10%' }}>
            <Icon2 name="radio-button-on" size={10} color={result} style={{ marginRight: 2 }} />
          </View>
          <View style={{ width: '90%' }}>
            <View style={{ ...styles.scrollContentTop, paddingLeft: 5 }}>

              <Text>{item.client_name}</Text>
              <Text>{item.store_name}</Text>
              <Text>{item.leader_name}</Text>

            </View>
            <Svg height="1" width={Dimensions.get('window').width * 0.9 * 0.9}>
              <Line x1="0" y1="0" x2={Dimensions.get('window').width * 0.9 * 0.9} y2="0" stroke="black" />
            </Svg>
            <View style={styles.scrollContentTop}>
              <Text>华北 - 河北</Text>
              {
                item.start_time != null ?
                  <Text>{item.start_time}</Text> :
                  <Text>{item.pro_starttime}</Text>
              }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
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
    var result = await ApiObject.getProjectList({
      starttime: `${year.toString()}-${month.toString()}-${day.toString()}`
    });
    setData(result)
    setfirstData(result)
  };

  const BackBtnPress = async () => {
    props.navigation.push('Inventory');
  };

  const extractYearAndMonth = (date) => {
    const year = moment(date).format('YYYY');
    const month = moment(date).format('MM');
    const day = moment(date).format('DD');
    return { year, month, day };
  };



  const skuRef = useRef(null);

  const elementchange = (val) => {
    setElement(val);
    if (val == "") {
      setData(firstdata)
    }
    else {
      setData(firstdata.filter((item) =>
        item.client_name == val ||
        item.store_name == val ||
        item.leader_name == val
      ))
    }
  }

  const calendarchange = (val) => {

  }

  return (
    <View style={styles.allcontent}>
      <Header {...props} BtnPress={BackBtnPress} title={'项目管理'} />
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#282828', fontFamily: 'bold', fontSize: 20 }}>项目追加</Text>
                <TouchableOpacity onPress={() => setisVisible(false)}>
                  <Icon name="close" size={30} style={{ marginRight: 10 }} />
                </TouchableOpacity>
              </View>
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
              <View style={{ marginTop: '2%', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <Button
                  ButtonTitle={'追加'}
                  BtnPress={() => addProject()}
                  type={'yellowBtn'}
                  BTnWidth={300}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <View style={styles.searchbarContent}>
        <Icon name="search1" size={20} style={{ marginRight: 10 }} />
        <TextInput
          ref={skuRef}
          value={element}
          autoFocus={true}
          onChangeText={elementchange}
          placeholder={''}
          selectTextOnFocus={true}
          style={CStyles.InputStyle}
          multiline={false}
        />
        <TouchableOpacity
          onPress={() => setisVisible(true)}
        >
          <Icon name="pluscircle" size={30} style={{ marginRight: 10, color: '#012864' }} />
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContent}>
        <TouchableOpacity onPress={() => { setCalendarVisible(true), setCalendarType(0) }}>
          <Icon name="calendar" size={20} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TextInput
          ref={skuRef}
          value={selectedDate}
          autoFocus={true}
          editable={false}
          onChangeText={calendarchange}
          placeholder={''}
          selectTextOnFocus={true}
          style={{
            ...CStyles.InputStyle,
            backgroundColor: '#ffffff',
            color: '#000000'
          }}
          multiline={false}
        />
        <Modal
          visible={isCalendarVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
        <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: '50%' }}>
          <DropBox
            zIndex={10}
            zIndexInverse={10}
            open={ListOpen}
            setOpen={setListOpen}
            value={listValue}
            setValue={setlistValue}
            items={List}
            setItems={setList}
            searchable={true}
            listMode='MODAL'
          />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  allcontent: {
    position: 'relative',
    height: Dimensions.get('window').height,
    backgroundColor: '#F2F2F2'
  },
  scrollContent: {
    backgroundColor: '#FFFFFF',
    paddingRight: 30,
    paddingVertical: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  searchbarContent: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
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
    width: '100%',
    paddingLeft: 30
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
    width: '95%',
    height: '97%',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
  },
});

export default DashboardScreen;