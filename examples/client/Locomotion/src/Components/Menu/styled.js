import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import Button from '../Button';
import { FONT_SIZES, FONT_WEIGHTS } from '../../context/theme';

export const Updates = styled.View`
background-color: ${({ theme }) => theme.primaryColor};
border-radius: 10px;
width: 30px;
align-items: center;
`;

export const UpdatesText = styled.Text`
color: #ffffff;
${FONT_SIZES.LARGE}
`;

export const LabelText = styled.Text`
  color: ${({ theme }) => theme.textColor};
  flex-grow: 1;
  ${FONT_SIZES.H2}
  ${({ focused }) => (focused ? FONT_WEIGHTS.SEMI_BOLD : FONT_WEIGHTS.REGULAR)};
`;

export const StyledSafeAreaView = styled(SafeAreaView)`
  height: 100%;
  background-color: ${({ theme }) => theme.pageBackgroundColor};
`;

export const DrawerLabelsContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
`;

export const StyledDrawerLabel = styled.TouchableOpacity`
  min-height: 50px;
  width: 75%;
  margin-left: 30px;
  flex-direction: row;
  align-items: center;
`;

export const HeaderLink = styled(Button).attrs({
  noBackground: true,
})`
`;

export const HeaderIconContainer = styled(Button).attrs({ noBackground: true })`
  padding: 5px;
  position: absolute;
  top: 6px;
  right: 0;
`;

export const BaseHeaderText = styled.Text`
  padding: 5px;
  ${FONT_SIZES.LARGE}
  ${FONT_WEIGHTS.REGULAR}
`;

export const HeaderText = styled(BaseHeaderText)`
  color: #24aaf2;
  text-decoration: underline;
  text-decoration-color: #24aaf2;
  ${FONT_SIZES.H3}
`;

export const HeaderMainText = styled(BaseHeaderText)`
  padding-top: 15px;
  ${FONT_SIZES.H1}
  ${FONT_WEIGHTS.BOLD}
`;

export const Header = styled.View`
  padding: 15px 25px;
  width: 100%;
`;
