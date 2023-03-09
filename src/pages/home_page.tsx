import { useEthers } from '@usedapp/core';
import { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Header, ParticipationList, RegistrationForm, Statistics, Title, UserInfo } from "../components"
import { LocalStorage } from '../local-storage';
import { User, UserWithWallet } from '../types';

export const HomePage = () => {
    const {account} = useEthers()
    const [registeredUser, setRegisteredUser] = useState<User | null>(LocalStorage.getRegisteredUser())
    const [newParticipant, setNewParticipant] = useState<UserWithWallet | null>(LocalStorage.getParticipantUser())

    const handleOnClick = () => {
        const participant = {
            name: registeredUser!.name,
            email: registeredUser!.email,
            wallet: account!,
        }

        setNewParticipant(participant)
        LocalStorage.setParticipantUser(participant)
    }

    return (
        <div className="container mx-auto pb-20">
            <div className="flex pt-40 mb-10">
                <div className="flex-1">
                    <Title />
                </div>
                <Statistics />
            </div>
            <div className='flex justify-between'>
                <div style={{width: 420}}>
                    <h2 className="text-orange-600 text-3xl pb-5">BETA TEST REGISTRATION</h2>
                    <div className="mb-10">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae consequuntur sequi possimus, 
                        quidem ullam fugit magni accusantium adipisci iure harum aut eum necessitatibus reiciendis expedita itaque? 
                        Totam ex tempora corporis consectetur, maxime inventore mollitia ipsa laboriosam.
                    </div>
                    {
                        account && registeredUser 
                            ? <UserInfo user={registeredUser} onBtnClick={handleOnClick} disabled={!!newParticipant} />
                            : <RegistrationForm onRegistered={setRegisteredUser} />
                    }
                    {!account && <h4 className='text-sm mt-2'>YOU NEED TO CONNECT WALLET BEFORE REGISTRATION</h4>}
                </div>
                {account && registeredUser && (
                    <div>
                        <h2 className='text-3xl pb-5'>PARTICIPATION LISTING(ENABLE ONLY FOR PARTICIPANTS)</h2>
                        <ParticipationList newParticipant={newParticipant} onDeleteParticipant={() => setNewParticipant(null)} />
                    </div>
                )}
            </div>
        </div>
    )
}