import React, { FC, useMemo } from "react"
import { Link } from "react-router-dom"
import { Column, useTable } from "react-table"
import useSWRInfinite from 'swr/infinite'
import { Participiant, ParticipiantsResponse } from "../api"
import { UserWithWallet } from "../types"
import { CloseButton } from "../ui"

const getParticipationList = async (url: string): Promise<ParticipiantsResponse> => {    
    const response = await fetch(url)
    const json = await response.json()
    return json
}

type ParticipationListProps = {
    newParticipant?: UserWithWallet | null
    onDeleteParticipant: () => void
}

export const ParticipationList: FC<ParticipationListProps> = ({newParticipant = null, onDeleteParticipant}) => {
    const columns = useMemo<Column[]>(() => [
        {
            Header: 'NAME',
            accessor: 'username',
        },
        {
            Header: 'EMAIL', 
            accessor: 'email',
        },
        {
            Header: 'WALLET', 
            accessor: 'address',
        },
    ], [])

    const {data, setSize, isLoading} = useSWRInfinite((index) => {
        const page = index + 1
        return `https://new-backend.unistory.app/api/data?page=${page}&perPage=20`
    }, getParticipationList)
    
    const getList = () => {
        const list: Omit<Participiant, 'id'>[] = []
        if (newParticipant){
            list.push({
                username: newParticipant.name,
                email: newParticipant.email,
                address: newParticipant.wallet
            })
        }
        data!.forEach(item => {
            list.push(...item.items)
        })
        return list
    }
    
    const {getTableProps, headerGroups, getTableBodyProps, rows, prepareRow} = useTable({columns, data: data ? getList() : []})    

    const handleOnScroll = ({target}: any) => {
        const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
        if (bottom){
            if (isLoading){
                return
            }
            setSize(prev => prev + 1)
        }
    }

    return (
        <table {...getTableProps()} className='flex flex-col text-left'>
            <thead className="pr-5">
                {headerGroups.map((headerGroup, headerGroupIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className='flex border-b pb-2' key={headerGroupIndex}>
                            {headerGroup.headers.map((column, headerIndex) => {
                                const isFirst = headerIndex === 0
                                return (
                                    <th className={`flex grow ${isFirst ? 'basis-1/4' : 'basis-1/2'}`} key={headerIndex}>
                                        {column.render('Header')}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
            </thead>
            <tbody {...getTableBodyProps()} className="text-sm pr-5" style={{height: 510, overflowY: 'scroll'}} onScroll={handleOnScroll}>
                {rows.map((row, rowIndex) => {
                    const isNewParticipant = newParticipant && rowIndex === 0
                    prepareRow(row)

                    const element = (
                        <tr {...row.getRowProps()} className={`flex border-b py-2 pr-3 ${isNewParticipant ? 'text-orange-600' : ''} relative`} key={rowIndex}>
                            {isNewParticipant && <CloseButton className="absolute right-0 top-0 text-white" onClick={onDeleteParticipant}/>}
                            {row.cells.map((cell, cellIndex) => {
                                const isFirst = cellIndex === 0
                                return (
                                    <td {...cell.getCellProps()} className={`flex grow ${isFirst ? 'basis-1/4' : 'basis-1/2'}`} key={cellIndex}>
                                        <p className="truncate">
                                            {cell.render('Cell')}
                                        </p>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                    
                    return isNewParticipant ? element : (
                        <Link to={`/participants/${row.values.address}`} key={rowIndex}>
                            {element}
                        </Link>
                    )
                })}
            </tbody>
        </table>
    )
}