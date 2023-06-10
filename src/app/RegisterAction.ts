'use server'

export const handleRegisterFormAction = async (data: any) => {
  console.log('RegisterAction', data)

  return {
    status: 'success',
    message: 'RegisterAction',
    data,
  }
}
