import React, { useState, useEffect } from 'react';
import CustomTab from '../common/CustomTab';
import { makeStyles } from '@material-ui/core/styles';
import Home from '../home/Home';
import Addnewtest from '../addnewtest/AddNewTest';
import TestGroup from '../testgroup/TestGroup';
import { RedirectToAddNewTest } from '../constants/constant';

const useStyles = makeStyles({
    root: {
        '& .underline-color > * > * > .MuiTabs-indicator': { // selected indicator
            backgroundColor: "#a3cb38"
        },
        //   width: "600px", // this is just for bit
        '& .change-colors-tab': {
            '&.MuiTab-textColorPrimary.Mui-selected': {
                color: "#a3cb38 !important",
                // backgroundColor: "yellow"
            },
            '&.MuiTab-textColorPrimary': {
                // color: "yellow",
                // backgroundColor: "green"
            },
        }
    }
})
const TabWindow = () => {
    const [currentTab, setCurrentTab] = useState(0);
    let classes = useStyles();

    const getTabComponent = (redirect, tabeName) => {
        if (redirect === RedirectToAddNewTest) {
            return <Addnewtest
                name={tabeName}
                redirect={redirect}
            />
        }
    }
    const constructDetailsTab = ({ redirect, tabeName }) => {
        let existingTab = false;
        // dynamicTabList.forEach((tab, i) => {
        //     if (tab.component.props.name && tab.component.props.name === tabeName && tab.component.props.redirect === redirect) {
        //         setCurrentTab(i); // if exists , just go to the current tab
        //         existingTab = true;
        //     }
        // })
        console.log({ existingTab })
        console.log({ dynamicTabList })
        if (!existingTab) {
            let newtab = {
                label: 'Add New Test',
                redirect: redirect,
                callbackFunction: () => { setCurrentTab(dynamicTabList.length) },
                closable: true,
                addNewTestTab: true,
                show: true,
                name: `AddNewTest-${dynamicTabList.length}`,
                value: `addNewTest-${dynamicTabList.length}`,
                className: "change-colors-tab",
                component: getTabComponent(redirect, tabeName)
            };
            setCurrentTab(dynamicTabList.length);
            setDynamicTabList([...dynamicTabList, newtab])
        }
    }
    const [dynamicTabList, setDynamicTabList] = useState([{
        label: 'Home',
        name: 'Home',
        callbackFunction: () => setCurrentTab(0),
        className: "change-colors-tab",
        closable: false,
        component: (
            <Home constructDetailsTab={constructDetailsTab} />
        )
    },
    {
        label: 'Test Group',
        name: 'TestGroup',
        callbackFunction: () => setCurrentTab(1),
        className: "change-colors-tab",
        closable: false,
        component: (
            <TestGroup constructDetailsTab={constructDetailsTab} />
        )
    }]);
    useEffect(() => { // we need to update the functions when the dynamicTabList updates
        if (dynamicTabList.length) {
            dynamicTabList[0].component = <Home constructDetailsTab={constructDetailsTab} />
            dynamicTabList[1].component = <TestGroup constructDetailsTab={constructDetailsTab} />

            dynamicTabList.forEach((tab, i) => {
                if (tab.addNewTestTab) {
                    tab.callbackFunction = () => { setCurrentTab(i) }
                    tab.component = <Addnewtest {...tab.component.props} constructDetailsTab={constructDetailsTab} />
                    // reconstruct the tab with the updated functions
                }

            })

        }
    }, [dynamicTabList])
    return (
        <div>
            <CustomTab
                className="underline-color"
                value={currentTab}
                noRerender={true}
                tabList={dynamicTabList}
                onClose={(i) => {
                    if (i === currentTab) { // since the tab gets changed to 0 upon closing, we need to keep track of the current number.
                        setCurrentTab(0);
                    }
                    setDynamicTabList(dynamicTabList.filter((tab, index) => i !== index))
                }}
            />
        </div>
    );
}

export default TabWindow;
