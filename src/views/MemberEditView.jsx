//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { Utils } from '../utils';

export function MemberEditView() {
    let abortController = new AbortController();

    const {id} = Utils.Auth.getUser();

    const useMember = Hooks.useMember();

    const [members, setMembers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useMember.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useMember.updateProfile(abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useMember.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useMember.setIsDisabled(true);

        try {
            await useMember.getProfile(id, abortController.signal);
            
            // const { members } = await Services.MemberService
			// .getAll(abortController.signal);
			// setMembers(members);
			
        } catch (error) {
            console.log(error);
        } finally{
            useMember.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier mes informations</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.MemberForm useMember={useMember}
            members={members} setMembers={setMembers}
			isDisabled={useMember.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
