import formatedPrice from '@/utils/formatedPrice'
import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import Row from './Row'

interface ItemProps {
  extract: {
    id: string
    method: string
    send: number
    name: string
    amount: number
    created: string
  }
}

export const ExtractItem: React.FC<ItemProps> = ({ extract }) => {
    const formatDate = (date: string) => {
      const [datePart, timePart] = date.split(' ');
      const [year, month, day] = datePart.split('-');
      return `${day}/${month}/${year}`;
    };

  const capitalizeFirstLetter = (input: string): string => {
    if (input.length === 0) {
      return input
    }
    return input.charAt(0).toUpperCase() + input.slice(1)
  }

  return (
    <Row marginTop={8} marginEnd={4} marginBottom={8} marginStart={4}>
      <Row>
        {extract.send === 0 ? (
          <Row marginEnd={6} marginBottom={14}>
            <Image
              source={require('@/assets/home/arrow-right.png')}
            />
            <Image
              source={require('@/assets/home/arrow-right.png')}
            />
          </Row>
        ) : (
          <Row marginEnd={6} marginBottom={14}>
            <Image
              source={require('@/assets/home/arrow-left.png')}
            />
            <Image
              source={require('@/assets/home/arrow-left.png')}
            />
          </Row>
        )}
        <View>
          <Text>
            {capitalizeFirstLetter(extract.method)}{' '}
            {extract.send === 0 ? 'Enviado' : 'Recebido'}
          </Text>
          <Text 
            numberOfLines={1}
            className="text-white text-sm truncate w-[150px]"
          >{extract.name}</Text>
        </View>
      </Row>
      <Row>
        <View style={{marginEnd: 8}}>
          <Text className="text-white text-sm text-right">
            {formatDate(extract.created)}
          </Text>
          <Text className="text-white text-lg font-bold">
            {extract.send === 0 && '-'} R$ {formatedPrice(String(extract.amount))}
          </Text>
        </View>
        <TouchableOpacity>
          <Image className="mt-2" source={require('@/assets/home/pdf.png')} />
        </TouchableOpacity>
      </Row>
    </Row>
  )
}
