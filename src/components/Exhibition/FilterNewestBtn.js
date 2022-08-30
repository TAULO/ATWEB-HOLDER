import React from "react";
import "./FilterNewesteBtn.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default function FilterNewestBtn(props) {
    return (
        <div className="filter-neweste-btn-container">
            <div id="filter-neweste-btn-card">
                <FontAwesomeIcon icon={faSort} id="filter-newest-btn-icon" onClick={props.filterDateAsc}></FontAwesomeIcon>
            </div>
            <div className="filter-neweste-box-container">
                <div id="filter-neweste-box-items">
                    <div id="filter-neweste-box-item-1">
                        Nyeste
                    </div>
                    <div id="filter-neweste-box-item-2">
                        Navn
                    </div>
                    <div id="filter-neweste-box-item-3">
                        item3
                    </div>
                    <div id="filter-neweste-box-item-4">
                        item4
                    </div>
                </div>
            </div>
        </div>
    )
}