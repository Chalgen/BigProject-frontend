import { useGlobalStore } from '@/store/global';
import request from '../utils/request'

export const StudentGetPostsApi = (data: FormData) => {
    const globalStore = useGlobalStore();
    const token = globalStore.token;
    return request({
        "headers": {
            "Authorization": 'Bearer ' + token,
        },
        url: "/api/feedback",
        method: "get",
        data: data,
    })
}
export const GetPostsByIdApi = (wpage: string | number, id: string | number) => {
    const globalStore = useGlobalStore();
    const token = globalStore.token;
    return request({
        "headers": {
            "Authorization": 'Bearer ' + token,
        },
        url: `/api/feedback?page=${wpage}&acceptedByUserId=${id}`,
        method: "get",
    })
}
export const SentPostApi = (data: FormData) => {
    const globalStore = useGlobalStore();
    const token = globalStore.token;
    return request({
        "headers": {
            "Authorization": 'Bearer ' + token,
        },
        url: "/api/feedback/publish",
        method: "post",
        data: data,
    })
}
export const checkingRequestApi = (id: string | number, data: FormData) => {
    const globalStore = useGlobalStore();
    const token = globalStore.token;
    return request({
        "headers": {
            "Authorization": 'Bearer ' + token,
        },
        url: `/api/manage/feedback/${id}/process`,
        method: "post",
        data: data,
    })
}
export const FetchAttachApi = (data: FormData) => {
    const globalStore = useGlobalStore();
    const token = globalStore.token;
    return request({
        "headers": {
            "Authorization": 'Bearer ' + token,
        },
        url: "/api/user/",
        method: "post",
        data: data,
    })
}
export const updateRatingApi = (data: FormData) => {
    const globalStore = useGlobalStore();
    const token = globalStore.token;
    return request({
        "headers": {
            "Authorization": 'Bearer ' + token,
        },
        url: "/api/user/",
        method: "post",
        data: data,
    })
}
export const receiveFeedbackApi = (data: FormData) => {
    const globalStore = useGlobalStore();
    const token = globalStore.token;
    return request({
        "headers": {
            "Authorization": 'Bearer ' + token,
        },
        url: "/api/user/receive",
        method: "post",
        data: data,
    })
}
export const confirmJunkApi = (data: FormData) => {
    const globalStore = useGlobalStore();
    const token = globalStore.token;
    return request({
        "headers": {
            "Authorization": 'Bearer ' + token,
        },
        url: "/api/user/confirmJunk",
        method: "post",
        data: data,
    })
}