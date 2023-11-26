import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiMonitorCellphone,
  mdiPlus,
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
import DashboardTitle from '../components/Section/DashboardTitle'
import DashboardNewOrderModal from '../components/CardBox/DashboardNewOrderModal'
import AddTableTable from '../components/Table/AddTableTable'
import AddTableTitle from '../components/Section/AddTableTitle'
import { get, getDatabase, ref, set, update } from 'firebase/database'
import { app } from '../firebase.config'

const AddTable = () => {
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()
  const [addTableInputData, setAddTableInputData] = useState('')

  const clientsListed = clients.slice(0, 4)

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const HotelId = '123456789'
  const addTable = async () => {
    const database = getDatabase(app)
    const dataRef = ref(database, `/hotels/${HotelId}/tables`)
    const snapshot = await get(dataRef)
    const totalData = snapshot.val() || [];
    // Value you want to check for
    const valueToCheck = addTableInputData // Change this to the value you're looking for

    // Use the Array.prototype.some() method to check if the value exists in any of the objects
    const valueExists = totalData?.some((obj) => obj.no === valueToCheck)

    if (valueExists) {
      alert('Value already entered')
      return
    }

    const data = {
      no: addTableInputData,
      status: false,
      qr: '',
    }

    totalData.push(data)
    // console.log(totalData);

    set(dataRef, totalData)
      .then(() => {
        setIsModalInfoActive(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <AddTableTitle
          icon={mdiAccountMultiple}
          title="Table"
          cliclkFun={() => setIsModalInfoActive(true)}
        />

        <CardBox hasTable>
          <DashboardNewOrderModal
            title="ADD TABLE"
            buttonColor=""
            buttonLabel=""
            isActive={isModalInfoActive}
            onConfirm={handleModalAction}
            onCancel={handleModalAction}
          >
            <form className="w-full ">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    TABLE
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    onChange={(e) => setAddTableInputData(e.target.value)}
                  />
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>

                <div className="w-full md:w-1/3 px-3">
                  <Button color="info" icon={mdiPlus} onClick={addTable} label="ADD" small />
                </div>
              </div>
            </form>
          </DashboardNewOrderModal>
          <AddTableTable />
        </CardBox>
      </SectionMain>
    </>
  )
}

AddTable.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddTable
