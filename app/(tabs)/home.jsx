import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../src/components/SearchInput'
import Trending from '../../src/components/Trending'
import EmptyState from '../../src/components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../src/components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {

  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)
  const {user,setUser,setIsLoggedIn} = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false)


  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false)
  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() =>
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>Seni görmek güzel</Text>
                <Text className='text-white text-2xl font-psemibold'>
                  {user?.username}
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 mb-3 font-pregular'>En Son Yüklenenler</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>}

        ListEmptyComponent={() => (
          <EmptyState title='Video bulunamadı.' subtitle='İlk Videoyu Yüklemeye Ne Dersin?' />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home