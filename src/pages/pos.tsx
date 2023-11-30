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
  const [selectedItems, setSelectedItems] = useState([])
  const [tax,setTax] = useState(0);
  const [discount,setDiscount] = useState(0)

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

  const getItems = () => {
    const items = localStorage.getItem('items')
    if (items) setSelectedItems(JSON.parse(items))
  }

  useEffect(() => {
    getMenus()
  }, [])

  // useEffect(()=>{
  //   Window.
  // },[Window])

  // useEffect(() => {
  //   console.log(selectedItems)

  //   localStorage.setItem('items', JSON.stringify(selectedItems))
  // }, [selectedItems])

  // Function to check if array of objects contains a particular key-value pair
  function containsKeyValue(arr, key, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] === value) {
        return true
      }
    }
    return false
  }

  const onClick = (item) => {
    const keyToCheck = 'name'
    const valueToCheck = item.name
    item.quantity = 1
    if (containsKeyValue(selectedItems, keyToCheck, valueToCheck)) {
      incrementByName(item.name)
      return;
    }
    setSelectedItems((prev) => [...prev, item])
  }

  const increment = (index, newQuantity) => {
    setSelectedItems((prev) => {
      return prev.map((item, i) => {
        if (i == index) {
          return { ...item, quantity: newQuantity }
        } else {
          return item
        }
      })
    })
  }

  const incrementByName = (name) => {
    setSelectedItems((prev) => {
      return prev.map((item, i) => {
        if (item.name == name) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          console.log('else')
          return item
        }
      })
    })
  }

  const decrement = (index, newQuantity) => {
    if (newQuantity < 1) {
      return
    }
    setSelectedItems((prev) => {
      return prev.map((item, i) => {
        if (i == index) {
          return { ...item, quantity: newQuantity }
        } else {
          return item
        }
      })
    })
  }

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
                  <OrderItemCard item={item} onClick={onClick} />
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 p-2 md:mb-0">
              <div className="flex flex-wrap -mx-3 mb-6 shadow-xl">
                <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                  <span>New Order - #4589</span>
                </div>

                <div className="w-full md:w-1/1 px-3 mb-6 p-2 md:mb-0">
                  {selectedItems.map((item, index) => {
                    return (
                      <div className="flex flex-wrap -mx-3 mb-1 items-center">
                        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                          <span>{item?.name}</span>
                        </div>

                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              onClick={() => decrement(index, item.quantity - 1)}
                              data-action="decrement"
                              className="  text-gray-600   w-20 rounded-l cursor-pointer outline-none"
                            >
                              <span className="m-auto text-2xl font-thin">−</span>
                            </button>
                            <input
                              type="number"
                              className="text-center w-full border-none  font-semibold text-md   md:text-basecursor-default flex items-center text-gray-700  outline-none"
                              name="custom-input-number"
                              value={item.quantity}
                            ></input>
                            <button
                              onClick={() => increment(index, item.quantity + 1)}
                              data-action="increment"
                              className=" text-gray-600   w-20 rounded-r cursor-pointer"
                            >
                              <span className="m-auto text-2xl font-thin">+</span>
                            </button>
                          </div>
                        </div>

                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">${item?.mrp}</div>
                      </div>
                    )
                  })}

                  {/* <div className="flex flex-wrap -mx-3  mb-1">
                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                      <span>Chicken Sandwich</span>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">1</div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">$100</div>
                  </div> */}

                  <div className="flex flex-wrap -mx-3 mt-4 bg-neutral-200  mb-1">
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">Items</div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">QTY</div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">Tax</div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">Discount</div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">Sub Total</div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-1   mb-1">
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">
                      {
                        selectedItems.length
                      }
                    </div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">
                    {selectedItems.reduce((total, item) => total + item.quantity, 0)}
                    </div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">11</div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">11</div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">
                      
                        {selectedItems.reduce((total, item) => total + item.quantity * item.mrp, 0)}
                      
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-1   mb-1">
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0"></div>
                    <div className="w-full text-end md:w-2/4 px-3 text-sm mb-6 md:mb-0">
                      Service Charge
                    </div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">200</div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-1   mb-1">
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0"></div>
                    <div className="w-full text-end md:w-2/4 px-3 text-sm mb-6 md:mb-0">
                      Grand Total
                    </div>
                    <div className="w-full md:w-1/5 px-3 text-sm mb-6 md:mb-0">200</div>
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
