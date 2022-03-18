import React from 'react'
import CustomHeader from '../../components/core/CustomHeader'
import WitchItNav from '../../components/navs/WitchItNav'
import PageHeader from '../../components/styles/PageHeader'

const WitchIt = () => {
  return (
    <>
      <CustomHeader
        title="WitchTrade | Witch It"
        description="Witch It related tools on WitchTrade."
        url="https://witchtrade.org/witchit"
      />
      <WitchItNav />
      <PageHeader title="Witch It" description="Various Witch It related things" />
    </>
  )
}

export default WitchIt
