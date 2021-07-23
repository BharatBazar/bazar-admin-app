import * as React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { DashboardIconList } from './DashboardSvg';
import AllSvg from './index';

const HandleSvg = (
    style: StyleProp<ViewStyle>,
    color: string,
    name: DashboardIconList,
    height: string,
    width: string,
) => <View style={style}>{AllSvg[name](height, width, color)}</View>;

export default HandleSvg;
