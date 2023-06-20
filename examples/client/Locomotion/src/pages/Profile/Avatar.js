import React, { useContext, useState } from 'react';
import i18n from '../../I18n';
import SaveButton from './SaveButton';
import { OnboardingContext } from '../../context/onboarding';
import {
  ImageContainer, Name, SafeView,
} from './styles';
import Header from './Header';
import ScreenText from './ScreenText/index';
import ThumbnailPicker from '../../Components/ThumbnailPicker';
import { MAIN_ROUTES } from '../routes';
import { UserContext } from '../../context/user';
import { PageContainer, ContentContainer } from '../styles';

const Avatar = () => {
  const { updateUserInfo, user } = useContext(UserContext);
  const [photoSelected, setPhotoSelected] = useState(user.avatar);
  const { nextScreen } = useContext(OnboardingContext);

  const onImageChoose = (image) => {
    setPhotoSelected(image);
  };

  return (

    <PageContainer>
      <Header
        title={i18n.t('onboarding.pages.avatar.title')}
        page={MAIN_ROUTES.AVATAR}
      />
      <ContentContainer>
        <ScreenText
          text={i18n.t('onboarding.pages.avatar.text')}
          subText={i18n.t('onboarding.pages.avatar.subText')}
        />
        <ImageContainer>
          <ThumbnailPicker
            onImageChoose={onImageChoose}
            avatarSource={photoSelected}
            size={125}
          />
          <Name numberOfLines={1}>{`${user.firstName} ${user.lastName}`}</Name>
        </ImageContainer>
        <SaveButton
          onNext={() => {
            updateUserInfo({ avatar: photoSelected });
            nextScreen(MAIN_ROUTES.AVATAR);
          }}
          isInvalid={!photoSelected}
        />
      </ContentContainer>
    </PageContainer>
  );
};

export default Avatar;
