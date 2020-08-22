import React, { useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useTable, usePagination } from 'react-table'

import './ReactTable.css'

const fetchPeople = async (key, pageIndex) => {
    let peopleList = await axios.get(
        `https://swapi.dev/api/people/?page=${pageIndex + 1}`,
    )
    return peopleList
}

const PeopleTable = ({ columns }) => {
    const [pageIndex, setPageIndex] = useState(0)
    const { data: peopleList, isLoading } = useQuery(
        ['fetchPeople', pageIndex],
        fetchPeople,
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        pageOptions,
    } = useTable(
        {
            columns,
            data: peopleList ? peopleList.data.results : [],
            manualPagination: true,
            pageCount: peopleList ? peopleList.data.count : 0,
        },
        usePagination,
    )

    const previousPagePossible = () => {
        if(pageIndex === 0) return true
        return false
    }

    const nextPagePossible = () => {
        if(pageIndex === pageOptions.length) return true
        return false
    }

    return (
        <div className = 'people-table'>
            <table { ...getTableProps() }>
                <thead>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr
                            { ...headerGroup.getHeaderGroupProps() }
                            key = { headerIndex }
                        >
                            {headerGroup.headers.map((column, columnIndex) => {
                                return (
                                    <th
                                        key = { columnIndex }
                                        { ...column.getHeaderProps() }
                                    >
                                        {column.render('Header')}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody { ...getTableBodyProps() }>
                    {!isLoading &&
                        page.map((row, rowIndex) => {
                            prepareRow(row)
                            return (
                                <tr { ...row.getRowProps() } key = { rowIndex }>
                                    {row.cells.map((cell, cellIndex) => {
                                        return (
                                            <td key = { cellIndex }>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {!isLoading && (
                <div className = 'pagination'>
                    <button
                        disabled = { previousPagePossible() }
                        onClick = { () => setPageIndex(i => i - 1) }
                    >
                        {'<'}
                    </button>{' '}
                    <button  
                        disabled = { nextPagePossible() }
                        onClick = { () => setPageIndex(i => i + 1) }
                    >
                        {'>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                </div>
            )}
            {isLoading && <Skeleton
                count = { 10 } height = { 50 }
                width = { '100%' }
                          />}
        </div>
    )
}

const ReactTable = () => {
    let columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Gender',
                accessor: 'gender',
            },
            {
                Header: 'Height',
                accessor: 'height',
            },
            {
                Header: 'Mass',
                accessor: 'mass',
            },
            {
                Header: 'Hair Color',
                accessor: 'hair_color',
            },
            {
                Header: 'Skin Color',
                accessor: 'skin_color',
            },
            {
                Header: 'Eye Color',
                accessor: 'eye_color',
            },
        ],
        [],
    )

    return <PeopleTable columns = { columns } />
}

export default ReactTable
