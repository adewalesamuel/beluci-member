import { useParams, useSearchParams } from "react-router-dom";
import { Hooks } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import { Components } from "../components";
import { useError } from "../hooks/useError";
import { Services } from "../services";
import { Utils } from "../utils";
import placeholderImg from '../assets/img/400x400/img2.jpg';

export function MessageListView() {
    const abortContrller = new AbortController();

    const {__} = Utils.String;

    const errorHandler = useError(); 
    const [searchParams] = useSearchParams();
    const useForum = Hooks.useForum();
    const useMessage = Hooks.useMessage();
    const {id} = useParams();

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleMessageSubmit = async e => {
        e.preventDefault();
        useMessage.setIsDisabled(true);

        try {
            const {message} = await useMessage.createMessage(abortContrller.signal);
            message['member'] = Utils.Auth.getUser();
            const messagesCopy = [...messages];
            console.log(messagesCopy);

            messagesCopy.unshift(message);

            setMessages(messagesCopy);
            useMessage.setContent('');
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            useMessage.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        try {
            if (!useForum.id || useForum.id == '')
                await useForum.getForum(id, abortContrller.signal);

            const {messages} = await Services.MessageService.getByForumId(
                id, {page:page}, abortContrller.signal);

            setMessages([...messages.data]);
            setPageLength(messages.last_page);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page])

    useEffect(() => {
        useMessage.setForum_id(id);

        init()
    },[init]);

    useEffect(() => {
        if (!searchParams.get('page')) return;

        setPage(searchParams.get('page'));
    }, [searchParams.get('page')]);
    return (
        <>
            <Components.Loader isLoading={isLoading}>
                <h3>Forum: {useForum.name}</h3>
                <p>{useForum.description}</p>
                <h4>Messages</h4>
                <div className="row">
                    <div className="mt-3 col-12 col-md-8">
                        {messages.map((message, index) => {
                            return (
                                <div className="card mb-3" key={index}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4 border-r-2 border-dark text-center">
                                                <img src={message?.member?.logo_url} alt="" width={50} height={50} 
                                                className="rounded-pill object-fit-cover bg-default" 
                                                onError={e => e.currentTarget.src=placeholderImg}/>
                                                <div className="mt-2">
                                                    <small className="fw-bold mb-1 d-block">
                                                        {message?.member?.fullname}
                                                    </small>
                                                    <small className="fw-bold mb-1 d-block bg-soft-info text-info badge">
                                                        {message?.member?.company_name}
                                                    </small>
                                                    <small className="fw-bold mb-1 d-block bg-soft-danger text-danger badge">
                                                        {message?.member?.position}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <small className="d-block float-end text-muted font-monospace">
                                                    Envoyé le: {new Date(message.created_at).toLocaleString('fr')}
                                                </small>
                                                <p className="p-4">
                                                    {message.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
                    </div>
                    <div className="mt-3 col-12 col-md-4">
                        <form onSubmit={handleMessageSubmit}>
                            <Components.ErrorMessages>
                                {errorHandler.errorMessages}
                            </Components.ErrorMessages>
                            <h2>Votre message</h2>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <label htmlFor='content'>{__('content')}</label>
                                    <textarea className='form-control' type='text' id='content' name='content' 
                                    placeholder={__('content')} value={useMessage.content ?? ''}
                                    disabled={useMessage.isDisabled} onChange={ e => 
                                        useMessage.setContent(e.target.value) ?? null} rows={5}></textarea>
                                </div>
                            </div>
                            <div className='col-12 text-right'>
                                <button disabled={useMessage.isDisabled ?? false} type='submit' 
                                    className='mt-3 btn btn-primary'>
                                    {useMessage.isDisabled ? 'Chargement...' :  'Envoyer le message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Components.Loader>
        </>
    )
}