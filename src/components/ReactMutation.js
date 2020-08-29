import React from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'

const updateAsyncPost = async () => {
    const data = await axios('https://jsonplaceholder.typicode.com/posts', {
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    return data
}

const ReactMutation = () => {

    const [mutate, info] = useMutation(updateAsyncPost)

    const updatePost = async () => {
        await mutate()
    }

    // eslint-disable-next-line no-undef
    console.log({info})

    return (
        <div onClick = { updatePost }>
            Click to create a Post - using JSON-PlaceHolder
        </div>
    )
}

export default ReactMutation
