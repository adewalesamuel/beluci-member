import { Api } from './Api';

const ENDPOINT = '/message';

const create = (payload, signal) => {
    return Api.post(ENDPOINT, payload, signal)
}

export const ContactService = {
    ENDPOINT,
    create
}