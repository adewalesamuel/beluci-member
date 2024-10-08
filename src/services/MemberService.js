import { Api } from './Api';

const ENDPOINT = '/members';

const getAll = (params, signal) => {
    const query = params.query ? `&query=${params.query}` : '';
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}${query}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}

const profileUpdate = (payload, signal) => {
    return Api.put(`/profile`, payload, signal)
}

const profile = (signal) => {
    return Api.get(`/profile`, signal)
}

const destroy = (id, signal) => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const MemberService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    profile,
    profileUpdate,
    update,
    destroy
}