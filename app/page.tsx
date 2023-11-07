'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'; //app router
import { useState, useEffect } from 'react'


import { Table,TableHeader,TableBody,TableColumn,TableRow,TableCell } from "@nextui-org/react";
import {climateDataStatic} from './constants'

import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer, BarChart, Bar, Brush } from "recharts";
import { Payload } from 'recharts/types/component/DefaultLegendContent';



export default function Home() {

const appRouter = useRouter();

const [startDate, setStartDate] = useState('2010-01-01'); //new Date()
const [endDate, setEndDate] = useState('2010-01-31'); //new Date()

const [climateData, setClimateData] = useState( climateDataStatic );
const [tempArray, setTempArray] = useState( [] );


let startDateFormatted:number = 0;
let endDateFormatted:number = 0;

const lightBodyBgColor = '#D5F5E3';
const darkBodyBgColor  = '#7DCEA0';
const [bodyBgColor, setBodyBgColor] = useState(lightBodyBgColor);

/*
const [responseData, setResponseData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const tableHeads = ['id', 'title'];

//const [API_URL] = useState('https://www.ncei.noaa.gov/cdo-web/api/v2/datasets'); //NOAA
//const [API_URL] = useState('https://get.geojs.io/v1/ip/country.json?ip=8.8.8.8');
const [API_URL] = useState('https://dummyjson.com/posts');

useEffect(() => {

fetch(API_URL, {
  method: "GET",
  //mode: 'no-cors',
  //headers: { Authorization: `Bearer ${jwt}` },
  //headers: { Authorization: `Bearer kphgfDVKnUzYGoUqzIhJAvZckRluFYKo` },
})
  .then((res) => res.json())
  .then((json) => {
    
    console.log('response posts data from dummy json');
    setResponseData(json.posts); 
    console.log(json.posts); 

    setIsLoading(false);
  })
  .catch((err) => {
    console.log(err);
  });

}, [])
*/

function updateClimateData() {

  if(startDate !== '' && endDate !== '') {

    let startDateFormatted = startDate.replace(/-/g, '') ;
    let endDateFormatted = endDate.replace(/-/g, '') ;

    setTempArray([]);

    climateDataStatic.forEach(item => {
      if( item.DATE >= startDateFormatted && item.DATE <= endDateFormatted) {
        tempArray.push( item );
      }
    })

    setClimateData(tempArray);

  }
}


const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3">
        <p className="label">{`${label} : ${payload[0].value}`}</p>        

        {payload.map((pld: Payload<ValueType, NameType>) => (
            <div key={pld.payload.TMIN + pld.payload.TMAX} className="pb-3 text-xs">
              <p>
                STATION:{" "}
                <span className="font-bold text-red-500">
                  {pld.payload.STATION}
                </span>
              </p>
              <p>
              STATION NAME:{" "}
                <span className="font-bold text-red-500">
                  {pld.payload.STATION_NAME}
                </span>
              </p>                            
              <p>
                TMAX:{" "}
                <span className="font-bold text-red-500">
                  {pld.payload.TMAX}
                </span>
              </p>
              <p>
                TMIN:{" "}
                <span className="font-bold text-blue-500">
                  {pld.payload.TMIN}
                </span>
              </p>
              <p>
                ELEVATION:{" "}
                <span className="font-bold">{pld.payload.ELEVATION}</span>
              </p>
              <p>
                LATITUDE:{" "}
                <span className="font-bold">{pld.payload.LATITUDE}</span>
              </p>
              <p>
                LONGITUDE:{" "}
                <span className="font-bold">{pld.payload.LONGITUDE}</span>
              </p>
              <p>
                LONGITUDE:{" "}
                <span className="font-bold">{pld.payload.LONGITUDE}</span>
              </p>
              <p>
                PRECIPITATION:{" "}
                <span className="font-bold">{pld.payload.PRCP}</span>
              </p>
            </div>
          ))}
        

      </div>
    );
  }

  return null;
};

/*
    if(isLoading)  <p>Loading is in progress...</p>
    if(!responseData) return <p>No data!</p>
*/

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2  sm:p-24" style={{backgroundColor:bodyBgColor}}>
    
    <div>
      <label>
        <input type="radio" id="bodyBgColorLight" name="bodyBgColor" value={lightBodyBgColor} checked={bodyBgColor === lightBodyBgColor} onChange={(e) => setBodyBgColor(e.target.value)} /> Light Mode
      </label>
      <label>
        <input type="radio" id="bodyBgColorLight" name="bodyBgColor" value={darkBodyBgColor} checked={bodyBgColor === darkBodyBgColor} onChange={(e) => setBodyBgColor(e.target.value)} /> Dark Mode
      </label>
    </div>

    <div className="grid grid-cols-4 gap-4">&nbsp;</div>

    <div className="flex flex-wrap justify-between gap-4">
      <div>
        <label>Start Date</label>
        <input className='bg-white-200 shadow-inner rounded-l p-2 flex-1' type="date" min="2010-01-01" max="2010-01-31" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder='Start Date' />
      </div>

      <div>
      <label>End Date</label>
        <input className='bg-white-200 shadow-inner rounded-l p-2 flex-1' type="date" min="2010-01-01" max="2010-01-31" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder='End Date' />    
      </div>
      <div>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>updateClimateData()}>Go</button>
      </div>
    </div>


    <div className="grid grid-cols-4 gap-4">&nbsp;</div>

    <h3>Line Chart 1</h3>
    <ResponsiveContainer width="100%" height={400}>
    <LineChart width={800} height={400} data={climateData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="DATE" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="TMAX" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="TMIN" stroke="#387908" yAxisId={1} />
    </LineChart>
    </ResponsiveContainer>


    <div className="grid grid-cols-4 gap-4">&nbsp;</div>

    <h3>Line Chart 2 (TMAX)</h3>
    <ResponsiveContainer width="100%" height={400}>
    <LineChart width={800} height={400} data={climateData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="DATE" />
      <YAxis />
      <Tooltip content={<ChartTooltip />} />
      <Legend />
      <Line type="monotone" dataKey="TMAX" stroke="#8884d8" />
    </LineChart>
    </ResponsiveContainer>

    <div className="grid grid-cols-4 gap-4">&nbsp;</div>

    <h3>Line Chart 3 (TMIN)</h3>

    <ResponsiveContainer width="100%" height={400}>
    <LineChart width={800} height={400} data={climateData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="DATE" />
      <YAxis />
      <Tooltip content={<ChartTooltip />} />
      <Legend />
      <Line type="monotone" dataKey="TMIN" stroke="#8884d8" />
    </LineChart>
    </ResponsiveContainer>
    

    <div className="grid grid-cols-4 gap-4">&nbsp;</div>
    
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <button onClick={()=>appRouter.push('/login')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
    </div>


    {/*
    <BarChart width={800} height={400} data={climateData}>
          <Bar dataKey="TMAX" fill="green" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="TMIN" />
          <YAxis />
    </BarChart>
    */}

    {/*
    <Table aria-label="POSTS TABLE">
      <TableHeader>
        {tableHeads.map((value, index) =>
          <TableColumn key={index}>{value}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {responseData.map((post) =>
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>{post.title}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    */}

    </main>
  )
}


