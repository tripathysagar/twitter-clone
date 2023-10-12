"use server"

import { cookies } from 'next/headers'

import {Form } from './form';
 
export default async function Page() {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  
  return <Form />
}   