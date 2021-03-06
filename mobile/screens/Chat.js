import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard, Image } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';

import joaoImg from '../assets/images/joaoImg.png';
import alexImg from '../assets/images/alexImg.png';

import theme from '../constants/theme';

export default class Chat extends Component {

  constructor(props) {
    super(props);

    var messages = [];

    function handleNewRightMessage(){

    }
    function handleNewLeftMessage(){

    }
    messages.push({
        direction: 'left',
        image: alexImg,
        text: "Hey man, I saw your ad on the surfboard. I need it for 3 days this weeken. Is it available?"
    })
    messages.push({
        direction: 'right',
        image: joaoImg,
        text: "Yes, it is. Can you come get it at my house? I live nearby Ubatuba's beach. Also, is $10 a day good for you?"
    })
    messages.push({
        direction: 'left',
        image: alexImg,
        text: "Sure, I can and it seems reasonable. If you are available, I can go get it right away."
    })
    messages.push({
        direction: 'right',
        image: joaoImg,
        text: "How about 2 hours from now, at Ubatuba's mall in front of the main entrance of the beach?"
    })
    messages.push({
        direction: 'left',
        image: alexImg,
        text: "Deal. See you soon. I will be wearing a green tshirt and black crocs."
    })

    this.state = {
      messages: messages,
      inputBarText: ''
    }
  }

  static navigationOptions = {
    title: 'Chat',
  };

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow (e) {
    this.scrollView.scrollToEnd();
  }

  keyboardDidHide (e) {
    this.scrollView.scrollToEnd();
  }

  componentDidMount() {
    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

  componentDidUpdate() {
    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

  _sendMessage() {
    this.state.messages.push({direction: "right", text: this.state.inputBarText});

    this.setState({
      messages: this.state.messages,
      inputBarText: ''
    });
  }

  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }

  _onInputSizeChange() {
    setTimeout(function() {
      this.scrollView.scrollToEnd({animated: false});
    }.bind(this))
  }

  render() {

    var messages = [];

    this.state.messages.forEach(function(message, index) {
      messages.push(
          <MessageBubble key={index}  direction={message.direction} text={message.text}/>
        );
    });

    return (
              <View style={styles.outer}>
                  <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>
                    {messages}
                  </ScrollView>
                  <InputBar onSendPressed={() => this._sendMessage()} 
                            onSizeChange={() => this._onInputSizeChange()}
                            onChangeText={(text) => this._onChangeInputBarText(text)}
                            text={this.state.inputBarText}/>
                  <KeyboardSpacer/>             
              </View>
            );
  }
}
class MessageBubble extends Component {
  render() {

    var leftSpacer = this.props.direction === 'left' ? null : <View style={{width: 70}}/>;
    var rightSpacer = this.props.direction === 'left' ? <View style={{width: 70}}/> : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            {leftSpacer}
            <View style={bubbleStyles}>
              <Text style={bubbleTextStyle}>
                {this.props.text}
              </Text>
            </View>
            {rightSpacer}
          </View>
      );
  }
}
class InputBar extends Component {


  componentWillReceiveProps(nextProps) {
    if(nextProps.text === '') {
      this.autogrowInput.resetInputText();
    }
  }

  render() {
    return (
          <View style={styles.inputBar}>
            <AutogrowInput style={styles.textBox}
                        ref={(ref) => { this.autogrowInput = ref }} 
                        multiline={true}
                        defaultHeight={30}
                        onChangeText={(text) => this.props.onChangeText(text)}
                        onContentSizeChange={this.props.onSizeChange}
                        value={this.props.text}/>
            <TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
                <Text style={{color: 'white'}}>Send</Text>
            </TouchableHighlight>
          </View> 
          );
  }
}

const styles = StyleSheet.create({

  //ChatView

  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1
  },

  //InputBar

  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  textBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#ffa500'
  },

  //MessageBubble

  messageBubble: {
      borderRadius: 5,
      marginTop: 8,
      marginRight: 10,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection:'row',
      flex: 1
  },

  messageBubbleLeft: {
    backgroundColor: '#d5d8d4',
  },

  messageBubbleTextLeft: {
    color: 'black'
  },

  messageBubbleRight: {
    backgroundColor: '#ffa500'
  },

  messageBubbleTextRight: {
    color: 'white'
  },
})

