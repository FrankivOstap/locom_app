import React from 'react';
import { PageContent } from './styled';
import NewCreditForm from '../../Components/NewCreditForm';

export default ({ onDone, canSkip = true, PageText }) => (
  <NewCreditForm
    PageText={PageText}
    canSkip={canSkip}
    onDone={onDone}
  />
);
