import React from "react"
import { StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLOR } from "./Color";
import { LAYOUT } from "./Layout";
const thisStyle = StyleSheet.create({
  icon:{
    marginHorizontal:LAYOUT.window.width*0.03,
    textAlign:'center',
    color:COLOR.whiteColor
  }
})


export const Profile = [
  {
    id: "Home",
    title: "Home",
    navLink: "HomeScreen",
    role:['Seller','Customer','Guest'],
    icon:<SimpleLineIcons name="home" style={thisStyle.icon} size={LAYOUT.window.width*0.05} />,
  },
  {
    id: "My Profile",
    title: "My Profile",
    navLink: "MyProfileScreen",
    role:['Seller','Customer'],
    icon:<SimpleLineIcons name="user" style={thisStyle.icon} size={LAYOUT.window.width*0.05} />,
  },
  {
    id: "Membership",
    title: "Membership",
    navLink: "MembershipScreen",
    role:['Seller','Customer'],
    icon:<FontAwesome5 name="chess-king" style={thisStyle.icon} size={LAYOUT.window.width*0.05}  />,
  },
  {
    id: "Privacy Policy",
    title: "Privacy Policy",
    navLink: "PrivacyPolicyScreen",
    role:['Seller','Customer','Guest'],
    icon:<SimpleLineIcons name="book-open" style={thisStyle.icon} color="black" size={LAYOUT.window.width*0.05} />,
  },
  // {
  //   id: "Customer Support",
  //   title: "Customer Support",
  //   navLink: "CustomerSupportScreen",
  //   role:['Seller','Customer'],
  //   icon:<SimpleLineIcons name="earphones-alt" style={thisStyle.icon} color="black" size={LAYOUT.window.width*0.05} />,
  // },
  {
    id: "My Offers",
    title: "My Offers",
    navLink: "MyOffersScreen",
    role:['Seller'],
    icon:<SimpleLineIcons name="tag" style={thisStyle.icon} color="black" size={LAYOUT.window.width*0.05} />,
  },
  // {
  //   id: "Rate Our App",
  //   title: "Rate Our App",
  //   navLink: "RateOurAppScreen",
  //   role:['Seller','Customer'],
  //   icon: <SimpleLineIcons style={thisStyle.icon} name="star" size={LAYOUT.window.width*0.05} />,
  // },
  // {
  //   id: "Make a Suggestion",
  //   title: "Make a Suggestion",
  //   navLink: "SuggestionScreen",
  //   role:['Seller','Customer'],
  //   icon: <SimpleLineIcons style={thisStyle.icon} name="note" size={LAYOUT.window.width*0.05} />,
  // },
  {
    id: "SignIn",
    title: "SignIn",
    navLink: "SignInScreen",
    role:['Guest'],
    icon:<SimpleLineIcons name="login" style={thisStyle.icon} size={LAYOUT.window.width*0.05} />,
  },
  {
    id: "SignUp",
    title: "SignUp",
    navLink: "SignUpScreen",
    role:['Guest'],
    icon:<SimpleLineIcons name="user" style={thisStyle.icon} size={LAYOUT.window.width*0.05} />,
  },
]

