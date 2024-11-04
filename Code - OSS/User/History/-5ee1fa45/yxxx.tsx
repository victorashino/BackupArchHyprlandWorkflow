import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ExtractItem } from './ExtractItem';
import Row from '../Row';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import { style } from './style';
import { colors } from '@/src/styles/global';

  interface ReleasesProps {
    releases: []
  }

export default function LastReleases({ releases }: ReleasesProps) {
    return (
        <View style={style.container}>
            <Row marginEnd={43} marginStart={43} marginBottom={22} marginTop={16}>
                <Text style={fonts.regular14Gray}>Últimos lançamentos:</Text>
                <TouchableOpacity>
                <Row>
                    <Text style={fonts.regular14Gray}>Ver mais</Text>
                    <FontAwesome6 name="chevron-right" size={16} color={colors.gray} />
                </Row>
                </TouchableOpacity>
            </Row>
            {releases.slice(0, 4).map((item, index) => (
                <React.Fragment key={index}>
                <ExtractItem extract={item} />
                </React.Fragment>
            ))}
        </View>
    );
};