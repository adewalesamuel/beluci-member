//'use client'
import { useCallback, useEffect } from 'react';
import { Hooks } from '../hooks';
import { Utils } from '../utils';
import placeholderImg from '../assets/img/400x400/img2.jpg';
import { AiOutlineDownload } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

export function MemberShowView() {
    let abortController = new AbortController();
    const {__} = Utils.String;

    const {id} = useParams();

    const useMember = Hooks.useMember();

    const init = useCallback(async () => {
        useMember.setIsDisabled(true);

        try {
            await useMember.getMember(id, abortController.signal);
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
            <h3>Details du membre</h3>
            <div className='row'>
                <div className='col-md-6 col-12'>
                    <div className='card mb-3'>
                        <div className='card-header bg-soft-info'>
                            <h3 className='m-0 p-0 text-info'>Informations générales</h3>
                        </div>
                        <div className='card-body'>
                            <ul className='m-0 p-0 list-unstyled'>
                                <li>
                                    <strong className='d-block'>{__('logo_url')}</strong>
                                    <img src={useMember.logo_url ?? ''} className="img-fluid rounded mb-3" 
                                    width={100} onError={e => e.currentTarget.src = placeholderImg} 
                                    style={{objectFit: 'cover'}}/>
                                </li>
                                <li>
                                    <strong>{__('company_name')}</strong>
                                    <p>{useMember.company_name}</p>
                                </li>
                                <li>
                                    <strong>{__('country_name')}</strong>
                                    <p>{useMember.country_name}</p>
                                </li>
                                <li>
                                    <strong>{__('head_office')}</strong>
                                    <p>{useMember.head_office}</p>
                                </li>
                                <li>
                                    <strong>{__('address')}</strong>
                                    <p>{useMember.address}</p>
                                </li>
                                <li>
                                    <strong>{__('website_url')}</strong>
                                    <p>{useMember.website_url}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='card mb-3'>
                        <div className='card-header bg-soft-info'>
                            <h3 className='m-0 p-0 text-info'>Informations Légales</h3>
                        </div>
                        <div className='card-body'>
                            <ul className='m-0 p-0 list-unstyled'>
                                <li>
                                    <strong>{__('creation_date')}</strong>
                                    <p>{useMember.creation_date}</p>
                                </li>
                                <li>
                                    <strong>{__('employee_number')}</strong>
                                    <p>{useMember.employee_number}</p>
                                </li>
                                <li>
                                    <strong>{__('legal_status')}</strong>
                                    <p>{useMember.legal_status}</p>
                                </li>
                                <li>
                                    <strong>{__('share_capital')}</strong>
                                    <p>{useMember.share_capital}</p>
                                </li>
                                <li>
                                    <strong>{__('sector')}</strong>
                                    <p>{useMember.sector}</p>
                                </li>
                                <li>
                                    <strong>{__('other_details')}</strong>
                                    <p>{useMember.other_details}</p>
                                </li>
                                <li>
                                    <strong>{__('company_category')}</strong>
                                    <p>{useMember.company_category}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-12'>
                    <div className='card mb-3'>
                        <div className='card-header bg-soft-info'>
                            <h3 className='m-0 p-0 text-info'>Représentant</h3>
                        </div>
                        <div className='card-body'>
                            <ul className='m-0 p-0 list-unstyled'>
                                <li>
                                    <strong>{__('fullname')}</strong>
                                    <p>{useMember.fullname}</p>
                                </li>
                                <li>
                                    <strong>{__('representative_fullname')}</strong>
                                    <p>{useMember.representative_fullname}</p>
                                </li>
                                <li>
                                    <strong>{__('position')}</strong>
                                    <p>{useMember.position}</p>
                                </li>
                                <li>
                                    <strong>{__('nationality')}</strong>
                                    <p>{useMember.nationality}</p>
                                </li>
                                <li>
                                    <strong>{__('email')}</strong>
                                    <p>{useMember.email}</p>
                                </li>
                                <li>
                                    <strong>{__('phone_number')}</strong>
                                    <p>{useMember.phone_number}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='card mb-3'>
                        <div className='card-header bg-soft-info'>
                            <h3 className='m-0 p-0 text-info'>Représentant commercial</h3>
                        </div>
                        <div className='card-body'>
                            <ul className='m-0 p-0 list-unstyled'>
                                <li>
                                    <strong>{__('sales_representative_fullname')}</strong>
                                    <p>{useMember.sales_representative_fullname}</p>
                                </li>
                                <li>
                                    <strong>{__('sales_representative_position')}</strong>
                                    <p>{useMember.sales_representative_position}</p>
                                </li>
                                <li>
                                    <strong>{__('sales_representative_email')}</strong>
                                    <p>{useMember.sales_representative_email}</p>
                                </li>
                                <li>
                                    <strong>{__('sales_representative_phone_number')}</strong>
                                    <p>{useMember.sales_representative_phone_number}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='card mb-3'>
                        <div className='card-header bg-soft-info'>
                            <h3 className='m-0 p-0 text-info'>Documents et Photos</h3>
                        </div>
                        <div className='card-body'>
                            <ul className='m-0 p-0 list-unstyled'>
                                <li>
                                    <strong>{__('cover_letter_url')}</strong>
                                    <br />
                                    <a href={useMember.cover_letter_url} target='_blank' 
                                    className='btn btn-link mb-2'>
                                        <AiOutlineDownload size={15} className='me-2'/>
                                        Télécharger
                                    </a>
                                </li>
                                <li>
                                    <strong>{__('photo_url')}</strong>
                                    <img src={useMember.photo_url ?? ''} className="img-fluid rounded mb-3 d-block" 
                                    width={100} onError={e => e.currentTarget.src = placeholderImg} 
                                    style={{objectFit: 'cover'}}/>
                                </li>
                                <li>
                                    <strong>{__('commercial_register_url')}</strong>
                                    <br />
                                    <a href={useMember.commercial_register_url} target='_blank' 
                                    className='btn btn-link mb-2'>
                                        <AiOutlineDownload size={15} className='me-2'/>
                                        Télécharger
                                    </a>
                                </li>
                                <li>
                                    <strong>{__('idcard_url')}</strong>
                                    <img src={useMember.photo_url ?? ''} className="img-fluid rounded mb-3 d-block" 
                                    width={100} onError={e => e.currentTarget.src = placeholderImg} 
                                    style={{objectFit: 'cover'}}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
