import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ExtractItem } from './ExtractItem';
import Row from '../Row';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import { style } from './style';
import { colors } from '@/src/styles/global';
import globalFonts from '@/src/styles/fonts';
import { router } from 'expo-router';

interface ReleasesProps {
    releases: []
}

export default function LastReleases({ releases }: ReleasesProps) {
    return (
        <View style={style.container}>
            <Row marginEnd={43} marginStart={43} marginBottom={22} marginTop={16} justify='space-between'>
                <Text style={fonts.regular14Gray}>Últimos lançamentos:</Text>
                <TouchableOpacity onPress={() => router.replace('/(home)/extract')}>
                    <Row>
                        <Text style={[fonts.regular14Gray, {marginEnd: 8}]}>Ver mais</Text>
                        <FontAwesome6 name="chevron-right" size={16} color={colors.gray} />
                    </Row>
                </TouchableOpacity>
            </Row>
            <ScrollView style={{ height: '50%' }}>
                {
                    releases.length === 0 ? (
                        <View style={{ marginTop: '10%' }}>
                            <Text style={[globalFonts.regular14Gray, { textAlign: "center" }]}>Você não possui</Text>
                            <Text style={[globalFonts.regular14Gray, { textAlign: "center" }]}>lançamentos...</Text>
                        </View>
                    ) : releases.slice(0, 4).map((item, index) => (
                        <View style={index === 0 ? { marginTop: 10 } : {}} key={index}>
                            <ExtractItem extract={item} />
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
};
