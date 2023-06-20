
import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';
import { FONT_SIZES, FONT_WEIGHTS } from '../../context/theme';

export const PointDot = styled.View`
  border-color: #fff;
  border-width: 3px;
  shadow-offset: 0px 0px;
  shadow-color: #04214f;
  shadow-opacity: 0.4;
  shadow-radius: 4.65;
  background-color: transparent;
`;

const getBg = ({ type, theme }) => {
  if (type === 'pickup') {
    return theme.primaryColor;
  } if (type === 'dropoff') {
    return theme.secondaryColor;
  }
  return '#c3c0c0';
};

export const StationDot = styled(PointDot)`
  width: 18px;
  height: 18px;
  border-radius: 20px;

  ${props => `background-color: ${getBg(props)};`}

  ${({ isGoogle }) => isGoogle && `
    shadow-opacity: 0;
  `}
`;

export const MarkerToolTip = styled.View`
    min-width: 50px;
    height: 20px;
    padding: 3px 6px 3px 6px;
    border-radius: 4;
    box-shadow: 0 3px 6px #b5b5b5;

    ${props => `background-color: ${getBg(props)};`}
    align-items: center;
`;

export const MarkerToolTipText = styled.Text`
    text-align: center;
    width: 100%;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    flex: 1;
`;

export const InfoBox = styled.View`
  elevation: 4;
 shadow-offset: 0px 0px;
  shadow-opacity: 0.4;
   ${Platform.OS === 'ios' ? 'top: -35px;' : ''}
   min-height: 50px;
   display: flex;
   flex-direction: column;
   background-color: #f0f0f0;
   border-radius: 8px;
   padding: 3px;
   align-items: center;
   ${Platform.OS === 'android' ? 'border-color: #bcbcbc;' : ''}
   ${Platform.OS === 'android' ? 'border-width: 1px;' : ''}
  

`;

export const Type = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 4px;
  align-items: center;
  flex: 1;
`;

export const SubText = styled.Text`
    ${FONT_SIZES.LARGE}
    ${FONT_WEIGHTS.REGULAR}
    max-width: 150px;
`;

export const IconContainer = styled.View`
left: 40%;
margin-top: 5px;
`;

export const TypeText = styled.Text`
${FONT_SIZES.LARGE}
${FONT_WEIGHTS.SEMI_BOLD}
`;

export const SubContainer = styled.View`
display: flex;
flex-direction: row;
align-items: center;
padding: 0 5px;
flex: 1;
`;

export const PulseContainer = styled.View`
width: 16px;
`;
