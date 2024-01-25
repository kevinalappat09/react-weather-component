import { useEffect, useState } from "react";

const WeatherCard = () => {
    const [location, setLocation] = useState("Mumbai");
    const [data, setData] = useState(null);

    const [isDay, setIsDay] = useState(0);
    const [condition, setCondition] = useState("Clear");
    const [tempC, setTempC] = useState(0);
    const [tempF, setTempF] = useState(0);
    const [precip, setPrecip] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);

    const [name, setName] = useState("Mumbai");
    const [region, setRegion] = useState("Maharashtra");
    const [country, setCountry] = useState("India");

    const [isCelsius, setIsCelsius] = useState(false);

    const changeLocation = (e) => {
        setLocation(e.target.value);
    }

    const changeTemperatureSetting = () => {
        setIsCelsius(!isCelsius);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const getData = async () => {
            

            try {
                const currentRequest = `http://api.weatherapi.com/v1/current.json?key=e1d464c01ac143efa7d110425231612&q=${location}&aqi=no`;
                const currentResponse = await fetch(currentRequest);

                if(!currentResponse.ok) {
                    throw("Failed to fetch resorce");
                }

                const data = await currentResponse.json();

                setIsDay(data.current.is_day);
                setCondition(data.current.condition.text);
                setTempC(data.current.temp_c);
                setTempF(data.current.temp_f);
                setPrecip(data.current.precip_in);
                setHumidity(data.current.humidity);
                setWind(data.current.wind_kph);
                setName(data.location.name);
                setRegion(data.location.region);
                setCountry(data.location.country);
                console.log(data);
                setData(data);
            } catch(err) {
                console.log(err);
            }
        };

        getData();
        
        return () => {
            abortController.abort();
        }

    }, [location])

    return (
        <div className={isDay===1 ? "weather-card day" : "weather-card night"}>
            <div className="location-settings">
                <div className="selector-container">
                    <select name="locations" className={isDay===1 ? "location-select day" : "location-select night"} onChange={changeLocation}>
                        <optgroup className="location-options">
                            <option value="Mumbai">Mumbai</option>
                            <option value="Paris">Paris</option>
                            <option value="London">London</option>
                            <option value="California">California</option>
                        </optgroup>
                    </select>
                </div>
                <div className="location">
                    {name}, {region}, {country}
                </div>
            </div>
            
            <div className="condition">
                <div className="condition-icon"></div>
                <div className="condition-text">{condition}</div>
            </div>
            <div className="temperature">
                {isCelsius ? tempC : tempF}
                <span className="temp-toggle" onClick={changeTemperatureSetting}>
                    {isCelsius ? " Celcius" : " Fahrenheit"}
                </span>
            </div>
            <div>{isDay} {condition} {tempC} {tempF} {precip} {humidity} {wind} {region}</div>
            
        </div>
    )
}

export default WeatherCard;