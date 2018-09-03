import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    Picker,
    Slider,
    Switch,
    WebView
} from 'react-native';


export default class More extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // language:'java'
            // sliderValue: 5,
            isOn: false
        }
    }

    render() {
        return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>更多页面</Text> */}
            {/* <ActivityIndicator color='purple' size='large'/> */}
            {/* <Picker
                style = {styles.picker}
                selectedValue = {this.state.language}
                onValueChange = {(
                    lang) => {
                        this.setState({language:lang})
                    }
                }>
                <Picker.Item label='Java' value='java'/>
                <Picker.Item label='JavaScript' value='javascript'/>
            
            </Picker> */}

            {/* <Slider 
                minimumValue = {0}
                maximumValue = {10}
                minimumTrackTintColor = 'blue'
                maximumTrackTintColor = 'red'
                step = {1}
                style = {{width:200}}
                value = {this.state.sliderValue}
                onValueChange = {(value) => {
                    this.setState({sliderValue:value})
                }}
            />
            <Text>Slider 值： {this.state.sliderValue}</Text> */}
            
            {/* <Switch
                onTintColor = 'blue'
                tintColor = 'black'
                thumbTintColor = 'green'
                value = {this.state.isOn}
                onValueChange = {() => {
                    this.setState({isOn:!this.state.isOn})
                }}
            /> */}
            <WebView
                source = {{url:'https://www.sina.cn'}}
                style = {styles.web}
            />

        </View>
        );
    }

  

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    },
    picker:{
        width:200,
        height:200
    },
    web:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width
    }

});