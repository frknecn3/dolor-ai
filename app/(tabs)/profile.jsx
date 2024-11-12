import { View,FlatList, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../src/components/EmptyState'
import { getUserPosts, signOut} from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../src/components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../src/components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {

  const {user,setUser,setIsLoggedIn} = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(()=>getUserPosts(user.$id))

  const logout = async () => {
    await signOut()

    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
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
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image  source={{uri:user?.avatar}}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              /> 
            </View>

            <InfoBox 
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex-row'>
              <InfoBox 
                title={posts.length || 0}
                subtitle='Gönderiler'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />
              <InfoBox 
                title={"1.2b"}
                subtitle="Takipçiler"
                titleStyles='text-xl'
              />
            </View>
          </View>
          }

        ListEmptyComponent={() => (
          <EmptyState title='Video bulunamadı.' subtitle='Bu arama ile eşleşen hiçbir sonuç bulunamadı.' />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile