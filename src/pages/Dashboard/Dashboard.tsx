import React, { useEffect, useState } from 'react'
import DashboardAccordion from '../../components/DashboardAccordion/DashboardAccordion'

const Dashboard: React.FC = () => {
  return (
    <div>
        {/* <h1>Dashboard</h1> */}
        {/* <button onClick={handleClick}>run</button> */}
        {/* <button onClick={handleStop}>stop</button> */}
        <DashboardAccordion title='hedwig'/>
        <DashboardAccordion title='nanobert'/>

        {/* <div style={{ whiteSpace: 'pre-wrap' }}>
            {logs}
        </div> */}
    </div>
  )
}

export default Dashboard
