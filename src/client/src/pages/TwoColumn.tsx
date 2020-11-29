import { time } from 'console';
import React from 'react';
import styled from 'styled-components';
import Table, { Column, SortOption, TableOptions } from "../components/Table";

const DashboardContainer = styled.div`
    margin-left: 106px;
`

const TwoColumn: React.FC = () => {
    return (
    <DashboardContainer>
    <div className="columns">
        <div className="column">
            First column
            <Table options={table1Options} title="" data={testData} columns={cols}></Table>
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

const testData = new Array(5).fill(undefined).map((_, i) => ({
    indicator: "Blood Glucose Levels",
    measure: Math.ceil(Math.random() * 1000),
    // create logic for analysis here I guess?
    analysis: "placeholder",
    timeRecorded: "11:20AM 2020-10-30"
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