//'use client'
import { Utils } from '../../utils';
import { Components } from  "..";
import { useState } from 'react';

export function MemberForm(props) {
    const {__} = Utils.String;

    const navItems = {
        ENTREPRISE: 'entreprise',
        REPRESENTANT_1: 'representant_1',
        REPRESENTANT_2: 'representant_2',
        COMPTE: 'compte',
    }

    const [activeNav, setActiveNav] = useState('entreprise');

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12">
            <div className='row'>
                <div className='col-12'>
                    <div className='shadow-lg'>
                        <div className='form-group mb-2 p-3 bg-white'>
                            <Components.ImageFileInput img_url={props.useMember.logo_url ?? ''}
                            handleImageChange={props.useMember.setLogo_url} width={170}/>
                        </div>
                        <div className='mt-3 bg-primary text-white px-4'>
                            <nav className='d-flex align-items-center overflow-scroll'>
                                {Object.keys(navItems).map((navItem, index) => {
                                    const activeClass = "border-white border-bottom border-4";
                                    const navValue = navItems[navItem];
                                    return (
                                        <button className={`btn btn-link text-uppercase text-white font-weight-bold 
                                        mx-2 border-0 rounded-0 px-1 ${navValue === activeNav ? 
                                        activeClass : ''}`} key={index} type='button' onClick={() => setActiveNav(navValue)}>
                                            {navItem.replaceAll('_', " ")}
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className='col-12 mt-3'>
                    <div className='shadow-lg p-4 bg-white p-4 d-flex flex-wrap'>
                        {activeNav === navItems.ENTREPRISE && 
                            <>
                                <div className='col-12 px-2 mb-4'>
                                    <h2 className='text-uppercase'>Informations sur l&apos;entreprise</h2>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='company_name'>{__('company_name')}</label>
                                        <input className='form-control' type='text' id='company_name' name='company_name' 
                                        placeholder={__('company_name')} value={props.useMember.company_name ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setCompany_name(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='country_name'>{__('country_name')}</label>
                                        <input className='form-control' type='text' id='country_name' name='country_name' 
                                        placeholder={__('country_name')} value={props.useMember.country_name ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setCountry_name(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='head_office'>{__('head_office')}</label>
                                        <input className='form-control' type='text' id='head_office' name='head_office' 
                                        placeholder={__('head_office')} value={props.useMember.head_office ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setHead_office(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='address'>{__('address')}</label>
                                        <input className='form-control' type='text' id='address' name='address' 
                                        placeholder={__('address')} value={props.useMember.address ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setAddress(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='website_url'>{__('website_url')}</label>
                                        <input className="form-control" type='text' id="website_url" name="website_url" 
                                        value={props.useMember.website_url ?? ''} placeholder={__('website_url')}
                                        onChange={e => props.useMember.setWebsite_url(e.target.value)} 
                                        disabled={props.isDisabled}/>
                                    </div>
                                </div>
                            
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='creation_date'>{__('creation_date')}</label>
                                        <input className='form-control' type='date' id='creation_date' name='creation_date' 
                                        placeholder={__('creation_date')} value={props.useMember.creation_date ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setCreation_date(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='employee_number'>{__('employee_number')}</label>
                                        <input className='form-control' type='number' id='employee_number' name='employee_number' 
                                        placeholder={__('employee_number')} value={props.useMember.employee_number ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setEmployee_number(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='legal_status'>{__('legal_status')}</label>
                                        <input className='form-control' type='text' id='legal_status' name='legal_status' 
                                        placeholder={__('legal_status')} value={props.useMember.legal_status ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setLegal_status(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='share_capital'>{__('share_capital')}</label>
                                        <input className='form-control' type='number' id='share_capital' name='share_capital' 
                                        placeholder={__('share_capital')} value={props.useMember.share_capital ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setShare_capital(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='sector'>{__('sector')}</label>
                                        <input className='form-control' type='text' id='sector' name='sector' 
                                        placeholder={__('sector')} value={props.useMember.sector ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setSector(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='other_details'>{__('other_details')}</label>
                                        <textarea className='form-control' type='text' id='other_details' name='other_details' 
                                        placeholder={__('other_details')} value={props.useMember.other_details ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setOther_details(e.target.value) ?? null} rows={3}></textarea>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='company_category'>{__('company_category')}</label>
                                        <select className='form-select' id='company_category' name='company_category' 
                                        value={props.useMember.company_category ?? ''} disabled={props.isDisabled} 
                                        onChange={ e => props.useMember.setCompany_category(e.target.value) ?? null}>
                                            <option hidden>Choisissez une option</option>
                                            <option value='Société non-résidente en CI'>
                                                Société non-résidente en CI
                                            </option>
                                            <option value='Société de moins de 1 Md CFA de CA'>
                                                Société de moins de 1 Md CFA de CA
                                            </option>
                                            <option value='Société de plus de 1 Md CFA de CA'>
                                                Société de plus de 1 Md CFA de CA
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-12 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='commercial_register_url'>{__('commercial_register_url')}</label>
                                        {props.useMember.commercial_register_url && 
                                            <a href={props.useMember.commercial_register_url} 
                                            className='text-primary fw-bold ms-2'
                                            download={`Registre_${props.useMember.company_name}`}>
                                                Télécharger
                                            </a>
                                        }
                                        <Components.FileInput file_url={props.useMember.commercial_register_url ?? ''}
                                        handleFileChange={props.useMember.setCommercial_register_url}/>
                                    </div>
                                </div>
                            </>
                        }

                        {activeNav === navItems.REPRESENTANT_1 && 
                            <>
                                <div className='col-12 px-2 mb-4'>
                                    <h2 className='text-uppercase'>Informations sur le representant 1</h2>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='representative_fullname'>{__('representative_fullname')}</label>
                                        <input className='form-control' type='text' id='representative_fullname' name='representative_fullname' 
                                        placeholder={__('representative_fullname')} value={props.useMember.representative_fullname ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setRepresentative_fullname(e.target.value) ?? null}/>
                                    </div>
                                </div>
                            
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='position'>{__('position')}</label>
                                        <input className='form-control' type='text' id='position' name='position' 
                                        placeholder={__('position')} value={props.useMember.position ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setPosition(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='nationality'>{__('nationality')}</label>
                                        <input className='form-control' type='text' id='nationality' name='nationality' 
                                        placeholder={__('nationality')} value={props.useMember.nationality ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setNationality(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='phone_number'>{__('phone_number')}</label>
                                        <input className='form-control' type='text' id='phone_number' name='phone_number' 
                                        placeholder={__('phone_number')} value={props.useMember.phone_number ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setPhone_number(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='cover_letter_url'>{__('cover_letter_url')}</label>
                                        {props.useMember.cover_letter_url && 
                                            <a href={props.useMember.cover_letter_url} 
                                            className='text-primary fw-bold ms-2'
                                            download={`lm_${props.useMember.fullname}`}>
                                                Télécharger
                                            </a>
                                        }
                                        <Components.FileInput file_url={props.useMember.cover_letter_url ?? ''}
                                        handleFileChange={props.useMember.setCover_letter_url}/>
                                    </div>
                                </div>
                                <div className='col-12 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='photo_url'>{__('photo_url')}</label>
                                        <Components.ImageFileInput img_url={props.useMember.photo_url ?? ''}
                                        handleImageChange={props.useMember.setPhoto_url}/>
                                    </div>
                                </div>
                                <div className='col-12 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='idcard_url'>{__('idcard_url')}</label>
                                        <Components.ImageFileInput img_url={props.useMember.idcard_url ?? ''}
                                        handleImageChange={props.useMember.setIdcard_url}/>
                                    </div>
                                </div>
                            </>
                        }
                        {activeNav === navItems.REPRESENTANT_2 &&
                            <>
                                <div className='col-12 px-2 mb-4'>
                                    <h2 className='text-uppercase'>Informations sur le representant 2</h2>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='sales_representative_fullname'>{__('sales_representative_fullname')}</label>
                                        <input className='form-control' type='text' id='sales_representative_fullname' name='sales_representative_fullname' 
                                        placeholder={__('sales_representative_fullname')} value={props.useMember.sales_representative_fullname ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setSales_representative_fullname(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='sales_representative_position'>{__('sales_representative_position')}</label>
                                        <input className='form-control' type='text' id='sales_representative_position' name='sales_representative_position' 
                                        placeholder={__('sales_representative_position')} value={props.useMember.sales_representative_position ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setSales_representative_position(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='sales_representative_email'>{__('sales_representative_email')}</label>
                                        <input className='form-control' type='text' id='sales_representative_email' name='sales_representative_email' 
                                        placeholder={__('sales_representative_email')} value={props.useMember.sales_representative_email ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setSales_representative_email(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='sales_representative_phone_number'>{__('sales_representative_phone_number')}</label>
                                        <input className='form-control' type='text' id='sales_representative_phone_number' name='sales_representative_phone_number' 
                                        placeholder={__('sales_representative_phone_number')} value={props.useMember.sales_representative_phone_number ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setSales_representative_phone_number(e.target.value) ?? null}/>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group'>
                                        <label htmlFor='sales_representative_nationality'>{__('sales_representative_nationality')}</label>
                                        <input className='form-control' type='text' id='sales_representative_nationality' 
                                        name='sales_representative_nationality' placeholder={__('sales_representative_nationality')} 
                                        value={props.useMember.sales_representative_nationality ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setSales_representative_nationality(e.target.value) ?? null}/>
                                    </div>
                                </div>
                            </>
                        }
                        {activeNav === navItems.COMPTE && 
                            <>
                                <div className='col-12 px-2 mb-4'>
                                    <h2 className='text-uppercase'>Informations sur le compte</h2>
                                </div>
                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='email'>{__('email')}</label>
                                        <input className='form-control' type='text' id='email' name='email' 
                                        placeholder={__('email')} value={props.useMember.email ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setEmail(e.target.value) ?? null}/>
                                    </div>
                                </div>

                                <div className='col-12 col-md-6 px-2'>
                                    <div className='form-group mb-2'>
                                        <label htmlFor='password'>{__('password')}</label>
                                        <input className='form-control' type='text' id='password' name='password' 
                                        placeholder={__('password')} value={props.useMember.password ?? ''}
                                        disabled={props.isDisabled} onChange={ e => 
                                            props.useMember.setPassword(e.target.value) ?? null}/>
                                    </div>
                                </div>
                            </>
                        }
                        <div className='col-12 px-2 mt-4 text-rigth'>
                            <button disabled={props.isDisabled ?? false} type='submit' 
                            className='mt-3 btn btn-primary'>
                                {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                            </button>
                        </div>
                    </div>
                </div>
				
            </div>
        </form>
    )
}