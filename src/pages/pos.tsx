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
import React, { useEffect, useState } from 'react'
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
import { app } from '../firebase.config'
import OrdersTitle from '../components/Section/OrdersTitle'
import OrderItemCard from '../components/OrderItemCard'
import { get, getDatabase, ref } from 'firebase/database'

const pos = () => {
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()

  const clientsListed = clients.slice(0, 4)

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  // console.log(app)

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [orderName, setOrderName] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [orderFrom, setOrderFrom] = useState('')
  const [orderItems, setOrders] = useState([])
  const [menus, setMenus] = useState([])

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const getMenus = async () => {
    const HotelId = '123456789'
    const database = getDatabase(app)
    const dataRef = ref(database, `/hotels/${HotelId}/menus`)
    const snapshot = await get(dataRef)
    const totalData = snapshot.val() || []
    // console.log(totalData)
    setMenus(totalData)
  }

  useEffect(() => {
    getMenus()
  }, [])

  return (
    <>
      <Head>
        <title>{getPageTitle('pos')}</title>
      </Head>
      <SectionMain>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6"></div>
        <OrdersTitle
          icon={mdiAccountMultiple}
          title="NEW ORDER"
          cliclkFun={() => setIsModalInfoActive(true)}
        />

        {/* <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar> */}

        <CardBox hasTable>
          <div className="flex flex-wrap -mx-3 mb-6 p-3">
            <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
              <div className="flex flex-wrap -mx-3 mb-6">
                {menus.map((item) => (
                  <OrderItemCard item={item} />
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 p-2 md:mb-0">
              <div className="flex flex-wrap -mx-3 mb-6 shadow-xl">
                <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                  <span>New Order - #4589</span>
                </div>

                <div className="w-full md:w-1/1 px-3 mb-6 p-2 md:mb-0">
                  <div className="flex flex-wrap -mx-3 mb-1 ">
                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                      <span>Chicken Sandwich</span>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">1</div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">$100</div>
                  </div>

                  <div className="flex flex-wrap -mx-3  mb-1">
                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                      <span>Chicken Sandwich</span>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">1</div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">$100</div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-4 bg-neutral-200  mb-1">
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">Items</div>

                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">Tax</div>
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">Discount</div>
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">Sub Total</div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-1   mb-1">
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">2</div>

                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">11</div>
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">11</div>
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">200</div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-1   mb-1">
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0"></div>
                    <div className="w-full text-end md:w-2/4 px-3 text-sm mb-6 md:mb-0">
                      Service Charge
                    </div>
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">200</div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-1   mb-1">
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0"></div>
                    <div className="w-full text-end md:w-2/4 px-3 text-sm mb-6 md:mb-0">
                      Grand Total
                    </div>
                    <div className="w-full md:w-1/4 px-3 text-sm mb-6 md:mb-0">200</div>
                  </div>
                </div>
              </div>

              <Button label="Place Order" color="info" />
            </div>
          </div>
        </CardBox>
      </SectionMain>
    </>
  )
}

pos.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default pos
