import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { PaymentIcon } from 'react-native-payment-icons';
import { View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import { RIDE_STATES } from '../../lib/commonTypes';
import { PriceCalculation, RideInterface, RidePageContext } from '../../context/newRideContext';
import i18n from '../../I18n';
import RoundedButton from '../RoundedButton';
import TextRowWithIcon from '../TextRowWithIcon';
import {
  CardContainer, RideDate, ServiceType, DateContainer, EstimatedText,
  TopTextsContainer, TopPriceContainer,
} from './styled';
import StopPointsVerticalView from '../StopPointsVerticalView';
import { getFormattedPrice, isPriceEstimated, convertTimezoneByLocation } from '../../context/newRideContext/utils';
import cashIcon from '../../assets/cash.svg';
import { PAYMENT_METHODS } from '../../pages/Payments/consts';

interface CardComponentProps {
  paymentMethod: {
    name: string;
    brand: any;
    id: string;
  }
}
const CardComponent = ({ paymentMethod }: CardComponentProps) => {
  const isCash = PAYMENT_METHODS.CASH === paymentMethod.id;
  const isOffline = PAYMENT_METHODS.OFFLINE === paymentMethod.id;

  const getText = () => {
    if (isCash) {
      return i18n.t('payments.cash');
    } if (isOffline) {
      return i18n.t('payments.offline');
    }
    return paymentMethod.name;
  };

  const getIcon = () => {
    if (isCash) {
      return cashIcon;
    }
    if (isOffline) {
      return null;
    }
  };
  return (
    <TextRowWithIcon
      text={getText()}
      Image={() => !isCash && !isOffline && <PaymentIcon type={paymentMethod.brand} />}
      icon={getIcon()}
      style={{ marginTop: 10, marginBottom: 10 }}
      iconWidth={40}
      iconHeight={20}
    />
  );
};

interface RideCardProps {
    ride: RideInterface;
    onPress: (ride: RideInterface) => void;
    serviceName: string | undefined;
    paymentMethod: any;
    scheduledTo: string | number;
    pickupWindowTime: number;
}

const RideCard = ({
  ride, onPress, serviceName, paymentMethod, scheduledTo, pickupWindowTime,
}: RideCardProps) => {
  const [ridePriceCalculation, setRidePriceCalculation] = useState<PriceCalculation>();
  const [timezonedScheduledTo, setTimezonedScheduledTo] = useState<string | null>(null);
  const [displayTimezone, setDisplayTimezone] = useState<string | null>(null);
  const {
    getRidePriceCalculation,
  } = useContext(RidePageContext);

  const addPriceCalculation = async () => {
    const price = await getRidePriceCalculation(ride.id, ride.priceCalculationId);
    setRidePriceCalculation(price);
  };

  useEffect(() => {
    if (!ridePriceCalculation) {
      addPriceCalculation();
    }
  }, [ride]);

  const formatScheludedTo = async (time: any) => {
    try {
      const { stopPoints = [] } = ride;
      const unixScheduledTo = moment.utc(time);
      const convertedTime = await convertTimezoneByLocation(
        stopPoints[0]?.lat,
        stopPoints[0]?.lng,
        unixScheduledTo,
        false,
      );

      const newScheduledTo = moment.parseZone(convertedTime.time).format('MMM DD, YYYY [at] h:mm A');
      const scheduledBeforeTime = pickupWindowTime
        ? moment.parseZone(convertedTime.time).add(pickupWindowTime, 'minutes').format('h:mm A')
        : i18n.t('general.noTimeWindow');
      setTimezonedScheduledTo(`${newScheduledTo} - ${scheduledBeforeTime}`);
      setDisplayTimezone(null);
    } catch (e) {
      const newScheduledTo = moment(time).format('MMMM DD, YYYY, h:mm A');
      setTimezonedScheduledTo(newScheduledTo);
      setDisplayTimezone(moment.tz.guess());
    }
  };
  useEffect(() => {
    formatScheludedTo(scheduledTo);
  }, [scheduledTo, pickupWindowTime]);
  return (
    <CardContainer>
      <DateContainer>
        <TopTextsContainer>
          <RideDate>
            {!timezonedScheduledTo
              ? (
                <SkeletonContent
                  containerStyle={{}}
                  isLoading
                  layout={[
                    { width: 150, height: 17 },
                  ]}
                />
              ) : timezonedScheduledTo}
          </RideDate>
          {displayTimezone ? (
            <ServiceType>
              (
              {displayTimezone}
              )
            </ServiceType>
          ) : null}
          <ServiceType>
            {serviceName}
          </ServiceType>
        </TopTextsContainer>
        <TopPriceContainer>
          <RideDate>
            {getFormattedPrice(ride.priceCurrency, ride.priceAmount)}
          </RideDate>
          {ridePriceCalculation && isPriceEstimated(ridePriceCalculation.calculationBasis)
            ? (
              <EstimatedText>
                {i18n.t('rideDetails.estimatedFare').toString()}
              </EstimatedText>
            )
            : null}
          {displayTimezone ? <ServiceType /> : null}
        </TopPriceContainer>
      </DateContainer>

      <StopPointsVerticalView ride={ride} />
      {paymentMethod && <CardComponent paymentMethod={paymentMethod} />}
      <RoundedButton testID="cancelRide" onPress={onPress} hollow type="cancel">
        {i18n.t('home.cancelRideButton')}
      </RoundedButton>
    </CardContainer>
  );
};

export default RideCard;
