import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ExtractItem } from './ExtractItem';
import Row from '../Row';
import { fonts } from '@/src/styles/global';
import { FontAwesome6 } from '@expo/vector-icons';

const releases = [
    {
      id: "1244341",
      method: "Pix",
      send: 1,
      name: "Victor Ashino",
      amount: 415641,
      created: ""
    },
    {
      id: "1244341",
      method: "Pix",
      send: 0,
      name: "Victor Ashino",
      amount: 614641,
      created: ""
    },
    {
      id: "1244341",
      method: "Pix",
      send: 0,
      name: "Victor Ashino",
      amount: 614641,
      created: ""
    },
    {
      id: "1244341",
      method: "Pix",
      send: 0,
      name: "Victor Ashino",
      amount: 614641,
      created: ""
    },
    {
      id: "1244341",
      method: "Pix",
      send: 0,
      name: "Victor Ashino",
      amount: 614641,
      created: ""
    },
    {
      id: "1244341",
      method: "Pix",
      send: 0,
      name: "Victor Ashino",
      amount: 614641,
      created: ""
    }
  ];

  interface ReleasesProps {
    releases: []
  }

export default function LastReleases({ releases }: ReleasesProps) {
    return (
        <View>
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
            {releases.slice(0, 4).map((item, index) => (
                <React.Fragment key={index}>
                <ExtractItem extract={item} />
                </React.Fragment>
            ))}
        </View>
    );
};
