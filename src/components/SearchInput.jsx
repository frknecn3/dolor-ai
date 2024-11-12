import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {

    const pathname = usePathname()
    const [query,setQuery] = useState(initialQuery||'')


    return (

        <View className='w-full h-16 px-4 py-4 bg-black-100 rounded-2xl focus:border  focus:border-secondary-100 items-center flex-row space-x-4'>
            <TextInput className='flex-1 text-white  w-full font-psemibold text-base mt-0.5'
                value={query} placeholder="Bir video arayın."
                placeholderTextColor={'#cdcde0'}
                onChangeText={(e)=>setQuery(e)} />
            <TouchableOpacity onPress={()=>{
                if(!query)
                {
                    Alert.alert('Arama kutusu boş','Lütfen aramak istediğiniz konuyu veya video adını kutuya yazın.')
                }

                if(pathname.startsWith('/search')){
                    router.setParams({query})
                }
                else{
                    router.push(`/search/${query}`)
                }
            }}>
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput