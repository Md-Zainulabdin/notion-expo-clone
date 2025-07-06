import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => signOut(),
        },
      ]
    )
  }

  return (
    <View className="flex-row items-center justify-between p-4 bg-gray-50 rounded-lg">
      <View className="flex-1">
        <Text className="text-lg font-semibold">
          {user?.fullName || user?.firstName || 'User'}
        </Text>
        <Text className="text-gray-600">
          {user?.primaryEmailAddress?.emailAddress || 'No email'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        className="bg-red-500 px-4 py-2 rounded-lg"
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile