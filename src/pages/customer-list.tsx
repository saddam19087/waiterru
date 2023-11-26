import {
    mdiAccountMultiple,
    mdiCartOutline,
    mdiChartPie,
    mdiChartTimelineVariant,
    mdiEye,
    mdiFood,
    mdiGithub,
    mdiMonitorCellphone,
    mdiReload,
    mdiTrashCan,
  } from '@mdi/js'
  import Head from 'next/head'
  import React, { useState } from 'react'
  import type { ReactElement } from 'react'
  import Button from '../components/Button'
  import LayoutAuthenticated from '../layouts/Authenticated'
  import SectionMain from '../components/Section/Main'
  import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
  import CardBoxWidget from '../components/CardBox/Widget'
  import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
  import CardBoxTransaction from '../components/CardBox/Transaction'
  import { Client, Transaction } from '../interfaces'
  import CardBoxClient from '../components/CardBox/Client'
  import SectionBannerStarOnGitHub from '../components/Section/Banner/StarOnGitHub'
  import CardBox from '../components/CardBox'
  import { sampleChartData } from '../components/ChartLineSample/config'
  import ChartLineSample from '../components/ChartLineSample'
  import NotificationBar from '../components/NotificationBar'
  
  import { getPageTitle } from '../config'
import CardBoxModal from '../components/CardBox/AddMenuModal'
import MenuTable from '../components/Table/MenuTable'
import Buttons from '../components/Buttons'
import CustomerTable from '../components/Table/CustomerTable'
  
  const CustomerList = () => {
    const [isModalInfoActive, setIsModalInfoActive] = useState(false)

   
    const handleModalAction = () => {
        setIsModalInfoActive(false)
        
      }
  
   
  
   
  
    return (
      <>

<CardBoxModal
        title="Add Menu"
        buttonColor=""
        buttonLabel=""
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >


      
      </CardBoxModal>
        <Head>
          <title>{getPageTitle('Dashboard')}</title>
        </Head>
        <SectionMain>
        
          <CardBox hasTable>
            <CustomerTable />
          </CardBox>
        </SectionMain>
      </>
    )
  }
  
  CustomerList.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
  }
  
  export default CustomerList
  