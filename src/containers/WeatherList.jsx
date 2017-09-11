import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from "../components/Chart";
import GoogleMap from '../components/GoogleMap';


class WeatherList extends Component {
    constructor(props){
        super(props);

        this.state = {city: ''};
        this.renderWeather = this.renderWeather.bind(this);
    }

    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map((item) => item.main.temp);
        const pressures = cityData.list.map((item) => item.main.pressure);
        const humidities = cityData.list.map((item) => item.main.humidity);
        const { lat, lon } = cityData.city.coord;

        console.log(temps, pressures, humidities);
        return (
            <tr key={name}>
                <td> <GoogleMap lat={lat} lon={lon} /></td>
                <td>
                    <Chart data={temps} color="orange" units="K"/>
                </td>
                <td>
                    <Chart data={pressures} color="blue" units="hPa"/>
                </td>
                <td>
                    <Chart data={humidities} color="green" units="%"/>
                </td>
            </tr>
        );
    }

    render() {
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (k)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state){
    return ({weather: state.weather});
}

export default connect(mapStateToProps)(WeatherList);
