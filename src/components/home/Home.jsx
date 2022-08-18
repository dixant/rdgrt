import React from 'react';
import './Home.css';
import { RedirectToAddNewTest } from '../constants/constant';
import { GreenButton } from '../common/CustomButton';
import { Checkbox, FormControlLabel, Select, MenuItem } from '@material-ui/core';

const GroupNames = [
    {
        name: 'All',
        label: 'All'
    },
    {
        name: 'General',
        label: 'General'
    },
    {
        name: 'PAM',
        label: 'PAM'
    },
    {
        name: 'Issuers',
        label: 'Issuers'
    },
    {
        name: 'Type5',
        label: 'Type5'
    },
    {
        name: 'Type5',
        label: 'Type5'
    },
    {
        name: 'Type5',
        label: 'Type5'
    },
    {
        name: 'Type5',
        label: 'Type5'
    },
    {
        name: 'Type5',
        label: 'Type5'
    }
]
const Home = (props) => {
    console.log({ props })
    const handleAddNewTest = () => {
        props.constructDetailsTab({ redirect: RedirectToAddNewTest, tabeName: 'abc' });
    }
    return (
        <div>
            {/* <button onClick={handleAddNewTest}>Add New Test</button> */}
            <div className="heading-box">
                <div className="button-view">
                    <GreenButton label="Import Test Data" />
                    <GreenButton label="Export Test Data" />
                    <GreenButton label="Export Test Result" />
                    <GreenButton label="Clear Test Result" />
                    <GreenButton label="Delete" />
                </div>
                <div className="list-view">
                    <span>Group: </span>
                    <div className="list-view-box">
                        {GroupNames.map((item, index) => (
                            <div key={index}>
                                <FormControlLabel
                                    control={<Checkbox name={item.name} />}
                                    label={item.label}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="action-view">
                    <div className="top">
                        <GreenButton label="Add New Test" handleClick={handleAddNewTest} />
                    </div>
                    <div className="bottom">
                        <div>
                            <span>Queue Name: </span>
                            <Select
                                style={{ padding: '0 10px' }}
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                            // value={10}
                            // onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox name='commit'/>}
                                label='Commit'
                            />
                        </div>
                        <div>
                            <GreenButton label="Run All" />{' '}
                            <GreenButton label="Run" />{' '}
                            <GreenButton label="Refresh Result" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
