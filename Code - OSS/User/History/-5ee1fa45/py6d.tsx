import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ExtractItem } from './ExtractItem';
import Row from '../Home/Row';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import Line from '../Home/Line';

  interface ReleasesProps {
    releases: []
  }

export default function LastReleases({ releases }: ReleasesProps) {
    return (
        <View>
            <Line marginTop={2} marginBottom={12} />
            <Row marginEnd={43} marginStart={43} marginBottom={22}>
                <Text style={fonts.regular14Gray}>Últimos lançamentos:</Text>
                <TouchableOpacity>
                <Row>
                    <Text style={fonts.regular14Gray}>Ver mais</Text>
                    <FontAwesome6 name="chevron-right" size={16} color="#7F828C" />
                </Row>
                </TouchableOpacity>
            </Row>
            {releases.slice(0, 10).map((item, index) => (
                <React.Fragment key={index}>
                <ExtractItem extract={item} />
                </React.Fragment>
            ))}
        </View>
    );
};
