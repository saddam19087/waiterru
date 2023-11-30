import React from 'react'
import Button from './Button'
import { mdiPlus } from '@mdi/js'

function OrderItemCard({ item, onClick }) {
  const { name, mrp, description } = item

  return (
    <div className="w-full  md:w-1/4  px-2 mb-6 md:mb-0 ">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="p-2 rounded-t-lg"
            src="https://t3.ftcdn.net/jpg/01/96/80/24/360_F_196802485_VQxk0qmyPGTq56rKYXGikVGApD3A7v5T.jpg"
            alt="product image"
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5">
            <span className=" text-black-800 text-xs   py-0.2 rounded dark:bg-blue-200 dark:text-blue-800 ">
              {description}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900 dark:text-white">${mrp}</span>
            <Button icon={mdiPlus} color="info" onClick={()=>onClick(item)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItemCard
