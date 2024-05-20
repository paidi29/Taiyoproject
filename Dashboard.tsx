import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGlobalData, fetchCountriesData, fetchHistoricalData } from '../api';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Dashboard: React.FC = () => {
  const { data: globalData } = useQuery(['globalData'], fetchGlobalData);
  const { data: countriesData } = useQuery(['countriesData'], fetchCountriesData);
  const { data: historicalData } = useQuery(['historicalData'], fetchHistoricalData);

  const lineData = {
    labels: historicalData ? Object.keys(historicalData.cases) : [],
    datasets: [
      {
        label: 'Cases',
        data: historicalData ? Object.values(historicalData.cases) : [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Global Data</h2>
      {globalData && (
        <div className="mb-8">
          <p>Active: {globalData.active}</p>
          <p>Recovered: {globalData.recovered}</p>
          <p>Deaths: {globalData.deaths}</p>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Line Graph</h2>
      <div className="mb-8">
        <Line data={lineData} />
      </div>
      <h2 className="text-2xl font-bold mb-4">Map</h2>
      <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '500px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {countriesData && countriesData.map((country: any) => (
          <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
            <Popup>
              <strong>{country.country}</strong><br />
              Active: {country.active}<br />
              Recovered: {country.recovered}<br />
              Deaths: {country.deaths}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Dashboard;

