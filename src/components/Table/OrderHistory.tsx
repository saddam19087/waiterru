import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'

const TableSampleClients = () => {
  const { clients } = useSampleClients()

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
      addons:[
        {
            item_name:'aalu',
            qty:1,
            mrp:10
        },
        {
            item_name:'chicken boti',
            qty:1,
            mrp:50
        }
    ]
      
    }, {
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
        addons:[
          {
              item_name:'aalu',
              qty:1,
              mrp:10
          },
          {
              item_name:'chicken boti',
              qty:1,
              mrp:50
          }
      ]
        
      },
  ]

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
            <th>Date</th>
            <th>Order No</th>
            <th>Table No</th>
            <th>Order Item</th>
            <th>QTY</th>
           
            <th>Order Amount</th>
            <th>Name</th>
            <th>Number</th>
            <th>Status</th>
            <th>Print</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {clientsPaginated.map((client) => (
            <tr key={client.order_no}>
              <td className="border-b-0 lg:w-6 before:hidden">
                {/* <UserAvatar username={client.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> */}
              </td>
              <td data-label="Table No">{client.table_no}</td>
              <td data-label="Queue">{client.queue_no}</td>
              <td data-label="Order No">{client.order_no}</td>
              <td data-label="Order Item">{
              client.order_item.map((item)=> {
                      return <p>{item.item_name}({item.qty}ps),</p>
              })
              }</td>

              <td data-label="QTY">{client.order_item.reduce(
                  (accumulator, currentValue) => accumulator + currentValue.qty,
                  0
                )
                } </td>


             
              <td data-label="Order Amount">
                {client.order_item.reduce(
                  (accumulator, currentValue) => accumulator + currentValue.mrp,
                  0
                )
                } 
                  
              </td>
              <td data-label="Name">sadam</td>
              <td data-label="Number">6291444562</td>
              <td data-label="Status" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{client.status}</small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => setIsModalInfoActive(true)}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
                    small
                  />
                </Buttons>
              </td>
              <td data-label="print">
                <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
                    small
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableSampleClients
