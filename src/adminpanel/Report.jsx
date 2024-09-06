import React from "react";
import "../adminpanel/Report.css";
import '../adminpanel/Header';
import Header from "../adminpanel/Header";

const Report = () => {
    return (
        <>
            <div className="page-container">
                <Header />
                <h1 className='report-h1'>REPORT</h1>
                <div className="report-content">
                    <div className="row report-p1">
                        <div className="col report-p2 p2">Uploaded Product</div>
                    </div>
                    <div className="row report-p1">
                        <div className="col-4 report-p2 p3">Name</div>
                        <div className="col-2 report-p2 p3">Price(₹)</div>
                        <div className="col-2 report-p2 p3">Date</div>
                        <div className="col-2 report-p2 p3">Country</div>
                    </div>
                    {[
                        ["Samsung Galaxy Z Fold6 5G", "1,76,000.00", "2001", "Africa"],
                        ["Samsung S21 FE 5G", "1,20,000.00", "1988", "Russia"],
                        ["Iphone 15", "85,000.00", "1997", "Israel"],
                        ["Iphone 14 pro max", " 1,20,000.00", "2017", "Russia"],
                        ["One Plus Open", "1,49,999.00", "1970", "Canada"]
                    ].map((item, index) => (
                        <div key={index} className="row report-p1">
                            <div className="col-4 report-p2 p4">{item[0]}</div>
                            <div className="col-2 report-p2 p4">{item[1]}</div>
                            <div className="col-2 report-p2 p4">{item[2]}</div>
                            <div className="col-2 report-p2 p4">{item[3]}</div>
                        </div>
                    ))}
                </div>

                <div className="report-content">
                    <div className="row report-p1">
                        <div className="col report-p2 p2">New Uploaded Product</div>
                    </div>
                    <div className="row report-p1">
                        <div className="col-4 report-p2 p3">Name</div>
                        <div className="col-2 report-p2 p3">Price(₹)</div>
                        <div className="col-2 report-p2 p3">Date</div>
                        <div className="col-2 report-p2 p3">Country</div>
                    </div>
                    {[
                        ["Iphone 14 pro Max", "1,19,997.00", "2014", "Canada"],
                        ["Motorola razr 40 Ultra", "1,19,999.00", "1868", "Russia"],
                        ["iQ00 9 Pro 5g", "80,995.00", "1970", "Africa"]
                    ].map((item, index) => (
                        <div key={index} className="row report-p1">
                            <div className="col-4 report-p2 p4">{item[0]}</div>
                            <div className="col-2 report-p2 p4">{item[1]}</div>
                            <div className="col-2 report-p2 p4">{item[2]}</div>
                            <div className="col-2 report-p2 p4">{item[3]}</div>
                        </div>
                    ))}
                </div>

                <div className="report-content">
                    <div className="row report-p1">
                        <div className="col report-p2 p2">Latest Product</div>
                    </div>
                    <div className="row report-p1">
                        <div className="col-4 report-p2 p3">Name</div>
                        <div className="col-2 report-p2 p3">Price(₹)</div>
                        <div className="col-2 report-p2 p3">Date</div>
                        <div className="col-2 report-p2 p3">Country</div>
                    </div>
                    {[
                        ["Samsung S24 Ultra 5G", "1,08,000.00", "2022", "Israel"],
                        ["One Plus 12", "1,49,999.00", "2020", "Russia"]
                    ].map((item, index) => (
                        <div key={index} className="row report-p1">
                            <div className="col-4 report-p2 p4">{item[0]}</div>
                            <div className="col-2 report-p2 p4">{item[1]}</div>
                            <div className="col-2 report-p2 p4">{item[2]}</div>
                            <div className="col-2 report-p2 p4">{item[3]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Report;