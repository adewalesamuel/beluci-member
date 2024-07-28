//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Components } from '../components';
import { Services } from '../services';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';
import { Utils } from '../utils';

export function ForumCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();
    const errorHandler = useError();

    const useForum = Hooks.useForum();

    const [members, setMembers] = useState([]);
	const [forum_categorys, setForum_categorys] = useState([]);
	

    const handleFormSubmit = async e => {
        e.preventDefault();
        useForum.setIsDisabled(true);
        errorHandler.setErrorMessages([]);
        
        try {
            await useForum.createForum(abortController.signal);

            navigate('/forums');
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useForum.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useForum.setIsDisabled(true);
        useForum.setMember_id(Utils.Auth.getUser().id);

        try {
			const { forum_categorys } = await Services.ForumCategoryService
			.getAll(abortController.signal);
			setForum_categorys(forum_categorys);
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useForum.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Forum</h3>

            <Components.ErrorMessages>
                {errorHandler.errorMessages}
            </Components.ErrorMessages>
            <Components.ForumForm useForum={useForum}
			forum_categorys={forum_categorys} setForum_categorys={setForum_categorys}
			isDisabled={useForum.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
