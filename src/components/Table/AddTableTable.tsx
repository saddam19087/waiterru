import { mdiEye, mdiPrinter, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import FormField from '../Form/Field'
import { Field } from 'formik'
import { get, query, set, push, onValue, ref, getDatabase } from 'firebase/database'
import { app } from '../../firebase.config'

const AddTableTable = () => {
  const { clients } = useSampleClients()
  const [data,setData] = useState();

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  // const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))
  const clientsPaginated = [
    {
      table_no: 21,
      order_no: 1,
      order_item: [
        {
          item_name: 'biryani',
          qty: 1,
          mrp: 140,
        },
        {
          item_name: 'roll',
          qty: 1,
          mrp: 100,
        },
      ],
      queue_no: 5,
      status: 'pending',
      addons: [
        {
          item_name: 'aalu',
          qty: 1,
          mrp: 10,
        },
        {
          item_name: 'chicken boti',
          qty: 1,
          mrp: 50,
        },
      ],
    },
    {
      table_no: 21,
      order_no: 1,
      order_item: [
        {
          item_name: 'biryani',
          qty: 1,
          mrp: 140,
        },
        {
          item_name: 'roll',
          qty: 1,
          mrp: 100,
        },
      ],
      queue_no: 5,
      status: 'pending',
      addons: [
        {
          item_name: 'aalu',
          qty: 1,
          mrp: 10,
        },
        {
          item_name: 'chicken boti',
          qty: 1,
          mrp: 50,
        },
      ],
    },
  ]

  const HotelId = '123456789'

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

  useEffect(() => {
    const database = getDatabase(app)
    const dataRef = ref(database, `/hotels/${HotelId}`)

    const listener = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data.tables);
    })
    return listener
  }, [])

  return (
    <>
      <CardBoxModal
        title="Order Detail"
        buttonColor=""
        buttonLabel=""
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <table>
          <thead>
            <tr>
              <th />
              <th>Item Name</th>
              <th>QTY</th>
              <th>Amount</th>

              <th />
            </tr>
          </thead>
          <tbody>
            {clientsPaginated[0].order_item.map((client) => (
              <tr key={client.item_name}>
                <td className="border-b-0 lg:w-12 before:hidden">
                  {/* <UserAvatar username={client.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> */}
                </td>
                <td data-label="Item Name">{client.item_name}</td>
                <td data-label="QTY">{client.qty}</td>
                <td data-label="MRP">{client.mrp}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Add ons</h3>
        <table>
          <thead>
            <tr>
              <th />
              <th>Item Name</th>
              <th>QTY</th>
              <th>Amount</th>

              <th />
            </tr>
          </thead>
          <tbody>
            {clientsPaginated[0].addons.map((client) => (
              <tr key={client.item_name}>
                <td className="border-b-0 lg:w-12 before:hidden">
                  {/* <UserAvatar username={client.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> */}
                </td>
                <td data-label="Item Name">{client.item_name}</td>
                <td data-label="QTY">{client.qty}</td>
                <td data-label="MRP">{client.mrp}</td>
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
            <th />
            <th>#</th>
            <th>TABLE NO</th>

            <th>QR CODE</th>
            <th>ACTION</th>

            <th />
          </tr>
        </thead>
        <tbody>
          {data?.map((table,index) => (
            <tr key={table.no}>
              <td className="border-b-0 lg:w-6 before:hidden">
                {/* <UserAvatar username={client.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> */}
              </td>
              <td data-label="Table No">{index+1}</td>
              <td data-label="Table No">{table.no}</td>
              <td data-label="Table No">{table.status ? 'generated' : 'Not generated'}</td>
              <td data-label="Table No">{table.no}</td>

              {/* <td data-label="Order No">{client.order_no}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default AddTableTable
