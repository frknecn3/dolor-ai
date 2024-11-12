import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false)


    return (
        <View className='space-y-2 items-start my-4'>
            <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

            <View className='w-full h-16 px-4 py-4 bg-black-100 rounded-2xl focus:border focus:border-secondary-100 items-center flex-row'>
                <TextInput className='flex-1 text-white  w-full font-psemibold text-base ' value={value} placeholder={placeholder} placeholderTextColor={'#7b7b8b'} onChangeText={handleChangeText}
                    secureTextEntry={title === 'Şifre' && !showPassword} />
                {
                    title === 'Şifre' && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
                        </TouchableOpacity>
                    )
                }
            </View>


        </View>
    )
}

export default FormField