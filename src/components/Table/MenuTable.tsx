import { mdiEye, mdiPencil, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import { get, getDatabase, ref, set } from 'firebase/database'
import { app } from '../../firebase.config'

const MenuTable = ({ onEdit }) => {
  const { clients } = useSampleClients()
  const [index, setIndex] = useState()

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)
  const [menus, setMenus] = useState([
    {
      name: '',
      description: '',
      mrp: '',
      status: 'active',
      addOns: [
        {
          name: '',
          description: '',
          mrp: '',
        },
      ],
    },
  ])

  const numPages = clients.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const getMenus = async () => {
    const HotelId = '123456789'
    const database = getDatabase(app)
    const dataRef = ref(database, `/hotels/${HotelId}/menus`)
    const snapshot = await get(dataRef)
    const menus = snapshot.val() || []
    setMenus(menus)
  }

  useEffect(() => {
    getMenus()
  })

  async function changeStatus(index: number, status: boolean): Promise<void> {
    const HotelId = '123456789'
    const database = getDatabase(app)
    const dataRef = ref(database, `/hotels/${HotelId}/menus`)
    const snapshot = await get(dataRef)
    const menus = snapshot.val() || []
    menus[index].status = status ? 'active' : 'deactive'
    set(dataRef, menus)
      .then(async () => await getMenus())
      .catch((err) => console.log(err))
  }

  async function deleteMenu(index: number): Promise<void> {
    const HotelId = '123456789'
    const database = getDatabase(app)
    const dataRef = ref(database, `/hotels/${HotelId}/menus`)
    const snapshot = await get(dataRef)
    const menus = snapshot.val() || []
    menus.splice(index, 1)
    set(dataRef, menus)
      .then(async () => await getMenus())
      .catch((err) => console.log(err))
  }

  return (
    <>
      <CardBoxModal
        title="Add Ons"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Discription</th>
              <th>MRP</th>

              <th />
            </tr>
          </thead>
          <tbody>
            {menus[index]?.addOns?.map((item) => (
              <tr key={item.name}>
                <td data-label="Name">{item.name}</td>
                <td data-label="Discription">{item.description}</td>
                <td data-label="MRp">{item.mrp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <td>#</td>
            <th>Item Name</th>
            <th>Discription</th>
            <th>MRP</th>
            <th>Ads Ons</th>
            <th>Action</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {menus.map((item, index) => (
            <tr key={item.name}>
              <td data-label="ID">{index + 1}</td>
              <td data-label="Name">{item.name}</td>
              <td data-label="Discription">{item.description}</td>
              <td data-label="Mrp">{item.mrp}</td>
              <td data-label="Ads Ons">
                {item.addOns?.length > 0 ? (
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => {
                      setIndex(index)
                      setIsModalInfoActive(true)
                    }}
                    small
                  />
                ) : (
                  'no data'
                )}
              </td>
              <td data-label="Action">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="warning"
                    icon={mdiPencil}
                    onClick={() => onEdit(index, item)}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => deleteMenu(index)}
                    small
                  />
                  <label className="relative inline-flex items-center me-5 cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={item.status === 'active'}
                      onChange={(e) => changeStatus(index, e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                     {item.status}
                    </span>
                  </label>
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MenuTable
