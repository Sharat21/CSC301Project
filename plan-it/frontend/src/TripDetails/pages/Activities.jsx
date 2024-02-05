import React, { useState, useEffect } from 'react';
import axios from 'axios';

async function fetchConfirmedActivities() {
  try {
    const confirmedActivities = await database.fetchConfirmedByType('Activity');
    console.log(confirmedActivities);
  } catch (error) {
    console.error('Error fetching confirmed ideas by type: ', error);
  }
}

const Activities = () => {
  const [confirmedActivities, setConfirmedActivities] = useState([]);
  const [error, setError] = useState(null);
  const baseURL = `http://localhost:5100/api/ideas`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/confirmed-ideas/Activity`);
        setConfirmedActivities(response.data);
        console.log('Confirmed Activities: ', response.data);
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve confirmed activities.')
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="page-name">Activities</h2>
      <pre>{JSON.stringify(confirmedActivities, null, 2)}</pre>
    </div>
  );
};

export default Activities;