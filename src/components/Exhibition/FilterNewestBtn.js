import React from "react";
import "./FilterNewesteBtn.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default function FilterNewestBtn(props) {
    return (
        <div className="filter-neweste-btn-container">
            <div id="filter-neweste-btn-card">
                <FontAwesomeIcon icon={faSort} id="filter-newest-btn-icon" onClick={props.toggleFilterItems}></FontAwesomeIcon>
            </div>
            <div className="filter-neweste-box-container" ref={props.filterItemsRef} style={{display: props.filterIsVisible ? "block" : "none"}}>
                <div id="filter-neweste-box-items">
                    <div id="filter-neweste-box-item-1" onClick={props.filterNewestClick} >
                        Nyeste
                    </div>
                    <div id="filter-neweste-box-item-2" onClick={props.filterOldestClick}>
                        Ældste
                    </div>
                    <div id="filter-neweste-box-item-3" onClick={props.filterNameClick}>
                        Navn
                    </div>
                    {/* <div id="filter-neweste-box-item-4">
                        item4
                    </div> */}
                </div>
            </div>
        </div>
    )
}