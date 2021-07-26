import DropDownPicker, { DropDownPickerInstanceType, DropDownPickerProps } from 'react-native-dropdown-picker';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { BGCOLOR, BR, BW, colorTransparency, FDR, H, MT, provideShadow } from '../common/styles';
import { getHP } from '../common/dimension';
import { FontFamily, fs12, fs14, fs20 } from '../common';
import WrappedText from '../component/WrappedText';

export interface DropDownTitleProps {
    data: { label: string; value: string }[];
    selectValue: string;
    setValue: Function;
    callBack?: Function;
    zIndex: number;
    arrowColor?: string;
    header?: string;
    disabled?: boolean;
    placeholder: string;
    zIndexInverse?: number;
    provideController?: Function;
}

const dropDownProps = {
    min: 0,
    max: 10,

    style: [
        BW(0),
        BGCOLOR('#f7f7f7'),
        {
            borderTopRightRadius: getHP(0.08),
            borderTopLeftRadius: getHP(0.08),
            borderBottomRightRadius: getHP(0.08),
            borderBottomLeftRadius: getHP(0.08),
        },
    ],
    containerStyle: [H(getHP(Platform.OS == 'ios' ? 0.6 : 0.7)), MT(0.1), BW(0)],
    itemStyle: {
        justifyContent: 'flex-start',
    },
    dropDownStyle: [
        BW(0),
        provideShadow(6),
        {
            borderTopRightRadius: getHP(0.08),
            borderTopLeftRadius: getHP(0.08),
            borderBottomRightRadius: getHP(0.08),
            borderBottomLeftRadius: getHP(0.08),
        },
    ],
    arrowSize: fs20,
    labelStyle: { letterSpacing: 0.5, color: '#646464', fontSize: fs12 },
};

const DropDownTitle: React.SFC<DropDownTitleProps> = ({
    data,
    selectValue,
    setValue,
    callBack = () => {},
    zIndex,
    arrowColor,
    header,
    placeholder,
    provideController,
    zIndexInverse,
    disabled,
}) => {
    const [open, setOpen] = React.useState(false);
    return (
        // <View style={[{ zIndex: zIndex }, MT(0.2)]}>
        //     <WrappedText
        //         text={header}
        //         fontFamily={FontFamily.RobotoRegular}
        //         textStyle={{ letterSpacing: 0.5 }}
        //         textColor={'#000000'}
        //         fontSize={fs14}
        //     />
        <View style={[FDR()]}>
            <DropDownPicker
                open={open}
                disabled={disabled}
                setOpen={setOpen}
                controller={provideController}
                items={data}
                noBottomRadius={false}
                noTopRadius={false}
                value={selectValue}
                defaultValue={data.length > 0 && (selectValue || undefined)}
                placeholder={placeholder}
                onChangeValue={(value) => {
                    console.log('value =>', value);
                }}
                setValue={(value) => {
                    setValue(value());
                }}
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}
                {...dropDownProps}
                arrowColor={arrowColor || '#800947' + colorTransparency[60]}
            />
        </View>
    );
};

export default DropDownTitle;
