import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../src/components/FormField'
import CustomButton from '../../src/components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {

  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields.')
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password)

      // global state'e tut

      const result = await getCurrentUser()


      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-4">
          <View className='flex-row items-center my-2'>
            <Image source={images.logoSmall} className='h-[40px] w-[40px]' resizeMode='contain' />
            <Text className='text-white text-4xl'>Dora</Text>
          </View>

          <FormField title='E-posta' value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} otherStyles='mt-7' keyboardType='email-address' />
          <FormField title='Şifre' value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} otherStyles='mt-7' keyboardType='email-address' />

          <CustomButton title={'Giriş Yap'} handlePress={submit} containerStyles={'mt-7'} isLoading={isSubmitting} />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className="text-lg text-gray-100 font-pregular">
              Hesabınız yok mu?
            </Text>
            <Link href='/sign-up' className='text-lg font-psemibold text-secondary-100'>Kayıt Olun</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn