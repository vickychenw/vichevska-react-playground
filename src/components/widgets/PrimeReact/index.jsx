import React, { useState } from "react";
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';


import { CustomerService } from "./CustomerService";


const DataTableDemo = (props) => {
    const [customers, setCustomers] = useState([])

    React.useEffect(() => {
        
        let customerService = new CustomerService();
        //customerService.getCustomers().then(data => setCustomers(data));
        customerService.getCustomers().then(data => {
            setCustomers(data.customers)
            console.log(`In useEffect() data = ${JSON.stringify(data)}`)
        });

        console.log(`In useEffect() customers = ${JSON.stringify(customers[0])}`)
    }, [])


    const header = (
        <div className="table-header">
            Products
            <input type="button" value="Click me" />
        </div>
    );

    return (
        <DataTable value={customers} header={header}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="company" header="Company"></Column>
            <Column field="date" header="Date"></Column>
            <Column field="status" header="Status"></Column>
        </DataTable>
    );
}

export default DataTableDemo;
