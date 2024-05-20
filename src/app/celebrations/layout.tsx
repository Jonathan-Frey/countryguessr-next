import React from 'react'
import DateSelector from '../_components/DateSelector'

export default function layout(props: { children: React.ReactNode }) {
  return (
    <>
      <DateSelector category="celebrations"></DateSelector>
      {props.children}
    </>
  )
}
