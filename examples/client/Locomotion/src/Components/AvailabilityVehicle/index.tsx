import React, {
  useContext, useEffect, useState, useRef, useCallback,
} from 'react';
import {
  Platform,
} from 'react-native';
import { MarkerAnimated, AnimatedRegion } from 'react-native-maps';
import { Context as ThemeContext } from '../../context/theme';
import SvgIcon from '../SvgIcon';
import carIcon from '../../assets/map/Autofleet_Car_Icon.svg';

interface Location {
  lat: number;
  lng: number;
  bearing: number;
}

interface AvailabilityVehicleProps {
  location: Location;
  id: string;
}

const DURATION = 5000;

const areEqual = (
  prev: AvailabilityVehicleProps,
  next: AvailabilityVehicleProps,
) => prev.id === next.id
  && prev.location.lat === next.location.lat
  && prev.location.lng === next.location.lng
  && prev.location.bearing === next.location.bearing;

const insureNumberType = (v: string | number) => {
  if (typeof v === 'string') {
    return parseFloat(v);
  }
  return v;
};
const AvailabilityVehicle = ({
  location,
  id,
}: AvailabilityVehicleProps) => {
  const { useVehicleColor } = useContext(ThemeContext);
  const { vehicleColor } = useVehicleColor();
  const markerRef = useRef<MarkerAnimated>(null);
  const [locationAnimated] = useState(new AnimatedRegion({
    latitude: insureNumberType(location.lat),
    latitudeDelta: 0.1,
    longitude: insureNumberType(location.lng),
    longitudeDelta: 0.1,
  }));

  useEffect(() => {
    if (location.lat && location.lng) {
      if (Platform.OS === 'android') {
        setTimeout(() => {
          markerRef?.current?.animateMarkerToCoordinate({
            latitude: insureNumberType(location.lat),
            longitude: insureNumberType(location.lng),
          }, DURATION);
        }, 0);
      } else {
        locationAnimated.timing({
          latitude: location.lat,
          longitude: location.lng,
          useNativeDriver: false,
          duration: DURATION,
        }).start();
      }
    }
  }, [location]);

  const onPressWorkaround = useCallback(() => {
    try {
      markerRef?.current?.hideCallout();
    } catch (e) {
      console.log('error', e);
    }
  }, [markerRef]);

  const svgStyle : any = { color: vehicleColor };
  if (location?.bearing) {
    svgStyle.transform = [{ rotate: `${location.bearing}deg` }];
  }
  return (
    <MarkerAnimated
      key={id}
      ref={markerRef}
      coordinate={locationAnimated}
      anchor={{ x: 0.5, y: 0.40 }}
      tappable={false}
      // tooltip workaround, need to upgrade library
      onPress={onPressWorkaround}

    >
      <SvgIcon
        Svg={carIcon}
        height={48}
        width={48}
        style={svgStyle}
      />
    </MarkerAnimated>

  );
};

export default React.memo(AvailabilityVehicle, areEqual);
