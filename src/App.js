import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'

import ReactTable from './components/ReactTable'

function App() {
    return (
        <div className = 'App'>
            <ReactTable />
            <ReactQueryDevtools />
        </div>
    )
}

export default App
