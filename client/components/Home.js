import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

const Home = props => {
	const [weather, setWeather] = useState({})

	useEffect(() => {
		// declare the async data fetching function
		const fetchData = async () => {
			// get the data from the api
			const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=40.709351&lon=-73.829689&units=imperial&appid=c7a3e22c998d45ee2b1e6c2d9a00ad1e`);
			// convert the data to json
			const json = await data.json();
			// set state with the result
			setWeather(json);
		}

		// call the function
		fetchData()
			// make sure to catch any error
			.catch(console.error);;
	}, [])

	console.log("weather: ", weather)
	// console.log("weather.main.temp: ", weather.main.temp)
	const username = useSelector(state => state.auth.username);

	return (
		<div>
			<h3>Welcome, {username}</h3>
			<h2> {weather.main ? `the weather in ${weather.name} currenly is ${weather.main.temp} degrees` : "weather loading!"}   </h2>
		</div>
	)
}

export default Home