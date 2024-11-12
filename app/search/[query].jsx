import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../src/components/SearchInput'
import Trending from '../../src/components/Trending'
import EmptyState from '../../src/components/EmptyState'
import { getAllPosts, getLatestPosts, searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../src/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {

  const {query} = useLocalSearchParams()

  const { data: posts, refetch } = useAppwrite(()=>searchPosts(query))
  const { data: latestPosts } = useAppwrite(getLatestPosts)

  console.log(query,posts)

  useEffect(() => {
    refetch()
  
  }, [query])
  


  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() =>
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>Arama Sonuçları:</Text>
            <Text className='text-white text-2xl font-psemibold'>
              {query}
            </Text>
            <SearchInput initialQuery={query} />
          </View>
          }

        ListEmptyComponent={() => (
          <EmptyState title='Video bulunamadı.' subtitle='Bu arama ile eşleşen hiçbir sonuç bulunamadı.' />
        )}
      />
    </SafeAreaView>
  )
}

export default Search