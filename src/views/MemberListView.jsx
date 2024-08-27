//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components'
import placeholderImg from '../assets/img/400x400/img2.jpg';

export function MemberListView() {
    let abortController = new AbortController();

    const { MemberService } = Services;
    
    const [searchParams] = useSearchParams();

    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const init = useCallback(async () => {
        try {
            const {members} = await MemberService.getAll(
                {page: page}, abortController.signal);
            const memeberData = members.data.map(member => {
                member['logo_url'] = (<img src={member.logo_url} 
                    className="rounded" width={50}/>);
                member['photo_url'] = (<img src={member.photo_url} 
                    className="rounded" width={50}/>);
                member['company_name'] = (<Link to={`/members/${member.id}`}>
                    {member.company_name}</Link>);
                member['website_url'] = (<a href={member.website_url} 
                    target="_blank">{member.website_url}</a>);

                return member;
            })

            setMembers(memeberData);
            setPageLength(members.last_page);
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
            <h4>Liste des Membres</h4>
            <section className='p-4 bg-light'>
                <div className='container my-3'>
                    <Components.Loader isLoading={isLoading}>
                        <ul className='mt-4 list-unstyled row align-items-stretch'>
                            {members.map((member, index) => {
                                return (
                                    <li key={index} className='col-12 col-md-6 p-3'>
                                        <div className='card d-flex- flex-row flex-wrap align-items-start h-100
                                        position-relative'>
                                            <div className='col-4 px-0'>
                                                <img src={member.photo_url} className='img-fluid' 
                                                onError={e => e.currentTarget.src=placeholderImg}/>
                                            </div>
                                            <div className='card-body col-8'>
                                                <h5>{member.company_name}</h5>
                                                <div className='d-flex flex-column'>
                                                    <span className='text-sector'>{member.sector}</span>
                                                    <address className='mb-0'>{member.address}</address>
                                                    <span>{member.email}</span>
                                                    <span>{member.representative_fullname}</span>
                                                    <strong className='text-primary'>{member.phone_number}</strong>
                                                    <span>{member.other_details}</span>
                                                    <span className='text-primary'>{member.website_url}</span>
                                                </div>
                                                <Link to={`/members/${member.id}`} className='btn btn-sm btn-warning mt-4'>
                                                    Voir plus
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
                    </Components.Loader>
                </div>
            </section>
        </>
    )
}
