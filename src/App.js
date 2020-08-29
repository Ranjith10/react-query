import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ReactQueryConfigProvider } from 'react-query'

import ReactTable from './components/ReactTable'
import ReactMutation from './components/ReactMutation'
 
 const queryConfig = {
   shared: {
     suspense: false,
   },
   queries: {
     enabled: true,
     retry: 1,
     retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
     staleTime: 0,
     cacheTime: 5 * 60 * 1000,
     refetchOnWindowFocus: true,
     refetchInterval: false,
     refetchOnMount: true,
     useErrorBoundary: false, // falls back to suspense
   },
   mutations: {
     useErrorBoundary: false, // falls back to suspense
   },
 }
 

function App() {
    return (
        <ReactQueryConfigProvider config = { queryConfig }>
            <div className = 'App'>
                <ReactTable />
                <ReactQueryDevtools />
                <ReactMutation />
            </div>
        </ReactQueryConfigProvider>
    )
}

export default App
