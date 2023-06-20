import React, {
  forwardRef, useEffect, useImperativeHandle, useRef,
} from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';
import { STOP_POINT_TYPES, formatUiDisplaySpType } from '../../../lib/commonTypes';
import { DropoffIconMarker, PickupIconMarker } from '../marker';
import { MarkerTitle } from './styled';
import i18n from '../../../I18n';
import { getSpTextWithNumberPrefix, getOrdinal } from '../../../lib/ride/utils';

const mapStyle = {
  ...StyleSheet.absoluteFillObject,
};

const SpMarker = ({ sp, disableMarkers }) => (
  <Marker
    key={`Marker#${sp.lat}#${sp.lng}#${sp.type}`}
    coordinate={{
      latitude: parseFloat(sp.lat),
      longitude: parseFloat(sp.lng),
    }}
    style={{
      alignItems: 'center',
    }}
  >
    <MarkerTitle type={sp.type}>
      {getSpTextWithNumberPrefix(sp)}
    </MarkerTitle>
    {sp.type === STOP_POINT_TYPES.STOP_POINT_PICKUP ? <PickupIconMarker disableMarkers={disableMarkers} onMap /> : undefined}
    {sp.type === STOP_POINT_TYPES.STOP_POINT_DROPOFF ? <DropoffIconMarker disableMarkers={disableMarkers} onMap /> : undefined}
  </Marker>
);

const Map = forwardRef(({
  ride: { stopPoints },
  disableMarkers,
}, ref) => {
  const mapInstance = useRef();
  const isFocused = useIsFocused();


  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (mapInstance && mapInstance.current && mapInstance.current.fitToElements) {
        mapInstance.current.fitToElements(({
          // for android, ignored by ios
          edgePadding: {
            top: 170,
            right: 10,
            bottom: 0,
            left: 10,
          },
          animated: true,
        }));
      }
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [mapInstance, stopPoints, isFocused]);

  useImperativeHandle(ref, () => ({
    fitToCoordinates: ({ lat, lng }) => setImmediate(() => {
      if (mapInstance && mapInstance.current && mapInstance.current.fitToCoordinates) {
        mapInstance.current.animateCamera({
          center: {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          },
          heading: 0,
          altitude: 1000,
          zoom: 10,
        });
      }
    }),
  }));

  return (
    <MapView
      ref={mapInstance}
      zoom={15}
      style={mapStyle}
      showMyLocation={false}
      followMyLocation={false}
    >
      {stopPoints && stopPoints.map(sp => (sp.lat && sp.lng ? (
        <SpMarker
          key={`Marker#${sp.lat}#${sp.lng}#${sp.type}`}
          sp={sp}
          disableMarkers={disableMarkers}
        />
      ) : (<></>)))}
    </MapView>
  );
});

export default Map;
