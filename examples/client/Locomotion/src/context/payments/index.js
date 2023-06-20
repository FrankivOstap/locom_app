import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { PaymentIntent } from '@stripe/stripe-react-native';
import { PAYMENT_STATES } from '../../lib/commonTypes';
import Mixpanel from '../../services/Mixpanel';
import cashPaymentMethod from '../../pages/Payments/cashPaymentMethod';
import { fetchRides } from '../newRideContext/api';
import network from '../../services/network';
import SETTINGS_KEYS from '../settings/keys';
import SettingContext from '../settings';

const BASE_PATH = '/api/v1/me/customers';

const usePayments = () => {
  const useSettings = SettingContext.useContainer();
  const [customer, setCustomer] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentAccount, setPaymentAccount] = useState(null);
  const [hasOutstandingPayment, setHasOutstandingPayment] = useState(false);

  const getCustomer = async () => {
    try {
      Mixpanel.setEvent('get customer payment data');
      const { data: clientData } = await network.get(BASE_PATH);
      return clientData;
    } catch (e) {
      const status = e && e.response && e.response.status;
      Mixpanel.setEvent('Failed to get customer payment data', { status });
    }
  };

  const loadCustomer = async () => {
    const customerData = await getCustomer();
    setCustomer(customerData);
    setPaymentMethods(customerData.paymentMethods);
    return customerData;
  };

  const getOrFetchCustomer = async () => {
    if (customer) {
      return customer;
    }

    return loadCustomer();
  };

  const setup = async () => {
    try {
      Mixpanel.setEvent('setup credit card');
      const { data: intent } = await network.post(`${BASE_PATH}/setup`);
      return intent;
    } catch (e) {
      const status = e && e.response && e.response.status;
      Mixpanel.setEvent('Failed to setup card', { status });
    }
  };

  const getClientPaymentAccount = async () => {
    try {
      Mixpanel.setEvent('get client payment account');
      const { data } = await network.get(`${BASE_PATH}/payment-account`);
      setPaymentAccount(data);
      return data;
    } catch (e) {
      const status = e && e.response && e.response.status;
      Mixpanel.setEvent('Failed to get client payment account', { status });
    }
  };

  const getOrFetchClientPaymentAccount = () => {
    if (paymentAccount) {
      return paymentAccount;
    }
    return getClientPaymentAccount();
  };

  const detachPaymentMethod = async (paymentMethodId) => {
    try {
      Mixpanel.setEvent('detach payment method', { paymentMethodId });
      const { data: paymentMethodsData } = await network.post(`${BASE_PATH}/${paymentMethodId}/detach`);
      return paymentMethodsData;
    } catch (e) {
      const status = e && e.response && e.response.status;
      Mixpanel.setEvent('Failed to detach payment method', { status });
    }
  };

  const clientHasValidPaymentMethods = () => paymentMethods.length > 0
  && paymentMethods.some(pm => !pm.isExpired);

  const getClientDefaultMethod = (enableCash) => {
    if (paymentMethods && paymentMethods.length) {
      return (paymentMethods || []).find(pm => pm.isDefault) || paymentMethods[0];
    }
    if (enableCash) {
      return cashPaymentMethod;
    }
  };

  const createPaymentMethod = async (paymentMethodId) => {
    try {
      Mixpanel.setEvent('create payment method', { paymentMethodId });
      const { data: paymentMethod } = await network.post(`${BASE_PATH}/${paymentMethodId}`);
      return paymentMethod;
    } catch (e) {
      const status = e && e.response && e.response.status;
      Mixpanel.setEvent('Failed to create payment method', { status });
    }
  };

  const updatePaymentMethod = async (paymentMethodId, values) => {
    try {
      Mixpanel.setEvent('updating payment method', { paymentMethodId });
      const { data: paymentMethod } = await network.patch(`${BASE_PATH}/${paymentMethodId}`, values);
      return paymentMethod;
    } catch (e) {
      const status = e && e.response && e.response.status;
      Mixpanel.setEvent('Failed to update payment method', { status });
    }
  };

  const retryPayment = async (paymentId) => {
    try {
      Mixpanel.setEvent('retry payment', { paymentId });
      const { data } = await network.post(`${BASE_PATH}/${paymentId}/retry`);
      Mixpanel.setEvent('retry payment response', { paymentId, data });
      await loadCustomer();
      return data.state === PAYMENT_STATES.PAID;
    } catch (e) {
      const status = e && e.response && e.response.status;
      Mixpanel.setEvent('Retry payment failed', { status });
      await loadCustomer();
      return false;
    }
  };

  const getClientOutstandingBalanceCard = () => {
    const has = paymentMethods.find(pm => pm.hasOutstandingBalance);
    return has;
  };

  useEffect(() => {
    if (paymentMethods && paymentMethods.length) {
      if (paymentMethods.find(pm => pm.hasOutstandingBalance)) {
        setHasOutstandingPayment(true);
      } else {
        setHasOutstandingPayment(false);
      }
    }
  }, [paymentMethods]);

  const loadOutstandingBalanceRide = async () => {
    const returnObject = {
      rideId: null,
    };
    const paymentMethod = getClientOutstandingBalanceCard();
    if (paymentMethod) {
      const { data: details } = await network.get(`${BASE_PATH}/${paymentMethod.id}/outstanding-balance`, {
        params: {
          includePayments: true,
        },
      });
      if (details && details.payments.length) {
        const { data: ride } = await network.get('/api/v1/me/rides', {
          params: {
            paymentId: details.payments[0].id,
          },
        });
        returnObject.rideId = ride[0].id;
      }
    }
    return returnObject;
  };

  return {
    paymentAccount,
    getClientPaymentAccount,
    getCustomer,
    customer,
    loadCustomer,
    setup,
    paymentMethods,
    detachPaymentMethod,
    getOrFetchCustomer,
    clientHasValidPaymentMethods,
    getClientDefaultMethod,
    createPaymentMethod,
    updatePaymentMethod,
    getClientOutstandingBalanceCard,
    getOrFetchClientPaymentAccount,
    loadOutstandingBalanceRide,
    retryPayment,
    hasOutstandingPayment,
  };
};

export default createContainer(usePayments);
