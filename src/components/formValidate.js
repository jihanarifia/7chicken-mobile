import React from 'react';
import {Input, View, Text, Item} from 'native-base';
import {formGlobalStyles} from './globalStyles';
import {Font} from '@api/localization';

const InputValidate = props => {
  return (
    <View>
      <Input
        style={[props.style, {fontFamily: Font.LIGHT}]}
        placeholderTextColor="grey"
        placeholder={props.placeholder}
        keyboardType={props.keyboardType || 'default'}
        secureTextEntry={props.secureTextEntry || false}
        onChangeText={props.handleChange}
        onBlur={props.handleValidate}
        maxLength={props.maxLength || 200}
      />
      {props.error ? (
        <Text style={formGlobalStyles.dangerText}>{props.error}</Text>
      ) : null}
    </View>
  );
};

const InputValidateGroup = props => {
  return (
    <View style={props.itemStyle}>
      <Item style={formGlobalStyles.inputBorder}>
        <Input
          style={[props.style, {fontFamily: Font.LIGHT}]}
          placeholderTextColor="grey"
          placeholder={props.placeholder}
          value={props.value}
          keyboardType={props.keyboardType || 'default'}
          secureTextEntry={props.secureTextEntry || false}
          onChangeText={props.handleChange}
          onBlur={props.handleValidate}
          maxLength={props.maxLength || 200}
          onFocus={props.onFocus}
        />
      </Item>
      {props.error ? (
        <Text style={formGlobalStyles.dangerText}>{props.error}</Text>
      ) : null}
    </View>
  );
};

const InputValidateGroupWithValue = props => {
  if (props.type === 'nounderline') {
    return (
      <View>
        <Input
          placeholderTextColor="grey"
          placeholder={props.placeholder}
          value={props.value}
          style={[{fontSize: 15, fontFamily: Font.LIGHT}, props.styleInput]}
          keyboardType={props.keyboardType || 'default'}
          secureTextEntry={props.secureTextEntry || false}
          onChangeText={props.handleChange}
          onBlur={props.handleValidate}
          maxLength={props.maxLength || 750}
          editable={props.editable}
          multiline={props.multiline ? true : false}
          textAlignVertical={props.alignTopLeft ? 'top' : 'center'}
        />
        {props.error ? (
          <Text style={formGlobalStyles.dangerText}>{props.error}</Text>
        ) : null}
      </View>
    );
  } else {
    return (
      <View>
        <Item style={props.styleItem}>
          <Input
            placeholderTextColor="grey"
            placeholder={props.placeholder}
            value={props.value}
            style={[
              {fontSize: 15, fontFamily: Font.LIGHT},
              props.styleInput,
            ]}
            keyboardType={props.keyboardType || 'default'}
            secureTextEntry={props.secureTextEntry || false}
            onChangeText={props.handleChange}
            onBlur={props.handleValidate}
            onFocus={props.onFocus}
            maxLength={props.maxLength || 200}
            editable={props.editable}
            textAlignVertical={props.alignTopLeft ? 'top' : 'center'}
          />
          {props.rightIcon}
        </Item>
        {props.error ? (
          <Text style={formGlobalStyles.dangerText}>{props.error}</Text>
        ) : null}
      </View>
    );
  }
};

export {InputValidate, InputValidateGroup, InputValidateGroupWithValue};
