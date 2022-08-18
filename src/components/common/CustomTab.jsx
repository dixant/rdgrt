import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    root: {
        '& .no-tab-content-ds': {
          display:'none'
        },
        '& .tabs-root-ds': {
            minHeight: 'unset',
        },
        '& .tabs-indicator-ds': { // selected indicator
            backgroundColor: "#1079BF"
        },
        '& .tabs-flexContainer-ds': { // wrapper
            height: '40px',
            boxSizing: 'border-box',
            borderBottom: '1px solid #D8E1E8'
        },
        '& .custom-tab-ds': {
            minWidth: 'auto',
            minHeight: '24px',
            padding: '8px 20px 4px 16px',
            '& .tab-wrapper-ds': {
                flexDirection: 'row',
                '& > *:first-child ': {
                    margin: '0px 5px 0px 0px',
                }
            },
            '&.tab-root-ds': {
              textTransform: 'unset',
              display: "flex",
              flexDirection: "row"
            },
            '&.tab-textColorPrimary-ds.tab-selected-ds': {
                color: "#1079BF",
                backgroundColor: "#E0EBF2"
            },
            '&.tab-textColorPrimary-ds': {
                fontFamily: 'Overpass !important',
                fontWeight: 600,
                color: '#3A546B',
                backgroundColor: '#FFFFFF'
            },
            '&.tab-textColorPrimary-ds.tab-disabled-ds': {
                color: '#A9A3A1'
            },
            '&.no-show-tab': {
                display: 'none'
            },
            '& .align-items-ds': {
              display: 'flex',
              alignItems: "center",
              whiteSpace: "nowrap",
              "& .letters-tab-ds": {
                maxWidth: 200,
                overflow: "hidden",
              }
            },
            '& .close-icon-ds': {
              color: '#3A546B',
              bottom: "1.5px",
              width: 16,
              height: 16,
              position: 'relative',
              left: 7,
              '&:hover': {
                cursor: 'pointer'
              },
              "&.current-tab-ds": {
                color: "#1079BF",
              }
            }
        }
    }
})

function SingleTab(props) {
    const Icon = props.icon;
    const onClose = (e) => {
      if (props.index < props.currentTab) {
        props.setValue(props.currentTab-1)
      }

      if (props.index === props.currentTab) {
        props.setValue(0);
      }

      if (props.onClose) {
        props.onClose(props.index);
      } else {
        props.setTabList(props.tabList.filter((tab, index) => props.index !== index))
      }
    }

    return (
        <Tab key={props.index} className={`custom-tab-ds ${props.show === false && "no-show-tab"} ${props.className}`} 
          classes={{
            root: "tab-root-ds" ,
            textColorPrimary: "tab-textColorPrimary-ds",
            wrapper: "tab-wrapper-ds",
            selected: "tab-selected-ds",
            disabled: "tab-disabled-ds"
          }}
          label={
            <div className="align-items-ds">
              <div className="letters-tab-ds"> 
                {props.label}
              </div>
              { 
                props.closable &&
                <CloseIcon className={`close-icon-ds ${props.currentTab === props.index && "current-tab-ds"}`} onClick={onClose} />
              }
            </div>
          }
        disabled={props.disabled} icon={Icon ? <Icon /> : null} />
    )
}


export default React.memo(function CustomTab(props) {
    const [value, setValue] = useState(0);
    const [tabList, setTabList] = useState([]);

    let classes = useStyles();

    const handleChange = (event, newValue) => {
      if (event.target.getAttribute("class")) {
        if (!event.target.getAttribute("class").includes("close-icon-ds")) {
          setValue(newValue);

          if (tabList[newValue].callbackFunction) {
            tabList[newValue].callbackFunction(newValue);
          }  
        }
      } else {
        if (event.target.className && !String(event.target.className).includes("SVGAnimatedString")) {
          if (!event.target.getAttribute("class").includes("close-icon-ds")) {
            setValue(newValue);
  
            if (tabList[newValue].callbackFunction) {
              tabList[newValue].callbackFunction(newValue);
            }  
          }
        }
      }
    };

    useEffect(() => {
      if (props.tabList) {
        setTabList(props.tabList)
      }
    }, [props.tabList])


    useEffect(() => {
        if (props.value !== undefined) {
          setValue(props.value)
        }
    }, [props.value])
    
    return (
      <div className={`${classes.root} ${props.className}`}>
          <Tabs
              classes={{
                root: "tabs-root-ds" ,
                indicator: "tabs-indicator-ds",
                flexContainer: "tabs-flexContainer-ds"
              }}
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              variant="scrollable" // allows scrolling if past width
          >
              {tabList.map((tab, i) => {
                  tab.currentTab = value;
                  tab.index=i;
                  tab.setValue = setValue;
                  tab.tabList = tabList;
                  tab.setTabList = setTabList;
                  tab.onClose = props.onClose;
                  return SingleTab(tab)
              })}
          </Tabs>
          {
            props.noRerender ?
              tabList.map((tab, index) => {
                return (
                  <div key={index} className={`${value !== index && 'no-tab-content-ds'}`}>
                    {tab.component}
                  </div>
                )
              }) 
              : tabList[value] && tabList[value].component
          }
      </div>
    );
})