import React from "react";
import {TouchableOpacity,View,StyleSheet,Text , Image, TextInput} from "react-native";
import * as Permissions from "expo-permissions";
import {BarcodeScanner} from "expo-barcode-scanner";

export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state={
            hasCamPermissions:null,
            scanned:false,
            buttonState:"normal",
            scannedBookId:"",
            scannedStudentId:"",

        }
    }
    getCamPermission=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCamPermissions:status==="granted",
            buttonState: id,
            scannned:false,

        })
    }
handleBarcode=async({type,data})=>{
    var {buttonState}=this.state
    if(buttonState==="bookId"){

    
    this.setState({
        scanned:true,
        scannedBookId:data,
        buttonState:"normal"
    })}
    else if(buttonState==="studentId"){
        this.setState({
            scanned:true,
            scannedId:data,
            buttonState:"normal"
        }) 
    }
}
    render(){
        const hasCamPermissions=this.state.hasCamPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState!=="normal"&&hasCamPermissions){
            return(
                <BarcodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={scanned?undefined:this.handleBarcode }></BarcodeScanner>
            )
        }
        else if (buttonState==="normal"){
      return(
           <View style={styles.container}>
               <View>
                   <Image source={require("../assets/booklogo.jpg")} style={{width=200,height=200}}></Image>
                   <Text style={{fontSize:30, textAlign:"center"}}> WILY </Text>
               </View>
               <View style={styles.inputView}>
                   <TextInput value={this.state.scannedBookId} style={styles.inputBox} placeholder="bookId"/>
                   <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCamPermission("bookId")}}> 
                   <Text style={styles.buttonText}> Scan </Text>
                   </TouchableOpacity>
               </View>
               <View style={styles.inputView}>
                   <TextInput value={this.state.scannedStudentId} style={styles.inputBox} placeholder="studentId"/>
                   <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCamPermission("studentId")}}> 
                   <Text style={styles.buttonText}> Scan </Text>
                   </TouchableOpacity>
               </View>
            </View>
        )}
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });