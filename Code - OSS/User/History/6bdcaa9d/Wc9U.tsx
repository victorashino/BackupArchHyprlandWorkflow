import formatedPrice from '@/utils/formatedPrice'
import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

interface ItemProps {
  release: {
    method: string
    send: number
    name: string
    amount: number
    created: string
  }
}

export const Card: React.FC<ItemProps> = ({ release }) => {
  const formatDate = (date: string) => {
    const parts = date.split('-')
    const formated = `${parts[2]}/${parts[1]}/${parts[0]}`
    return formated
  }

  const capitalizeFirstLetter = (input: string): string => {
    if (input.length === 0) {
      return input
    }
    return input.charAt(0).toUpperCase() + input.slice(1)
  }

  return (
    <View className="flex-row justify-between items-center py-1 px-2">
      <View className="flex-row gap-2">
        {release.send === 0 ? (
          <View className="flex-row">
            <Image
              className="mt-2"
              source={require('@/assets/home/arrow-right.png')}
            />
            <Image
              className="mt-2"
              source={require('@/assets/home/arrow-right.png')}
            />
          </View>
        ) : (
          <View className="flex-row">
            <Image
              className="mt-2"
              source={require('@/assets/home/arrow-left.png')}
            />
            <Image
              className="mt-2"
              source={require('@/assets/home/arrow-left.png')}
            />
          </View>
        )}
        <View>
          <Text className="text-white text-lg font-bold">
            {capitalizeFirstLetter(release.method)}{' '}
            {release.send === 0 ? 'Recebido' : 'Enviado'}
          </Text>
          <Text 
            numberOfLines={1}
            className="text-white text-sm truncate w-[150px]"
          >{release.name}</Text>
        </View>
      </View>
      <View className="flex-row gap-4 justify-end">
        <View>
          <Text className="text-white text-sm text-right">
            {formatDate(release.created)}
          </Text>
          <Text className="text-white text-lg font-bold">
            {release.send === 0 && '-'} R$ {formatedPrice(String(release.amount))}
          </Text>
        </View>
        <TouchableOpacity>
          <Image className="mt-2" source={require('@/assets/home/pdf.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
