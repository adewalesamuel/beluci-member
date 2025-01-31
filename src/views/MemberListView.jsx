//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components'
import placeholderImg from '../assets/img/400x400/img2.jpg';
import { BsSearch } from 'react-icons/bs';

export function MemberListView() {
    let abortController = new AbortController();

    const { MemberService } = Services;

    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();

    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');

    const handleSearchSubmit = e => {
        e.preventDefault();
        navigate(`?page=1&query=${search}`);
    }
    const init = useCallback(async () => {
        setIsLoading(true);
        
        try {
            const {members} = await MemberService.getAll(
                {page: page, query: query}, abortController.signal);
            const memeberData = members.data.map(member => {
                member['company_name'] = (<Link to={`/members/${member.id}`}>
                    {member.company_name}</Link>);

                return member;
            })

            setMembers(memeberData);
            setPageLength(members.last_page);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [page, query]);

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
    
    useEffect(() => {
        setQuery(searchParams.get('query'));
    }, [searchParams.get('query')]);

    return (
        <>
            <div className='row justify-content-end'>
                <div className='col-12 col-md-4'>
                    <form onSubmit={handleSearchSubmit}>
                        <div className="input-group my-3">
                            <input type="search" className="form-control" value={search} 
                            placeholder="Rechercher un membre" onChange={e => setSearch(e.target.value)}/>
                            <button className="btn btn-info" type="submit" id="button-addon2" 
                            onClick={handleSearchSubmit}>
                                <BsSearch />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <section>
                <div className='container'>
                    <Components.Loader isLoading={isLoading}>
                        <ul className='mt-4 list-unstyled row align-items-stretch'>
                            {members.map((member, index) => {
                                return (
                                    <li key={index} className='col-12 p-2'>
                                        <div className='card d-flex- flex-row flex-wrap align-items-start h-100
                                        position-relative'>
                                            <div className='col-4 px-0'>
                                                <img src={member.logo_url} className='img-fluid' 
                                                onError={e => e.currentTarget.src=placeholderImg}/>
                                            </div>
                                            <div className='card-body col-8'>
                                                <h5>{member.company_name}</h5>
                                                <div className='d-flex flex-column align-items-start text-break'>
                                                    <span className='text-sector'>{member.sector}</span>
                                                    <address className='mb-0'>{member.address}</address>
                                                    <span>{member.email}</span>
                                                    <span>{member.representative_fullname}</span>
                                                    <strong className='text-primary'>{member.phone_number}</strong>
                                                    <span>{member.other_details}</span>
                                                    <a className='btn btn-link' href={member?.website_url?.
                                                    replace('www.', 'https://') ?? ''} target='_blank'>
                                                        {member.website_url}
                                                    </a>
                                                </div>
                                                <Link to={`/members/${member.id}`} className='btn btn-sm btn-primary mt-4'>
                                                    en savoir plus
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
