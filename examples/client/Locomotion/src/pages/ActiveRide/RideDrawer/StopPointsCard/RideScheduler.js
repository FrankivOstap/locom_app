import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import i18n from '../../../../I18n';
import DateTimePicker from './DateTimePicker';
import Button from '../../../../Components/Button';

const Container = styled.View`
  min-height: 50;
  padding-bottom: 10px;

  flex-direction: column;
  padding-start: 20;
  padding-end: 20;

`;

const TimeItemContainer = styled.View`
  width: 100%;
  height: 35px;
  flex-direction: row;
  margin-bottom: 10px;
`;

const TimeItem = styled(Button)`
  flex: 1;
  background-color: ${({ selected, theme }) => (selected ? theme.primaryColor : theme.pageBackgroundColor)};
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #b5b5b5;

  ${({ side }) => (side === 'right' ? `
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left-width: 0;
  ` : null)}

  ${({ side }) => (side === 'left' ? `
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right-width: 0;
  ` : null)}

  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};

  `;

const TextContainer = styled.Text`
  color: ${({ selected }) => (selected ? '#ffffff' : '#b5b5b5')};
  font-size: 14px;
`;

const TitleContainer = styled.Text`
  flex: 1;
  padding-start: 20px;
`;

const SelectionTitle = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  padding-bottom: 5px;
`;

const OrderTimeSelector = ({
  selected, text, onPress, side, disabled,
}) => (
  <TimeItem selected={selected} onPress={onPress} side={side} disabled={disabled} testID={`${text}OrderTimeButton`}>
    <TextContainer selected={selected}>{text}</TextContainer>
  </TimeItem>

);

export default ({ onScheduleTimeSelect, disableFuture = false, scheduledTo }) => {
  const [scheduleType, setScheduleType] = useState('now');

  const onScheduleTypeSelect = (type) => {
    setScheduleType(type);
    if (type === 'now') {
      onScheduleTimeSelect(null);
    }
  };

  useEffect(() => {
    if ((scheduledTo && scheduleType === 'now') && !disableFuture) {
      onScheduleTypeSelect('future');
    } else {
      onScheduleTypeSelect('now');
    }
  }, []);

  return (
    <Container>
      <SelectionTitle>
        {i18n.t('home.RideScheduler.timeSelectionTitle')}
      </SelectionTitle>
      <TimeItemContainer>
        <OrderTimeSelector
          text={i18n.t('home.RideScheduler.now')}
          selected={scheduleType === 'now'}
          onPress={() => onScheduleTypeSelect('now')}
          side="left"
        />
        <OrderTimeSelector
          text={i18n.t('home.RideScheduler.future')}
          selected={scheduleType === 'future'}
          onPress={() => onScheduleTypeSelect('future')}
          side="right"
          disabled={disableFuture}
        />
      </TimeItemContainer>
      {scheduleType === 'future'
        ? (
          <DateTimePicker
            onScheduleTimeSelect={onScheduleTimeSelect}
          />
        )
        : null}
    </Container>
  );
};
