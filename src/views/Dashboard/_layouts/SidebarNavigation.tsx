import { SquaresFour, AddressBook, Folders, Wrench } from 'phosphor-react'
import React from 'react'
import { Divider, Tooltip } from 'react-daisyui'
import { NavLink } from 'react-router-dom'

const navigations = [
  {
    to: '/dashboard',
    text: 'Home',
    icon: <SquaresFour weight="fill" />,
  },
  {
    to: '/members',
    text: 'Member',
    icon: <AddressBook weight="fill" />,
  },
]

const SidebarNavigation = () => {
  return (
    <>
      {navigations.map((navigation) => (
        <Tooltip key={navigation.to} message={navigation.text} className="tooltip-right">
          <NavLink to={navigation.to} className="btn btn-ghost btn-square">
            {React.createElement(navigation.icon.type, { ...navigation.icon.props, size: 24 })}
          </NavLink>
        </Tooltip>
      ))}
      <Divider vertical />
      <NavLink to="#" className="btn btn-ghost btn-square">
        <Folders weight="fill" size={24} />
      </NavLink>
      <NavLink to="#" className="btn btn-ghost btn-square">
        <Wrench weight="fill" size={24} />
      </NavLink>
    </>
  )
}

export default SidebarNavigation
