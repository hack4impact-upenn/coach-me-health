import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Table, { Column, SortOption, TableOptions } from "../components/Table";
import SearchBar from "../components/SearchBar";

import { useQuery } from 'react-query';
import auth from '../api/core/auth';
import { fetchMe, getPatients } from '../api/userApi';

const DashboardContainer = styled.div`
    padding: 20px;
`

const PatientDashboardHeader = styled.h1`
    font-weight: 800;
    font-size: 32px;
`

const SearchBarContainer = styled.div`
    padding-top: 5px;
`

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #E5E5E5;
        padding-top: 20px !important;
    }
`

const Header = styled.div`
    margin-bottom: 20px !important;
    padding: 20px;
`

const PatientDashboard: React.FC = () => {

    const profileQuery = useQuery(
        ['fetchMe', { accessToken: auth.getAccessToken() }],
        fetchMe,
        {
            refetchOnWindowFocus: false,
        }
    );

    const patientQuery = useQuery(
        ['getPatients', { accessToken: auth.getAccessToken() }],
        getPatients,
        {
            refetchOnWindowFocus: false,
        }
    );
    
    const onSearch = (query : string) => {
        (patientQuery.data as any).filter((patient: { name: string; }) => patient.name.includes(query))
        alert(names);
    };

    const firstName = profileQuery.data ? (profileQuery.data as any).data.firstName : null;


    return (
        <DashboardContainer>
            <GlobalStyle />
            <Header className="columns is-hidden-touch">
                <div className="column is-two-fifths">
                    <PatientDashboardHeader>{firstName}'s Patient Dashboard</PatientDashboardHeader>
                </div>
                <div className="column">
                    <SearchBarContainer>
                        <SearchBar placeholder = {"Search by patient or phone number"} onSearch={ onSearch }></SearchBar>
                    </SearchBarContainer>
                </div>
            </Header>
            <div className="columns is-hidden-desktop">
                <div className="column is-two-fifths">
                    <PatientDashboardHeader>{firstName}'s Patient Dashboard</PatientDashboardHeader>
                </div>
                <div className="column">
                    <SearchBarContainer>
                        <SearchBar placeholder = {"Search by patient or phone number"} onSearch={ onSearch }></SearchBar>
                    </SearchBarContainer>
                </div>
            </div>
            {patientQuery.isLoading && <div>Loading...</div>}
            {patientQuery.data &&  <Table options={tableOptions} 
                                          title="Assigned Patients"
                                          data={patientQuery.data as any} 
                                          columns={cols}>
                                          </Table>}
        </DashboardContainer>
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
        data: "status",
        key: "status"
    },
    {
        name: "Patient Name",
        data: (row) => <React.Fragment>{row.firstName} {row.lastName} </React.Fragment>,
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
        data: "coachName",
        key: "coachName"
    },
    {
        name: "Response Rate",
        data: (row) => <React.Fragment>{row.responseRate}%</React.Fragment>,
        key: "responseRate"
    },
    {
        name: "",
        data: (row) => (
            <UnreadButton className="button" type="submit" >
                { row.unread} unread
            </UnreadButton>
        ),
        key: "unread"
    },
    {
        name: "",
        data: (row) => (
            <ViewButton className="button" type="submit" onClick={()=> window.location.href = '/patient/' + row._id} >
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