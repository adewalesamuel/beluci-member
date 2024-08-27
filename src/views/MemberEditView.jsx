//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Hooks } from '../hooks';
import { Utils } from '../utils';
import placeholderImg from '../assets/img/400x400/img2.jpg';
import { AiOutlineDownload } from 'react-icons/ai';
import { Components } from '../components';

export function MemberEditView() {
    let abortController = new AbortController();
    const {__} = Utils.String;

    const {id} = Utils.Auth.getUser();

    const useMember = Hooks.useMember();

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
            <h3>Mon profil</h3>
            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.MemberForm useMember={useMember} 
            isDisabled={useMember.isDisabled} 
            handleFormSubmit={handleFormSubmit} />
        </>
    )
}
