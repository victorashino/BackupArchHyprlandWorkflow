import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ExtractItem } from './ExtractItem';
import Row from '../Home/Row';
import { fonts } from '@/src/styles/global';
import { FontAwesome6 } from '@expo/vector-icons';
import Line from '../Home/Line';

  interface ReleasesProps {
    releases: []
  }

export default function LastReleases({ releases }: ReleasesProps) {
    return (
        <View style={{paddingBottom: 0}}>
            <Line marginTop={2} marginBottom={12} />
            <Row marginEnd={43} marginStart={43} marginBottom={22}>
                <Text style={{
                fontFamily: fonts.fontRegular,
                fontSize: 14,
                color: "#7F828C",
                }}>Últimos lançamentos:</Text>
                <TouchableOpacity>
                <Row>
                    <Text style={{
                    fontFamily: fonts.fontRegular,
                    fontSize: 14,
                    color: "#7F828C",
                    marginEnd: 8,
                    textDecorationLine: 'underline',
                    }}>Ver mais</Text>
                    <FontAwesome6 name="chevron-right" size={16} color="#7F828C" />
                </Row>
                </TouchableOpacity>
            </Row>
            {releases.slice(0, 2).map((item, index) => (
                <React.Fragment key={index}>
                <ExtractItem extract={item} />
                </React.Fragment>
            ))}
        </View>
    );
};
