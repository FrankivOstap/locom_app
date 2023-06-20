import styled from 'styled-components';
import { BaseText } from '../../Components/BaseText';
import { ERROR_COLOR, FONT_SIZES, FONT_WEIGHTS } from '../../context/theme';
import Button from '../../Components/Button';

export const BaseErrorText = styled.Text`
  color: ${ERROR_COLOR};
  ${FONT_SIZES.MEDIUM};
  ${FONT_WEIGHTS.MEDIUM};
  margin-top: 15px;
  width: 80%;
`;

export const ErrorText = styled(BaseErrorText)`
  text-align: center;
  align-self: center;
`;

export const SafeView = styled.SafeAreaView`
flex: 1;
background-color: white;
`;

export const ResendContainer = styled.View`
width: 100%;
text-align: center;
align-items: center;
margin-top: 50px;
opacity: .7;
flex-direction: column;
`;

export const ResendText = styled(BaseText)`
color: #707070;
${FONT_SIZES.LARGE};
${FONT_WEIGHTS.REGULAR}
`;

export const ResendButtonText = styled(ResendText)`
text-decoration: underline;
${({ theme }) => `
  text-decoration-color: ${theme.primaryColor};
  `}
`;

export const ResendButton = styled(Button).attrs({
  noBackground: true,
})`
  ${FONT_SIZES.LARGE};
  ${FONT_WEIGHTS.REGULAR};
  ${({ disabled }) => `
  ${disabled ? 'opacity: 0.3;' : '1'}
  `}
`;

export const ImageContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
`;
export const Name = styled(BaseText)`
${FONT_SIZES.H1};
${FONT_WEIGHTS.BOLD};
margin: 20px;
max-width: 55%;
`;

export const InputContainer = styled.View`
  margin: 15px auto;
  width: 100%
`;

export const Line = styled.View`
flex-direction: row;
margin-bottom: 10px;
`;
