import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { BackHandler } from 'react-native';
import PriceBreakdown from '../../Components/PriceBreakdown';
import CloseButton from '../../Components/CloseButton';
import ServiceCard from '../../pages/ActiveRide/RideDrawer/RideOptions/ServiceOptions/ServiceCard';
import {
  InnerContainer,
  OuterContainer,
  EstimatedText,
  EstimatedTextContainer,
} from './styled';
import i18n from '../../I18n';
import { Line } from '../../Components/PriceBreakdown/styled';
import { getPriceCalculation } from '../../context/newRideContext/api';


interface FareBreakdownPopupProps {
  isVisible: boolean;
  service: any;
  onClose: any;
}

const FareBreakdownPopup = ({
  isVisible,
  service,
  onClose,
}: FareBreakdownPopupProps) => {
  const [priceCalculation, setPriceCalculation] = useState(null);
  const [didRequestFail, setDidRequestFail] = useState(false);
  const loadPriceCalculation = async () => {
    try {
      setDidRequestFail(false);
      const response = await getPriceCalculation(service.priceCalculationId);
      setPriceCalculation(response);
    } catch {
      setDidRequestFail(true);
    }
  };
  useEffect(() => {
    loadPriceCalculation();
  }, []);

  return (
    <Modal isVisible={isVisible} onBackButtonPress={onClose}>
      <OuterContainer>
        <InnerContainer>
          <CloseButton onPress={onClose} containerStyles={{ alignSelf: 'flex-end' }} />
          <ServiceCard service={service} />
          {service.isPriceEstimated && (
          <EstimatedTextContainer>
            <EstimatedText>
              {`${i18n.t('ridePriceBreakdown.estimatedText')}`}
            </EstimatedText>
          </EstimatedTextContainer>
          )}
        </InnerContainer>
        {service.isPriceEstimated && <Line />}
        <PriceBreakdown
          priceCalculation={priceCalculation}
          didRequestFail={didRequestFail}
          retryGetPriceBreakdown={loadPriceCalculation}
        />
      </OuterContainer>
    </Modal>
  );
};

export default FareBreakdownPopup;
