import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { Participiant } from '../api'

const getParticipationDetails = async (url: string): Promise<Participiant> => {    
    const response = await fetch(url)
    if (response.ok){
        return await response.json()
    }
    throw new Error('not found')
}

export const ParticipantsDetailsPage = () => {
    const {address} = useParams<{address: string}>()
    const {data, error, isLoading} = useSWR(
        `https://new-backend.unistory.app/api/data/address/${address}`, 
        getParticipationDetails,
        {shouldRetryOnError: false}
    )

    if (isLoading){
        return null
    }

    if (error?.message === 'not found'){
        return (
            <div className='mt-24'>
                <h1 className='text-4xl'>УЧАСТНИК С ТАКИМИ ДАННЫМИ НЕ НАЙДЕН</h1>
            </div>
        )
    }

    if (!data){
        return null
    }

    return (
        <div className='mt-24'>
            <h1 className="text-4xl mb-20">PERSONAL DATA</h1>
            <div>
                <div className='mb-10'>
                    <div className='text-3xl'>NAME</div>
                    <div className='text-orange-600 text-3xl'>{data.username}</div>
                </div>

                <div className='mb-10'>
                    <div className='text-3xl'>EMAIL</div>
                    <div className='text-orange-600 text-3xl'>{data.email}</div>
                </div>

                <div>
                    <div className='text-3xl'>WALLET</div>
                    <div className='text-orange-600 text-3xl'>{data.address}</div>
                </div>
            </div>
        </div>
    )
}