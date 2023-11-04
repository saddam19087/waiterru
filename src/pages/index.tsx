import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import CardBox from '../components/CardBox'
import LayoutGuest from '../layouts/Guest'
import SectionMain from '../components/Section/Main'
import { gradientBgPurplePink } from '../colors'
import { appTitle } from '../config'
import { useAppDispatch } from '../stores/hooks'
import { setDarkMode } from '../stores/darkModeSlice'

const StyleSelectPage = () => {
  const dispatch = useAppDispatch()

  dispatch(setDarkMode(false))

  const styles = ['white', 'basic']

  const router = useRouter()

  const handleStylePick = (e: React.MouseEvent, style: string) => {
    e.preventDefault()

    document.documentElement.classList.forEach((token) => {
      if (token.indexOf('style') === 0) {
        document.documentElement.classList.replace(token, `style-${style}`)
      }
    })

    router.push('/dashboard')
  }

  useEffect(() => {
    const style = 'basic';
    document.documentElement.classList.forEach((token) => {
      if (token.indexOf('style') === 0) {
        document.documentElement.classList.replace(token, `style-${style}`)
      }
    })

    router.push('/dashboard')
  }, [])

  return (
    <>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <div className={`flex min-h-screen items-center justify-center ${gradientBgPurplePink}`}>
       <p>Loading...</p>
      </div>
    </>
  )
}

StyleSelectPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default StyleSelectPage
