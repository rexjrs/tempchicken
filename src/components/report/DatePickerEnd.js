import React, { Component } from 'react';
import moment from 'moment';
const currentYear = new Date().getFullYear()-10;
export const EndFromMonth = new Date(currentYear,  moment().format('MM')-1);
const toMonth = new Date(currentYear + 20, 11);
// Component will receive date, locale and localeUtils props
export function EndYearMonthForm({ date, localeUtils, onChange }) {
  var months = [];
  for(var i = 0;i<12;i++){
    let month = i;
    if(month < 10){
      month = '0'+month;
    }
    if(month === '00'){
      month = '01';
    }
    let momentMonth = '2017-'+month+'-01';
    months[i] = moment(momentMonth).format('MMMM')
  }

  const years = [];
  for (let i = EndFromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => <option key={i} value={i}>{month}</option>)}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year, i) =>
          <option key={i} value={year}>
            {year}
          </option>
        )}
      </select>
    </form>
  );
}