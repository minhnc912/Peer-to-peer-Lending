import { Select } from "antd";
import React from "react";

const dropdownSelect = (props) => {
    const { select, setSelect, month, setMonth, SelectAmount } = props;
    const { Option } = Select;
    return (
        <div className="w-100 d-flex justify-content-around">
            <div className="col-12 row mt-2">
                <div className="col-6">
                    <Select
                        className="button-select lending_select"
                        value={month}
                        onChange={(e) => setMonth(e)}
                    >
                        <Option value="">All Month</Option>
                        <Option value="1">1 months</Option>
                        <Option value="3">3 months</Option>
                        <Option value='6'>6 months</Option>
                        <Option value='12'>12 months</Option>
                    </Select>
                </div>
                <div className="col-6 mb-3">
                    <Select
                        className="button-select lending_select"
                        value={select}
                        onChange={(e) => {
                            SelectAmount(e)
                        }}
                    >
                        <Option value=''>All Amount</Option>
                        <Option value='1'>Under 10millions</Option>
                        <Option value='2'>10millions - 50millions </Option>
                        <Option value='3'>50millions - 100millions</Option>
                        <Option value='4'>Over 100millions</Option>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default dropdownSelect;
