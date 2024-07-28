//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';
import { AiFillPlusCircle } from 'react-icons/ai';

export function ForumCategoryListView() {
    let abortController = new AbortController();

    const { ForumService } = Services;
    
    const [searchParams] = useSearchParams();
    const errorHandler = useError();

    const [forums, setForums] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true)

    const init = useCallback(async () => {
        try {
            const {forums} = await ForumService.getAll(
                {page: ''}, abortController.signal);

            setForums(forums);
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init]);

    useEffect(() => {
        if (!searchParams.get('page')) return;

        setPage(searchParams.get('page'));
    }, [searchParams.get('page')]);

    return (
        <>
            <Components.Loader isLoading={isLoading}>
                <div className="tab-content w-full w-100" id="profileTeamsTabContent">
                    <div className="tab-pane fade show active" id="grid">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                            <div className='w-100 mb-4'>
                                <Link className="btn btn-primary float-end" to="/forums/create">
                                    <AiFillPlusCircle size={20} className='me-2'/> Créer un forum
                                </Link>
                            </div>
                            {forums.map((forum, index) => {
                                return (
                                    <div className="col mb-3 mb-lg-5" key={index}>
                                        <div className="card h-100">
                                            <div className="card-body pb-0">
                                                <div className="row align-items-center mb-2">
                                                    <div className="col-9">
                                                        <h4 className="mb-1">
                                                            <Link to={`${forum.id}/messages`}>{forum.name}</Link>
                                                        </h4>
                                                    </div>
                                                </div>
                                                <p>{forum.description}</p>
                                            </div>
                                            <div className="card-footer border-0 pt-0">
                                                <div className="list-group list-group-flush list-group-no-gutters">
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col">
                                                                <span className="card-subtitle">Catégorie:</span>
                                                            </div>
                                                            <div className="col-auto">
                                                                <span className="badge bg-soft-primary text-primary p-2">
                                                                    {forum?.forum_category?.name ?? "--"}
                                                                </span>
                                                            </div>    
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col">
                                                                <span className="card-subtitle">Messges:</span>
                                                            </div>
                                                            <div className="col-auto">---</div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col">
                                                                <span className="card-subtitle">Membres actifs:</span>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="avatar-group avatar-group-xs avatar-circle">
                                                                    <span className="avatar avatar-soft-dark">
                                                                        <span className="avatar-initials">A</span>
                                                                    </span>
                                                                    <span className="avatar avatar-soft-info">
                                                                        <span className="avatar-initials">S</span>
                                                                    </span>
                                                                    <span className="avatar">
                                                                    </span>
                                                                    <span className="avatar avatar-light avatar-circle">
                                                                        <span className="avatar-initials">+3</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Components.Loader>
        </>
    )
}
