import { Component } from "react";
import axios from 'axios';
import _ from 'underscore';
import {
    LineChart,
    Line,
    XAxis,
    Label,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area
} from "recharts";

class Charts extends Component {
    constructor() {
        super();
        this.state = {
            temp: null,
            carbonDioxide: null,
            methane: null,
            nitrousOxide: null,
            polarIce: null,
        }
        this.fetchTemp = this.fetchTemp.bind(this)
        this.fetchCarbonDioxide = this.fetchCarbonDioxide.bind(this)
        this.fetchMethane = this.fetchMethane.bind(this)
        this.fetchNitrousOxide = this.fetchNitrousOxide.bind(this)
        this.fetchPolarIce = this.fetchPolarIce.bind(this)
    }

    fetchMethane() {
        axios('https://global-warming.org/api/methane-api').then((response) => {
            this.setState({
                methane: _(response.data.methane.splice(198)).chunk(12).map(avgYear).slice(0, 22)
            });
        })
        function avgYear(year) {
            const formatData = {
                year: null,
                average: null
            };
            formatData.year = year[0].date.slice(0, 4)
            let sum = 0;
            for (let i = 0; i < year.length; i++) {
                const month = year[i]
                sum += Number(month.average) // converts month.average from string to a number.
            }
            formatData.average = (sum / 12).toFixed(1)
            return formatData
        }
    }

    fetchTemp() {
        axios('https://global-warming.org/api/temperature-api').then((response) => {
            // console.log(response.data.result.splice(1440));
            // const yearlyAverageTemp = _(response.data.result.splice(1440)).chunk(12).map(avgTemp)
            const yearlyAverageTemp = response.data.result.splice(1440)
            this.setState({
                temp: yearlyAverageTemp
            });
        })
        // function avgTemp(year) {
        //     let sum = 0
        //     for (let i = 0; i < year.length; i++) {
        //         const month = year[i]
        //         sum += (Number(month.station))
        //     }
        //     return (sum / 12).toFixed(4) //method to fix decimal points after a number.

        // }
    }

    fetchNitrousOxide() {
        axios('https://global-warming.org/api/nitrous-oxide-api').then((response) => {
            // const yearlyincreasePpb = _(response.data.nitrous).map(format)
            const yearlyincreasePpb = response.data.nitrous;
            this.setState({
                nitrousOxide: yearlyincreasePpb
            });
        })
    }

    fetchPolarIce() {
        axios('https://global-warming.org/api/arctic-api').then((response) => {
            const formatData = response.data.arcticData;
            this.setState({
                polarIce: formatData
            });
        })

    }

    fetchCarbonDioxide() {
        axios('https://global-warming.org/api/co2-api').then((response) => {
            const yearlyCo2Emmissions = response.data.co2;
            const data = {};
            yearlyCo2Emmissions.forEach(function (day) {
                const key = day.year + '-' + day.month
                if (!data[key]) data[key] = { total: 0, days: 0 }
                data[key].total += Number(day.cycle);
                data[key].days++;
                data[key].average = (data[key].total / data[key].days).toFixed(3)
            })
            let formatData = [];
            for (const key in data) {
                const entry = {};
                entry.name = key
                entry.average = data[key].average
                formatData.push(entry)
            }
            this.setState({
                carbonDioxide: formatData
            });
        });
    }

    componentDidMount() {
        this.fetchTemp();
        this.fetchCarbonDioxide();
        this.fetchMethane();
        this.fetchPolarIce();
        this.fetchNitrousOxide();
    }

    render() {
        const { temp, carbonDioxide, methane, nitrousOxide, polarIce } = this.state
        return (
            <div>
                <LineChart width={930} height={250} data={temp}
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="year" label="Year-Month" />
                    <YAxis dataKey="station" type="number" domain={[0, 'dataMax + 5']} >
                        <Label value="temp change (Celcius)" offset={5} position="left" angle={-90} />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dot={false} dataKey="land" stroke="#82ca9d" />
                </LineChart>

                <LineChart width={930} height={250} data={methane}
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" >
                        <Label value="Year-Month" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis datakey="average" type="number" domain={['dataMin - 5', 'dataMax + 5']} >
                        <Label value="Part Per million (ppm)" offset={-5} position="insideleft" angle={-90} />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dot={false} dataKey="average" stroke="#8884d8" />
                </LineChart>

                <LineChart width={930} height={250} data={carbonDioxide}
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" >
                        <Label value="Year-Month" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis type="number" domain={['dataMin - 5', 'dataMax + 5']} >
                        <Label value="Part Per million (ppm)" offset={-5} position="insideleft" angle={-90} />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dot={false} dataKey="average" stroke="#8884d8" />
                </LineChart>

                <AreaChart width={930} height={250} data={polarIce}
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="year" />
                    <YAxis label="Million square km" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="extent" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="area" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>

                <LineChart width={930} height={250} data={nitrousOxide}
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="year" interval={10} label="Year-Month" />
                    <YAxis type="number" domain={['dataMin - 5', 'dataMax + 5']} >
                        <Label value="NO2 mole fraction(ppb)" offset={5} position="left" angle={-90} />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dot={false} dataKey="average" stroke="#82ca9d" />
                </LineChart>
            </div>
        )
    }
}

export default Charts;
