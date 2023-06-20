import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import i18n from '../../../I18n';

import RideRoundedButton from '../../../Components/RoundedButton';

export const Drawer = styled.View`
  position: absolute;
  bottom: 50;
  width: 90%;
  background-color: #fff;
  left: 5%;
  border-radius: 10px;
  shadow-offset: 0px 0px;
  shadow-color: #04214f;
  shadow-opacity: 0.4;
`;

const address = `
  min-height: 50;
  padding-top: 10;
  padding-bottom: 10px;
  padding-start: 24;
  align-items: center;
  flex-direction: row;
`;


export const RideCard = styled.View`
  ${address}
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1;
  flex-direction: column;
  padding-start: 10;
  padding-end: 20;
`;

export const DriverAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 100;
  margin-left: 15px;
  border-width: 1px;
  border-color: #a7a7a7;
  margin-bottom: 10px;
`;

const styleForDriverIsArrivedState = `
  height: 60px;
  color: #00aeef;
  margin-top: 40px;
`;

export const RideStatusText = styled.Text`
  font-size: 16px;
  color: #666666;
  margin-start: 12;
  ${({ state }) => (state === 'driverArrived' ? styleForDriverIsArrivedState : null)}
`;

export const RideDetailsText = styled.Text`
  font-size: 13px;
  color: #666666;
  margin-start: 10;
  text-align: ${({ right }) => (right ? 'right' : 'left')};
  /* background-color: red; */
`;

export const RideButtonContainer = styled.View`
  margin: 10px auto;
  height: 40px;
  width: 50%;
`;

export const RideButton = styled(RideRoundedButton)`
  /*
  ${({ inRide, readyToBook }) => {
    if (inRide) {
      return 'background-color: red;';
    }
    if (readyToBook) {
      return 'background-color: #00435c;';
    }
    return 'background-color: #666666;';
  }} */
  /* background-color: #666666; */
`;

export const RideDetailsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  margin-top: 16;
`;

export const RideButtonText = styled.Text`
  color: #fff;
  font-size: 18;
`;


export const RowContainer = styled.TouchableOpacity`
  min-height: 50;
  padding-top: 10;
  padding-bottom: 10px;
  align-items: center;
  flex-direction: row;
  ${({ paddingStart }) => (paddingStart ? `
  padding-start: 24;
  ` : null)}
  ${({ useBorder }) => (useBorder ? `
    border-bottom-color: #f2f2f2;
    border-bottom-width: 1;
  ` : null)}
`;

const EtaContainer = styled.View`
  flex-direction: row;
  align-self: flex-end;
`;

const EtaText = styled.Text`

`;
const EtaTitleText = styled.Text`
  font-weight: 500;
`;

export const PreRideBox = styled(({ eta, estimatePrice, ...props }) => (
  <View {...props}>
    <EtaContainer>
      <EtaTitleText>ETA: </EtaTitleText>
      <EtaText>{eta ? eta.toFixed(0) : ''}</EtaText>
    </EtaContainer>
    <EtaContainer right>
      <EtaTitleText>Estimate price: </EtaTitleText>
      <EtaText>
        {estimatePrice ? estimatePrice.toFixed(0) : ''}
        {i18n.t('currency')}
      </EtaText>
    </EtaContainer>
  </View>
))`
    padding: 10px 25px;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
  `;


export const RideTypeButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
`;


export const RideTypeButtonText = styled.Text`
  flex: 1;
  min-width: 120px;
  text-align: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  border-radius: 5px;
  background-color: #e6f0f5;
  ${({ active }) => (active ? `
  background-color: #c9e2f0;
  box-shadow: 0px 5px 5px rgba(0,0,0,0.05);
  ` : null)}
`;
