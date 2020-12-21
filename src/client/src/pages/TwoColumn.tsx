import { time } from 'console';
import React from 'react';
import ImageGallery from "react-image-gallery";
import "../styles/image-gallery.css"
import styled, { createGlobalStyle } from 'styled-components';
import Table, { Column, SortOption, TableOptions } from "../components/Table";
import ScheduledMessageTable from "../components/ScheduledMessageTable";
import ResultsTable from "../components/ResultsTable";
import SearchBar from "../components/SearchBar";
import { getPatient } from '../api/patientApi';
import { useQuery } from 'react-query';
import auth from '../api/core/auth';

const ImageGalleryStyles = createGlobalStyle`
    .image-gallery {
        padding: 40px 100px; 
        background-color: white;
        margin-bottom: 30px;
        border-radius: 20px;
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 0.5);
    }

    .image-gallery-svg {
        stroke-width: 1.5px;
    }

    .image-gallery-right-nav {
        right: -90px;
    }

    .image-gallery-left-nav {
        left: -90px;
    }

    .image-gallery-left-nav, .image-gallery-right-nav {
        filter: none;
        color: #F29DA4;

        &:hover {
            filter: drop-shadow(0 0 4px #c4c4c4);
            color: #F29DA4;
        }

        &:focus {
            filter: drop-shadow(0 0 4px #c4c4c4);
            color: #F29DA4;
            outline: none;
        }
    }
`

const DashboardContainer = styled.div`
    margin-left: 20px;
`

const SearchBarContainer = styled.div`
`

const images = [
    {
      original: 'https://i.imgur.com/TjlRhlP.png',
      thumbnail: 'https://i.imgur.com/TjlRhlP.png',
    },
    {
      original: 'https://i.imgur.com/TjlRhlP.png',
      thumbnail: 'https://i.imgur.com/TjlRhlP.png',
    },
    {
      original: 'https://i.imgur.com/TjlRhlP.png',
      thumbnail: 'https://i.imgur.com/TjlRhlP.png',
    },
  ];


const TwoColumn: React.FC = () => {
    const onSearch = (query : string) => {
        alert(`You searched ${query}`);
    }

    const patientQuery = useQuery(
        ['1', { accessToken: auth.getAccessToken() }],
        getPatient,
        {
          refetchOnWindowFocus: false,
        }
      );
    return (
        <DashboardContainer>
            <ImageGalleryStyles></ImageGalleryStyles>
            <div className="columns">
                <div className="column">
                    <Title>Test Patient's Records</Title>
                    <Subtitle></Subtitle>

                    <div className = "columns"> 
                        <SearchBarContainer className = "column is-three-quarters">
                            <SearchBar placeholder = {"Search for Patient Indicator"} onSearch = {onSearch}></SearchBar>
                        </SearchBarContainer>
                        <div className = "column">
                            <ExportButton>Export to CSV</ExportButton>
                        </div>
                    </div>
                    <ImageGallery infinite = {false} items = {images} showThumbnails={false} showPlayButton={false} showFullscreenButton={false}></ImageGallery>
                    {patientQuery.isLoading && <div>Loading...</div>}
                    {patientQuery.data && <ResultsTable options={table1Options} title="" data={patientQuery.data} columns={cols}></ResultsTable>}
                    
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
    indicator: "Blood Glucose Levels",
    measure: Math.ceil(Math.random() * 200),
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
        data: "Indicator",
        key: "Indicator"
    },
    {
        name: "Measure",
        data: "Measure",
        key: "Measure"
    },
    {
        // need to create logic for the text color, possible do it down in activetext
        name: "Analysis",
        data: (row) => classifyNumeric(row.Measure) == "Green" ? <ActiveTextG>{classifyNumeric(row.Measure)}</ActiveTextG>:
                       classifyNumeric(row.Measure) == "Yellow" ? <ActiveTextY>{classifyNumeric(row.Measure)}</ActiveTextY>:
                       classifyNumeric(row.Measure) == "Red" ? <ActiveTextR>{classifyNumeric(row.Measure)}</ActiveTextR>:
                       <ActiveTextB>{classifyNumeric(row.Measure)}</ActiveTextB>,
        key: "analysis"
    },
    {
        name: "Time Recorded",
        data: "TimeRecorded",
        key: "TimeRecorded"
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

const Title = styled.h1`
    font-family: Avenir;
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 49px;

    color: #404040;
`;

const Subtitle = styled.p`
    font-family: Avenir;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;

    color: #404040;

    padding: 30px 0;
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


const ExportButton = styled.button`
    float: right;

    padding: 9px 20px;
    background-color: #F29DA4 !important;
    font-size: 13px !important;
    border-radius: 15px !important;
    color: white !important;
    border: none !important;
    font-weight: 600;

    &:hover {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
        cursor: pointer;
    }

    &:focus {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
    }
`;

const ActiveTextG = styled.p`
    color: #B4D983;
    font-weight: 800;
`
const ActiveTextY = styled.p`
    color: #fbf36f;
    font-weight: 800;
`
const ActiveTextR = styled.p`
    color: #c92c1a;
    font-weight: 800;
`
const ActiveTextB = styled.p`
    color: #1f1e1d;
    font-weight: 800;
`

function classifyNumeric(input:any) {
    var number = parseInt(input);
    if (number < 70) {
        return "Too Low";
    }
    else if (70 <= number && number <= 79) {
        return "<80";
    }
    else if (80 <= number && number <= 130) {
        return "Green";
    }
    else if (131 <= number && number <= 180) {
        return "Yellow";
    }
    else if (181 <= number && number <= 300) {
        return "Red";
    }
    else {
        return "Invalid";
    }
}

export default TwoColumn;