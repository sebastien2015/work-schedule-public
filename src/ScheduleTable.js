import React, { useState } from 'react';
import data from './data.json';

function ScheduleTable() {
  const [schedule, setSchedule] = useState({
    rows: data.people.map((person) => ({
      name: person,
      schedule: data.days.map(() => ({
        start: '',
        end: '',
      })),
    })),
  });

  const handleTimeChange = (personIndex, dayIndex, timeType, value) => {
    const newSchedule = { ...schedule };
    newSchedule.rows[personIndex].schedule[dayIndex][timeType] = value;
    setSchedule(newSchedule);
  };

  return (
    <div className="container">
      <h2>山城辣妹子 上野店 出勤时间登录</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {data.people.map((person, index) => (
              <th key={person} colSpan={3}>{person}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.days.map((day, dayIndex) => (
            <tr key={day}>
              <td>{day}</td>
              {data.people.map((person, personIndex) => (
                <React.Fragment key={`${person}-${dayIndex}`}>
                  <td>
                    <select
                      value={schedule.rows[personIndex].schedule[dayIndex].start}
                      onChange={(e) => handleTimeChange(personIndex, dayIndex, 'start', e.target.value)}
                    >
                      <option value="">请选择</option>
                      {[...Array(18)].map((_, index) => (
                        <option key={index} value={`${index * 30 + 600}`}>{`${Math.floor(index / 2) + 10}:${index % 2 === 0 ? '00' : '30'}`}</option>
                      ))}
                    </select>
                  </td>
                  <td>～</td>
                  <td>
                    <select
                      value={schedule.rows[personIndex].schedule[dayIndex].end}
                      onChange={(e) => handleTimeChange(personIndex, dayIndex, 'end', e.target.value)}
                    >
                      <option value="">请选择</option>
                      {[...Array(22)].map((_, index) => (
                        <option key={index} value={`${index * 30 + 720}`}>{`${Math.floor(index / 2) + 12}:${index % 2 === 0 ? '00' : '30'}`}</option>
                      ))}
                    </select>
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button>保存</button>
    </div>
  );
}

export default ScheduleTable;