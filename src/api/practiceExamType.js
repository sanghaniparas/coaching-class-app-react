import axios from 'axios';
import { type } from 'jquery';
import { BASE_URL } from './../config';

const practiceExamType = async () => {
    try {

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `${localStorage.token}`,
            },
        };

        const {
            data: { data },
        } = await axios.get(
            `${BASE_URL}/dashboard/dashboard/attempted_practice_exam_types`,
            config
        );
        return data;

    } catch (e) {
        console.log(e);
    }

}
let cancelToken

const practiceCoachingSearch = async (searchValue, examTypeIds) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `${localStorage.token}`,
            },
        };
        const body = {
            examTypeId: examTypeIds.join(','),
            searchKey: searchValue,
        };
        if (typeof cancelToken !== typeof undefined) {
            cancelToken.cancel("canceling request")
        }
        cancelToken = axios.CancelToken.source()


        const {
            data: { data },
        } = await axios.post(
            `${BASE_URL}/dashboard/dashboard/attempted_practice_coaching_search`,
            body,
            {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `${localStorage.token}`,
                },
                cancelToken: cancelToken.token
            },


        );

        return data;


    } catch (e) {
        console.log(e);
    }
}

export default {
    practiceExamType,
    practiceCoachingSearch
}

