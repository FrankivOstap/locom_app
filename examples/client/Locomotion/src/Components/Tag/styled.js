import { Platform } from 'react-native';
import styled from 'styled-components';
import { FONT_SIZES, FONT_WEIGHTS } from '../../context/theme';

export const Container = styled.View`
border-radius: 8px;
padding: 2px 8px;
`;

export const TagText = styled.Text`
${FONT_SIZES.MEDIUM};
${FONT_WEIGHTS.REGULAR};
${Platform.OS !== 'ios' && 'line-height: 16px'}
color:  ${({ color }) => color};
`;
