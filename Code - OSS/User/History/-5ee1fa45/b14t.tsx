import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ExtractItem } from './ExtractItem';
import Row from '../Home/Row';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import Line from '../Home/Line';

interface ReleasesProps {
  releases: [];
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
      <View style={styles.releasesContainer}>
        {releases.slice(0, 4).map((item, index) => (
          <ExtractItem key={index} extract={item}/>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  releasesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  releaseItem: {
    width: '48%', // Ajusta para caber 2 itens por linha
    marginBottom: 16,
  },
});
