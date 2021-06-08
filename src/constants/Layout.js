import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const LAYOUT = {
  window: {
    width,
    height,
  },
  fontSize1: width*0.03,
  fontSize2: width*0.035,
  fontSize3: width*0.025,
  fontSize4: width*0.045,
  fontSize5: width*0.04,
  fontSize6: width*0.06,
  fontSize7: width*0.05,
  isSmallDevice: width < 375,
  LATITUDE : 0.0,
  LONGITUDE : 0.0,
  LATITUDE_DELTA : 0.1,
  LONGITUDE_DELTA : 0.1,
  googleMapsApiKey: "AIzaSyCfhSyz6dVvBgThpdwN9vsqbvXkRdQ9PVk",
  options: { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  logo: require('../assets/logos.png'),
  icon: require('../assets/icon.png'),
  path: require('../assets/path.png'),
  qrcode: require('../assets/qrcode.png'),
  qrcode1: require('../assets/qrcode1.png'),
  imageIcon: require('../assets/imageIcon.png'),
  videoIcon: require('../assets/videoIcon.png'),
  avatar: 'app-avatar.png',
  membership:[
    {
      title:'Silver',
      text1:'Basic Package',
      text2:'15 Days',
    },
    {
      title:'Gold',
      text1:'Basic Package',
      text2:'1 Month',
    },
    {
      title:'Platinum',
      text1:'Corporate Pack',
      text2:'12 Month',
    },
  ],
  Ratings:[
    {
      value:null,
      label:'Rating',
    },
    {
      value:5,
      label:'5',
    },
    {
      value:4,
      label:'4',
    },
    {
      value:3,
      label:'3',
    },
    {
      value:2,
      label:'2',
    },
    {
      value:1,
      label:'1',
    },
    {
      value:0,
      label:'0',
    },
  ],
};