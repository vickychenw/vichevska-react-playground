import axios from 'axios';

export class CustomerService {

    getCustomers(params) {
        return axios.get('https://www.primefaces.org/data/customers',{params: params})
                .then(res => res.data)
    }
}