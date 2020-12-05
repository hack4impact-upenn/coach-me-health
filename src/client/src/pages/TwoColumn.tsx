import { time } from 'console';
import React from 'react';
import styled from 'styled-components';
import SMSTile from '../components/SMSTile';
import Table, { Column, SortOption, TableOptions } from "../components/Table";

import ScheduledMessageTable from "../components/ScheduledMessageTable";

const DashboardContainer = styled.div`
    margin-left: 106px;
`

const TwoColumn: React.FC = () => {
    return (
    <DashboardContainer>
        <Title>Bokuto Kotaro's Patient Records</Title>
    <div className="columns">
        <div className="column">
            <ExportButton>Export to CSV</ExportButton>
            <Table options={table1Options} title="" data={testData} columns={cols}></Table>
        </div>
        <div className="column">
            <SMSTile> </SMSTile>
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
    indicator: "Blood Glucose Levels",
    measure: Math.ceil(Math.random() * 1000),
    // create logic for analysis later here I guess?
    analysis: "placeholder",
    timeRecorded: "11:20AM 2020-10-30"
}));

const testData2 = new Array(2).fill(undefined).map((_, i) => ({
    message: "Happy Thanksgiving bois!",
    time: "02:00 AM KST",
    enabled: "Yes"
}));

const cols: Column[] = [
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
        // need to create logic for the text color, possible do it down in activetext
        name: "Analysis",
        data: (row) => <ActiveText>Green</ActiveText>,
        key: "analysis"
    },
    {
        name: "Time Recorded",
        data: "timeRecorded",
        key: "timeRecorded"
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
        data: (row) => row.enabled == "Yes" ? (
            <CheckBox type="checkbox" checked>
            </CheckBox>
            ) : (
                <CheckBox type="checkbox">
                </CheckBox>
                ),
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

const CheckBox = styled.input`
    width: 11.51px;
    height: 12px;
    left: 653.93px;
    top: 736px;
    font-family: Font Awesome 5 Free;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 11px;
    /* identical to box height */
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

const ExportButton = styled.button`
    width: 112px !important; 
    height: 42px !important;
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
