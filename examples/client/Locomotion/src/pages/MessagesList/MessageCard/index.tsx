import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { MAIN_ROUTES } from '../../routes';
import i18n from '../../../I18n';
import * as NavigationService from '../../../services/navigation';
import { messageProps, MessagesContext } from '../../../context/messages';
import {
  CardContainer,
  MessageDate,
  MessageFooter,
  MessageText,
  MessageTitle,
  ReadMoreText,
  ReadSymbol,
  ReadSymbolContainer,
  TextContainer,
} from './styled';
import { getFormattedMessageDate } from '../../../context/messages/utils';

interface MessageCardProps {
  message: messageProps;
  readAt: Date | null;
  dismissedAt: Date | null;
}

const MessageCard = ({ message, readAt, dismissedAt }: MessageCardProps) => (
  <CardContainer
    noBackground
    testID={`messageCard_${message.id}`}
    onPress={() => {
      NavigationService.navigate(MAIN_ROUTES.MESSAGE_VIEW, { messageId: message.id });
    }}
    isRead={readAt}
  >
    <ReadSymbolContainer>
      {!readAt && <ReadSymbol />}
    </ReadSymbolContainer>
    <TextContainer>
      <MessageTitle numberOfLines={2}>
        {message.title}
      </MessageTitle>
      <MessageText numberOfLines={3}>
        {message.subTitle}
      </MessageText>
      <MessageFooter>
        <MessageDate>
          {getFormattedMessageDate(message)}
        </MessageDate>
        <ReadMoreText>
          {i18n.t('messages.readMore')}
        </ReadMoreText>
      </MessageFooter>
    </TextContainer>
  </CardContainer>
);


export default MessageCard;
