import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

import i18n from '../../../../I18n';
import Button from '../../../../Components/Button';

const address = `
min-height: 50;
padding-top: 10;
padding-bottom: 10px;
padding-start: 24;
align-items: center;
flex-direction: row;
`;

export const StopPointDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${({ origin, theme }) => (origin ? theme.primaryColor : theme.secondaryColor)};
  border-radius: 10px;
  /* margin-top: 10; */
`;


export const PickupRow = styled.View`
${address}
border-bottom-color: #f2f2f2;
border-bottom-width: 1;
`;

const StopPointDotContainer = styled.View`
  position: absolute;
  left: 16;
  ${({ origin }) => (origin ? 'bottom: -1;' : 'top: 0;')}
  justify-content: center;
  align-items: center;
  ${({ origin }) => (origin ? '' : 'flex-direction: column-reverse;')}
  width: 20;
  height: 100%;
`;

const StopPointDotTimeLine = styled.View`
  width: 2;
  flex: 1;
  background-color: #dbdbdb;
`;


const AddressTextCont = styled.View`
`;

const AddressText = styled.Text`
  font-size: 13;
  color: #666666;
  margin-start: 22;
  margin-end: 16;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`;

const EtaText = styled.Text`
  font-size: 13;
  color: #808080;
  margin-start: 22;
  font-size: 10px;
`;

const RowContainer = styled(Button)`
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
  ` : null)};
  background-color: ${({ theme }) => theme.pageBackgroundColor};
`;

const AddressTitle = styled.Text`
  font-size: 11px;
  color: #000000;
  margin-start: 22;
  margin-end: 16;
  font-weight: 500;
  margin-bottom: 5px;
`;

export default ({
  pickup, description, eta, completedAt, openLocationSelect, useBorder, title, selected,
}) => (
  <RowContainer pickup={pickup} onPress={openLocationSelect} useBorder={useBorder} paddingStart testID="OpenLocationSelectButton">
    <StopPointDotContainer origin={pickup}>
      <StopPointDot origin={pickup} />
      <StopPointDotTimeLine />
    </StopPointDotContainer>
    <AddressTextCont>
      <View>
        <AddressTitle>
          {title}
        </AddressTitle>
      </View>
      <View>
        <AddressText numberOfLines={2} selected={selected}>
          {description || i18n.t(pickup ? 'addressView.pickupPlaceholder' : 'addressView.dropoffPlaceholder')}
        </AddressText>
      </View>
    </AddressTextCont>
  </RowContainer>
);
