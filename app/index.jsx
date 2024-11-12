import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'
import CustomButton from '../src/components/CustomButton';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {

  const { isLoading, isLoggedIn } = useGlobalContext()

  if (!isLoading && isLoggedIn) return <Redirect href='/home' />

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4 pt-10'>
          <Text className='text-3xl text-white'>Dora AI</Text>
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain' />
          <Text className='text-3xl  text-center text-secondary-200 relative'>Dora, <Text className='mt-3 text-3xl text-white text-center font-bold'>sınırsız bir yapay zeka okyanusu{' '}</Text>
          </Text>


          <Text className='text-sm font-pregular text-gray-100 mt-4 mb-2 text-center'>
            Yeniliğin yaratıcılıkla buluştuğu o yer:
            sınırsız olasılığın olduğu bir maceraya Dora ile yelken açın!
          </Text>

          <CustomButton title={'Continue With Email'} handlePress={() => router.push('/sign-in')} containerStyles="w-full mt-2" />

        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
