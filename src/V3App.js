import React from 'react' 
import { QueryClient, QueryClientProvider } from 'react-query-latest'
import {ReactQueryDevtools} from 'react-query-latest/devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
        }
    }
})


function V3App() {
    return(
        <QueryClientProvider client = { queryClient }>
            <ReactQueryDevtools
                position = { 'bottom-left' }
            />
        </QueryClientProvider>
    ) 
}

 export default V3App