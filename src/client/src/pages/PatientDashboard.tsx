import React from 'react';
import styled from 'styled-components';
import Table, { Column, SortOption, TableOptions } from "../components/Table";

const PatientDashboard: React.FC = () => {
    return (
        <Table options={tableOptions} title="Assigned Patients" data={testData} columns={cols}></Table>
    )
}

const tableOptions: TableOptions = {
    sortOptions: [
        {
            name: "Sort by Week (Decreasing)",
            field: "week",
            default: true,
            increasing: false
        },
        {
            name: "Sort by Week (Increasing)",
            field: "week",
            default: false,
            increasing: true
        },
        {
            name: "Sort by Response Rate (Increasing)",
            field: "responseRate",
            default: false,
            increasing: true
        },
        {
            name: "Sort by Response Rate (Decreasing)",
            field: "responseRate",
            default: false,
            increasing: false
        }
    ],
    sortsChoiceEnabled: true
}

const testData = new Array(30).fill(undefined).map((_, i) => ({
    name: Math.random() > 0.5 ? "Jared Asch" : "Matthew Dong",
    status: "Active",
    phoneNumber: "1234567890",
    week: Math.ceil(Math.random() * 10),
    unread: 10 * i,
    added: new Date(2020, 11, 20 + i),
    coach: "Subin Lee",
    responseRate: Math.ceil(Math.random() * 100)
}));

const cols: Column[] = [
    {
        name: "Status",
        data: () => <ActiveText>Active</ActiveText>,
        key: "status"
    },
    {
        name: "Patient Name",
        data: "name",
        key: "name"
    },
    {
        name: "Phone Number",
        data: "phoneNumber",
        key: "phoneNumber"
    },
    {
        name: "Week",
        data: "week",
        key: "week"
    },
    {
        name: "Assigned Coach",
        data: "coach",
        key: "coach"
    },
    {
        name: "Response Rate",
        data: (row) => <React.Fragment>{row.responseRate}%</React.Fragment>,
        key: "responseRate"
    },
    {
        name: "",
        data: (row) => (
            <UnreadButton className="button" type="submit">
                { row.unread} unread
            </UnreadButton>
        ),
        key: "unread"
    },
    {
        name: "",
        data: (row) => (
            <ViewButton className="button" type="submit">
                VIEW
            </ViewButton>
        ),
        key: "view"
    }
]

const UnreadButton = styled.button`
    width: 100%;
    background-color: #FAD246 !important;
    font-size: 13px !important;
    border-radius: 15px !important;
    color: white !important;
    border: none !important;
    font-weight: 600;

    &:hover {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
    }

    &:focus {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
    }
`;

const ViewButton = styled.button`
    width: 100%;
    background-color: #F29DA4 !important;
    font-size: 13px !important;
    border-radius: 15px !important;
    color: white !important;
    border: none !important;
    font-weight: 600;

    &:hover {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
    }

    &:focus {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
    }
`;

const ActiveText = styled.p`
    color: #B4D983;
    font-weight: 800;
`

export default PatientDashboard;