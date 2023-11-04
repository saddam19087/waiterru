import {
    mdiAccountMultiple,
    mdiCartOutline,
    mdiChartPie,
    mdiChartTimelineVariant,
    mdiFood,
    mdiGithub,
    mdiMonitorCellphone,
    mdiReload,
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
  import TableSampleClients from '../components/Table/SampleClients'
  import { getPageTitle } from '../config'
import CardBoxModal from '../components/CardBox/AddMenuModal'
  
  const AddMenu = () => {
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

<form className="w-full ">
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Item Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Biryani" />
      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
       MRP
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="200" />
    </div>
  </div>


  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
       Discription
      </label>
      <textarea
      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
    ></textarea>    
      
    </div>
  </div>


  <div className="flex flex-wrap -mx-3 mb-6 mt-12">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Password
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        City
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
        State
      </label>
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
        Zip
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
    </div>
  </div>
</form>
      
      </CardBoxModal>
        <Head>
          <title>{getPageTitle('Dashboard')}</title>
        </Head>
        <SectionMain>
          
  
          
  
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col justify-between">
              {transactions.map((transaction: Transaction) => (
                <CardBoxTransaction key={transaction.id} transaction={transaction} />
              ))}
            </div>
            <div className="flex flex-col justify-between">
              {clientsListed.map((client: Client) => (
                <CardBoxClient key={client.id} client={client} />
              ))}
            </div>
          </div> */}
  
          {/* <div className="my-6">
            <SectionBannerStarOnGitHub />
          </div> */}
  
          {/* <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
            <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
          </SectionTitleLineWithButton> */}
  
          {/* <CardBox className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBox> */}
  
          <SectionTitleLineWithButton cliclkFun={()=>{
           
           setIsModalInfoActive(true)
          }} icon={mdiFood} title="Menu" />
  
          {/* <NotificationBar color="info" icon={mdiMonitorCellphone}>
            <b>Responsive table.</b> Collapses on mobile
          </NotificationBar> */}
  
          <CardBox hasTable>
            <TableSampleClients />
          </CardBox>
        </SectionMain>
      </>
    )
  }
  
  AddMenu.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
  }
  
  export default AddMenu
  