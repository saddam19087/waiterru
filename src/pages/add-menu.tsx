import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiEye,
  mdiFood,
  mdiGithub,
  mdiMonitorCellphone,
  mdiPlus,
  mdiReload,
  mdiTrashCan,
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
import { app } from '../firebase.config'

import { getPageTitle } from '../config'
import CardBoxModal from '../components/CardBox/AddMenuModal'
import MenuTable from '../components/Table/MenuTable'
import Buttons from '../components/Buttons'
import { get, getDatabase, ref, set } from 'firebase/database'

const AddMenu = () => {
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [itemMrp, setItemMrp] = useState('')
  const [addOns, setAddOns] = useState([
    {
      name: '',
      description: '',
      mrp: '',
    },
  ])
  const [editMenuData, setEditMenuData] = useState()

  const handleModalAction = () => {
    setIsModalInfoActive(false)
  }

  const handleFormChange = (index, event) => {
    let data = [...addOns]
    data[index][event.target.name] = event.target.value
    // console.log(data);

    setAddOns(data)
  }

  const addFields = () => {
    let newfield = {
      name: '',
      description: '',
      mrp: '',
    }
    setAddOns([...addOns, newfield])
  }

  const removeFields = (index) => {
    console.log(addOns)

    console.log(index)

    let data = [...addOns]
    data.splice(index, 1)
    setAddOns(data)
  }

  const submit = async (e) => {
    e.preventDefault()
    const data = {
      name: itemName,
      description: itemDesc,
      mrp: itemMrp,
      status: 'active',
      addOns,
    }
    const HotelId = '123456789'
    const database = getDatabase(app)
    const dataRef = ref(database, `/hotels/${HotelId}/menus`)
    const snapshot = await get(dataRef)
    const totalData = snapshot.val() || []
    if (editMenuData) {
      totalData[editMenuData?.index] = data
      set(dataRef, totalData)
        .then(() => {
          setIsModalInfoActive(false)
          setItemDesc('')
          setItemMrp('')
          setItemName('')
          setAddOns([
            {
              name: '',
              description: '',
              mrp: '',
            },
          ])
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      totalData.push(data)
      set(dataRef, totalData)
        .then(() => {
          setIsModalInfoActive(false)
          setItemDesc('')
          setItemMrp('')
          setItemName('')
          setAddOns([
            {
              name: '',
              description: '',
              mrp: '',
            },
          ])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    if (editMenuData) {
      console.log(editMenuData)

      setIsModalInfoActive(true)
    }
  }, [editMenuData])

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
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Item Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Biryani"
              />
              <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                MRP
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                value={itemMrp}
                onChange={(e) => setItemMrp(e.target.value)}
                placeholder="200"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Discription
              </label>
              <textarea
                value={itemDesc}
                onChange={(e) => setItemDesc(e.target.value)}
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              ></textarea>
            </div>
          </div>

          <h4 className="mt-6">Add Ons</h4>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <Button color="info" icon={mdiPlus} label="ADD" small onClick={addFields} />
            </div>
          </div>
          {addOns.map((item, index) => {
            return (
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    Discription
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    MRP
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    name="mrp"
                    value={item.mrp}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <Button
                    color="info"
                    icon={mdiPlus}
                    label="Remove"
                    small
                    onClick={() => removeFields(index)}
                  />
                </div>
              </div>
            )
          })}

          <Button color="info" icon={mdiPlus} label={editMenuData?"Update Menu":"Add Menu"} small onClick={submit} />
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

        <SectionTitleLineWithButton
          cliclkFun={() => {
            setIsModalInfoActive(true)
          }}
          icon={mdiFood}
          title="Menu"
        />

        {/* <NotificationBar color="info" icon={mdiMonitorCellphone}>
            <b>Responsive table.</b> Collapses on mobile
          </NotificationBar> */}

        <CardBox hasTable>
          <MenuTable
            onEdit={(index, menu) => {
              menu.index = index
              setEditMenuData(menu)
              setItemDesc(menu.description)
              setItemMrp(menu.mrp)
              setItemName(menu.name)
              setAddOns(menu.addOns)
            }}
          />
        </CardBox>
      </SectionMain>
    </>
  )
}

AddMenu.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddMenu
