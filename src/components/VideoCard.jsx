import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../../constants'
import { ResizeMode, Video } from 'expo-av';

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {

    const [play, setPlay] = useState(false);
    const [loading, setLoading] = useState(true)



    return (
        <View className='flex-col items-center px-4 py-10 mb-14 '>
            <View className="flex-row w-full items-start justify-between ">
                <View className="justify-start items-center flex-row">
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
                        <Image source={{ uri: avatar }} className='w-full h-full rounded-lg' resizeMode='cover' />
                    </View>

                    <View className='justify-center ml-3 gap-y-1'>
                        <Text className='text-white font-psemibold text-sm' numberOfLines={1}>{title}</Text>
                        <Text className='text-gray-100 font-pregular text-xs' numberOfLines={1}>{username}</Text>
                    </View>
                </View>

                <View className='pt-2'>
                    <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
                </View>

            </View>
            {play ? <>
                <Video
                    source={{ uri: video }}
                    className={`w-full h-60 rounded-xl mt-3 ${loading ? 'hidden' : 'block'}`}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.isLoaded) {
                            setLoading(false)
                        }
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }} />

                {loading && <View className='justify-center items-center w-full h-60'><Text className='text-2xl text-white'>Loading</Text></View>}
            </> :
                <TouchableOpacity className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className='w-full h-full rounded-xl mt-3'
                        resizeMode='cover'
                    />
                    <Image source={icons.play} className='w-12 h-12 absolute contain' />
                </TouchableOpacity>}
        </View>
    )
}

export default VideoCard