import { mdiCog, mdiPlus } from '@mdi/js'
import React, { Children, ReactNode } from 'react'
import Button from '../Button'
import Icon from '../Icon'
import IconRounded from '../Icon/Rounded'

type Props = {
  icon: string
  title: string
  main?: boolean
  children?: ReactNode,
  cliclkFun: any
}

export default function AddTableTitle({ icon,cliclkFun, title, main = false, children }: Props) {
  const hasChildren = !!Children.count(children)

  return (
    <section className={`${main ? '' : 'pt-6'} mb-6 flex items-center justify-between`}>
      <div className="flex items-center justify-start">
        {icon && main && <IconRounded icon={icon} color="light" className="mr-3" bg />}
        {icon && !main && <Icon path={icon} className="mr-2" size="20" />}
        <h1 className={`leading-tight ${main ? 'text-3xl' : 'text-2xl'}`}>{title}</h1>
      </div>
      {children}
      {!hasChildren && <Button onClick={cliclkFun} icon={mdiPlus} label='ADD TABLE' color="whiteDark" />}
    </section>
  )
}
