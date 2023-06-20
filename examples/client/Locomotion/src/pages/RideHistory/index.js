import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import GenericErrorPopup from '../../popups/GenericError';
import { HeaderIconContainer } from '../../Components/PageHeader/styled';
import { CenterContainer } from './RideCard/styled';
import RidesList from './RidesList';
import Loader from '../../Components/Loader';
import FilterBar from './FilterBar';
import { MAIN_ROUTES } from '../routes';
import i18n from '../../I18n';
import { FILTERS, formatDateBeforeSend } from './filters';
import PageHeader from '../../Components/PageHeader';
import {
  CalendarSvgIcon,
  PageContent,
} from './styled';
import { rideHistoryContext } from '../../context/rideHistory';
import { PageContainer } from '../styles';
import {
  DD_MMMM_YYYY, endOfDayTime, startOfDayTime, YYYY_MM_DD,
} from './consts';
import RangeDateTimePicker from './RangeDateTimePicker';
import * as navigationService from '../../services/navigation';

const getCustomFilter = filterId => ({
  [filterId]: {
    id: filterId,
    title: filterId,
    isCustomFilter: true,
  },
});

const Page = ({ menuSide }) => {
  const {
    rides, loadRides, initRides, savedParams,
  } = useContext(rideHistoryContext);
  const [filter, setFilter] = useState(savedParams ? savedParams.filterId : FILTERS().today.id);
  const [customFilter, setCustomFilter] = useState(savedParams && !FILTERS()[savedParams.filterId]
    ? getCustomFilter(savedParams.filterId) : {});
  const [showLoader, setLoader] = useState(!rides);
  const [showRangeDateTimePicker, setShowRangeDateTimePicker] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const getRidesWithErrorHandler = async (rideLoaderFunction) => {
    try {
      await rideLoaderFunction();
    } catch (e) {
      setShowErrorPopup(true);
    }
  };

  const onPageLoaded = async () => {
    const { today } = FILTERS();
    await getRidesWithErrorHandler(async () => initRides({
      initFilterId: today.id,
      ...(today.getParams()),
    }));
    setLoader(false);
  };

  useEffect(() => {
    onPageLoaded();
  }, []);

  const onFilterClicked = async (filterId) => {
    setCustomFilter({});
    setLoader(true);
    const filterClicked = FILTERS()[filterId];
    setFilter(filterId);
    await getRidesWithErrorHandler(async () => loadRides({
      filterId: filterClicked.id,
      ...(filterClicked.getParams()),
    }));
    setLoader(false);
  };

  const onCustomFilterClicked = async (newFromDate, newToDate) => {
    setShowRangeDateTimePicker(false);
    setLoader(true);

    const momentNewFromDate = moment(newFromDate);
    const momentNewToDate = moment(newToDate);

    const filterId = `${momentNewFromDate.format(DD_MMMM_YYYY)} to ${momentNewToDate.format(DD_MMMM_YYYY)}`;
    setFilter(filterId);
    setCustomFilter(getCustomFilter(filterId));
    await getRidesWithErrorHandler(async () => loadRides({
      filterId,
      fromDate: formatDateBeforeSend(`${momentNewFromDate.format(YYYY_MM_DD)} ${startOfDayTime}`),
      toDate: formatDateBeforeSend(`${momentNewToDate.format(YYYY_MM_DD)} ${endOfDayTime}`),
    }));
    setLoader(false);
  };

  return (
    <PageContainer>
      <PageContent>
        {showRangeDateTimePicker && (
          <RangeDateTimePicker
            onCancel={() => setShowRangeDateTimePicker(false)}
            onConfirm={onCustomFilterClicked}
          />
        )}
        <PageHeader
          title={i18n.t('rideHistory.pageTitle')}
          onIconPress={() => navigationService.navigate(MAIN_ROUTES.HOME)}
          iconSide={menuSide}
          action={(
            <HeaderIconContainer
              onPress={() => setShowRangeDateTimePicker(true)}
              testID="calendarIcon"
            >
              <CalendarSvgIcon />
            </HeaderIconContainer>
          )}
        />
        <View>
          <FilterBar
            onFilterClicked={onFilterClicked}
            activeFilter={filter}
            filters={{
              ...customFilter,
              ...FILTERS(),
            }}
          />
        </View>
        {showLoader ? (
          <CenterContainer addTop>
            <Loader
              dark
              lottieViewStyle={{
                height: 15, width: 15,
              }}
            />
          </CenterContainer>
        ) : (
          <RidesList activeFilter={filter} rides={rides} />
        )}
      </PageContent>
      <GenericErrorPopup
        isVisible={showErrorPopup}
        closePopup={() => {
          navigationService.navigate(MAIN_ROUTES.HOME);
        }}
      />
    </PageContainer>
  );
};

export default Page;
