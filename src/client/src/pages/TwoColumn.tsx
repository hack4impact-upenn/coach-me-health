import React from 'react';
import styled from 'styled-components';
import Table, { Column, SortOption, TableOptions } from "../components/Table";

const DashboardContainer = styled.div`
    margin-left: 106px;
`

const TwoColumn: React.FC = () => {
    return (
    <DashboardContainer>
        <Title>Bokuto Kotaro's Patient Records</Title>
    <div className="columns">
        <div className="column">
            First column
            <Table options={table1Options} title="" data={testData} columns={cols}></Table>
            <Table options={table2Options} title="Scheduled Messages" data={testData2} columns={cols2}></Table>
        </div>
        <div className="column">
            Second column
        </div>
    </div>
    </DashboardContainer>
    )
}

const table1Options: TableOptions = {
    sortOptions: [],
    sortsChoiceEnabled: false
}

const table2Options: TableOptions = {
    sortOptions: [],
    sortsChoiceEnabled: false
}

const testData = new Array(5).fill(undefined).map((_, i) => ({
    Indicator: Math.random() > 0.5 ? "Jared Asch" : "Matthew Dong",
    status: "Active",
    phoneNumber: "1234567890",
    week: Math.ceil(Math.random() * 10),
    unread: 10 * i,
    added: new Date(2020, 11, 20 + i),
    coach: "Subin Lee",
    responseRate: Math.ceil(Math.random() * 100)
}));

const testData2 = new Array(2).fill(undefined).map((_, i) => ({
    message: "Happy Thanksgiving bois!",
    time: "02:00 AM KST",
    enabled: "Yes"
}));

const cols: Column[] = [
    {
        name: "Status",
        data: () => <ActiveText>Active</ActiveText>,
        key: "status"
    },
    {
        name: "Indicator",
        data: "indicator",
        key: "indicator"
    },
    {
        name: "Measure",
        data: "measure",
        key: "measure"
    },
    {
        name: "Analysis",
        data: "analysis",
        key: "analysis"
    },
    {
        name: "Time Recorded",
        data: "timeRecorded",
        key: "timeRecorded"
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

const cols2: Column[] = [
    {
        name: "Message",
        data: "message",
        key: "message"
    },
    {
        name: "Time",
        data: "time",
        key: "time"
    },
    {
        name: "Enabled",
        data: "enabled",
        key: "enabled"
    },
]

const Title = styled.p`
    position: absolute;
    left: 0%;
    right: -47.05%;
    top: 0%;
    bottom: 88.3%;

    font-family: Avenir;
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 49px;

    color: #404040;
`;

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

export default TwoColumn;