import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import {  Icon, Image } from 'react-native-elements';
import { request } from "graphql-request";
import ApolloClient from 'apollo-boost'

export default function App() {

const client = new ApolloClient({uri:'https://covid19-graphql.netlify.app/'})
//States for Global Featues............
  const[cases,setcases] = useState(0)
  const[recovered,setrecov] = useState(0)
  const[deaths,setdeaths] = useState(0)
  const[conucases,setcount] = useState(0)
  const[conurecov,setcounrec] = useState(0)
  const[condeaths,setcoundeath] = useState(0)
  const[active,setactive] = useState(0)
  const[critical,setcritical] = useState(0)
  const[tests,settests] = useState(0)
  const[arr,setarr] = useState([])
  const[covid,setcovid] = useState("Ghana")
  const[flag,setflag] = useState('https://www.google.com/search?q=pictures+of+flag+with+grey+background&rlz=1C1CHZL_enGH894GH894&sxsrf=ALeKk02sv5ztDdxNfS6ilYtIrtbHYSnoxw:1588361298530&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiS7-T3spPpAhWIN8AKHdpDD3YQ_AUoAXoECAwQAw&biw=1366&bih=633#imgrc=iezbbjVHdqcQYM')
  
  const query =`
  {
    globalTotal{
      cases
      deaths
      recovered
      updated
    }
  }`

  const query1 = `{
    countries {
        country
        countryInfo {
            _id
            flag
        }
        
    }
}`

  const query2 = `query Country{
    country(name:"${covid}") {
        country
        countryInfo {
            _id
            flag
        }
        result {
            tests
            cases
            deaths
            recovered
            active
            critical
            updated
        }
    }
}
`

  const[modalvis,setvis]=useState(false)
  
  
  request('https://covid19-graphql.netlify.app/',query)
  .then(res=>{
    setcases(res.globalTotal.cases)
    setrecov(res.globalTotal.recovered)
    setdeaths(res.globalTotal.deaths)
  })
  .catch(err=>console.log(err))

  request('https://covid19-graphql.netlify.app/',query1)
  .then(res=>setarr(res))
  .catch(err=>console.log(err))
  
  request('https://covid19-graphql.netlify.app/',query2)
  .then(res=>{
    setcritical(res.country.result.critical)
    settests(res.country.result.tests)
    setactive(res.country.result.active)
    setcount(res.country.result.cases)
    setcounrec(res.country.result.recovered)
    setcoundeath(res.country.result.deaths)
    setflag(res.country.countryInfo.flag)
  })
  .catch(err=>console.log(err))
 
  
  const Listview = ({country,fla})=>{
    return(
      <View style={{flexDirection:"row",alignItems:'center',padding:8}}>
          <Image style={{width:60,height:40}} source={{uri:fla}}/>
        <View style={{flex:5,padding:6}}>
         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
         <TouchableOpacity onPress={()=>{
           setvis(!modalvis)
           setcovid(country)
           console.log(country)
           ToastAndroid.show("Fetching Data",ToastAndroid.LONG)
         }}> 
         <Text style={{fontWeight:"bold",alignSelf:"flex-start",fontSize:20}}>{country}</Text>
         </TouchableOpacity> 
         </View> 
        </View>
        </View>
    )
  }

  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center",padding:5,backgroundColor:"#eee"}}>
      <View style={{backgroundColor:"white", width:"100%",borderRadius:10,padding:10}}>
       <View style={{flexDirection:"row"}}>
        <View style={{flex:0.5,alignItems:"center",justifyContent:"center",padding:5}}>
          <Icon name="public" size={30} color="blue"/>
        </View>
        <View style={{flex:4,justifyContent:"center"}}>
          <Text style={{fontSize:20,marginLeft:5,fontWeight:"bold"}}>World Statistics</Text>
        </View>
       </View>
       <View style={{marginTop:15,flexDirection:"row",padding:5}}>
         <View style={{flex:1,justifyContent:"center",padding:8}}>
           <Text style={{fontSize:20,fontWeight:"700",color:"blue"}}>Confirmed</Text>
  <Text style={{fontWeight:"bold",fontSize:18}}>{cases}</Text>
         </View>
         <View style={{flex:1,justifyContent:"center",padding:8}}>
           <Text style={{fontSize:20,fontWeight:"700",color:"green"}}>Recovered</Text>
  <Text style={{fontWeight:"bold",fontSize:18}}>{recovered}</Text>
         </View>
         <View style={{flex:1,justifyContent:"center",padding:8}}>
           <Text style={{fontSize:20,fontWeight:"700",color:"red"}}>Deaths</Text>
  <Text style={{fontWeight:"bold",fontSize:18}}>{deaths}</Text>
         </View>
       </View>
      </View>
      
      <View style={{ width:"100%",borderRadius:10,padding:10,marginTop:20,backgroundColor:"white"}}>
       <View style={{flexDirection:"row"}}>
        <View style={{flex:0.5,alignItems:"center",justifyContent:"center",padding:5}}>
          <Image style={{width:25,height:25}} source={{uri:flag}}/>
        </View>
        <View style={{flex:4,justifyContent:"center"}}>
          <TouchableOpacity onPress={()=>setvis(!modalvis)}>
  <Text style={{fontSize:20,marginLeft:5,fontWeight:"bold"}}>{covid}</Text>
          </TouchableOpacity>
        </View>
       </View>
       <View style={{marginTop:15,flexDirection:"row",padding:5}}>
         <View style={{flex:1,justifyContent:"center",padding:8}}>
           <Text style={{fontSize:20,fontWeight:"700",color:"blue"}}>Confirmed</Text>
  <Text style={{fontWeight:"bold",fontSize:18}}>{conucases}</Text>
           <Text style={{marginTop:10,fontSize:20,fontWeight:"700",color:"orange"}}>Active</Text>
  <Text style={{fontWeight:"bold",fontSize:18}}>{active}</Text>
         </View>
         <View style={{flex:1,justifyContent:"center",padding:8}}>
           <Text style={{fontSize:20,fontWeight:"700",color:"green"}}>Recovered</Text>
  <Text style={{fontWeight:"bold",fontSize:18}}>{conurecov}</Text>
           <Text style={{marginTop:10,fontSize:20,fontWeight:"700",color:"red"}}>Critical</Text>
  <Text style={{fontWeight:"bold",fontSize:18}}>{critical}</Text>
         </View>
         <View style={{flex:1,justifyContent:"center",padding:8}}>
           <Text style={{fontSize:20,fontWeight:"700",color:"red"}}>Deaths</Text>
  <Text style={{fontWeight:"bold",fontSize:18}}>{condeaths}</Text>
           <Text style={{marginTop:10,fontSize:20,fontWeight:"700",color:"indigo"}}>Test</Text>
  <Text style={{fontWeight:"bold",fontSize:18}}>{tests}</Text>
         </View>
       </View>
      </View>
      <Modal animationType="slide" visible={modalvis}>
        <TouchableOpacity onPress={()=>setvis(!modalvis)}>
        <Text style={{padding:8,fontSize:20,fontWeight:"bold"}}>Back</Text>
        </TouchableOpacity>
          <FlatList data={arr.countries}  updateCellsBatchingPeriod={5} keyExtractor={(item)=>item.countryInfo._id} renderItem={({item})=> <Listview country={item.country} fla={item.countryInfo.flag}/>}/> 
      </Modal>
    </View>
  ) 
}
