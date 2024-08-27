//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function GalleryListView() {
    let abortController = new AbortController();

    const { GalleryService } = Services;
    
    const {id} = useParams();
    const useEvent = Hooks.useEvent();
    const [searchParams] = useSearchParams();

    const [gallerys, setGallerys] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const init = useCallback(async () => {
        try {
            const {gallerys} = await GalleryService.getByEventId(
                id, abortController.signal);

            setGallerys(gallerys);

            await useEvent.getEvent(id, abortController.signal);
        } catch (error) {
            console.log(error);
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
            <div className='col-12 col-md-6'>
                <h4>{useEvent.name} : Gallerie</h4>
                <p>{useEvent.description}</p>
            </div>
            <Components.Loader isLoading={isLoading}>
                <section className="py-4">
                    <div className="container">
                    <ul className='list-unstyled d-flex align-items-stretch flex-wrap'>
                            {gallerys.map((gallery, index) => {
                                return (
                                    <li className="p-2 col-12 col-md-6 col-xl-4" key={index}>
                                        <div className='card shadow-md'>
                                            <div className="card-body" role="button" >
                                                <img src={gallery.img_url ?? ''} loading="lazy"
                                                className='img-fluid' alt={gallery.title} /> 
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
            </Components.Loader>
        </>
    )
}
