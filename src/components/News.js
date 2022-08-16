
import React, { Component } from "react";
import axios from 'axios';
import _ from 'underscore';
import { Doughnut } from 'react-chartjs-2';
import { toBeInTheDOM } from "@testing-library/jest-dom/dist/matchers";
// import '.index.css';

class News extends Component {
    constructor() {
        super();
        this.state = {
            temp: null,
            carbonDioxide: null,
            methane: null,
            nitrousOxide: null,
            polarIce: null,
            news: null,
            blogs: null
        }
        this.fetchTemp=this.fetchTemp.bind(this)
        this.fetchCarbonDioxide=this.fetchCarbonDioxide.bind(this)
        this.fetchMethane=this.fetchMethane.bind(this)
        this.fetchNitrousOxide=this.fetchNitrousOxide.bind(this)
        this.fetchPolarIce=this.fetchPolarIce.bind(this)
        this.fetchNews=this.fetchNews.bind(this)
        this.fetchBlogs=this.fetchBlogs.bind(this)
    }

    fetchMethane() {
        axios('https://global-warming.org/api/methane-api').then((response) => {
            const yearlyAverages=_(response.data.methane.splice(198)).chunk(12).map(avgYear) //chunk groups months data into year's data.
            //.map does replaces each month array with the avg for the year.
            this.setState({
                methane: yearlyAverages
            });
        })
        function avgYear(year){
            let sum = 0
            for (let i=0; i < year.length; i++) {
                const month = year[i]
                sum += Number(month.average) // converts month.average from string to a number.
            }
            return sum/12
        }
    }
    
    fetchTemp() {
        axios('https://global-warming.org/api/temperature-api').then((response) => {
            // console.log(response.data.result.splice(1440));
            const yearlyAverageTemp=_(response.data.result.splice(1440)).chunk(12).map(avgTemp)
            this.setState({
                temp: yearlyAverageTemp
            });
        })
        function avgTemp(year){
            let sum = 0
            for (let i=0; i < year.length; i++) {
                const month = year[i]
                sum += (Number(month.station))
            }
            return (sum/12).toFixed(4) //method to fix decimal points after a number.
            
        }   
    }

    fetchNitrousOxide() {
        axios('https://global-warming.org/api/nitrous-oxide-api').then((response) => {
            console.log(_(response.data.nitrous).chunk(12))
            const yearlyincreasePpb=_(response.data.nitrous).chunk(12).map(avgIncrease)
            this.setState({
                nitrousOxide: yearlyincreasePpb
            });
        })
        function avgIncrease(year) {
            let sum = 0
            for (let i=0; i < year.length; i++) {
                const month = year[i]
                sum +=(Number(month.average))
            }
            return (sum/12).toFixed(2)
        }
    }

    fetchPolarIce() {
        axios('https://global-warming.org/api/arctic-api').then((response) => {
            console.log(response)
            const polarIceMelts=_(response.data.arcticData).pluck('area')
            this.setState({
                polarIce: polarIceMelts
            });
        })
        
    }
        
    fetchCarbonDioxide() {
        axios('https://global-warming.org/api/co2-api').then((response) => {
            // console.log(response)
            const yearlyCo2Emmissions=response.data.co2;
            const data = { };
            yearlyCo2Emmissions.forEach(function(day){
                const key= day.year+'-'+day.month
                if (! data[key])data[key]={total:0, days:0}
                data[key].total+=Number(day.cycle);
                data[key].days++;
                data[key].average=(data[key].total / data[key].days).toFixed(3)
            })
            console.log(data)
            this.setState({
                
                carbonDioxide: data   
            });
        });
    }
   
    fetchNews() {
        axios('<<<news API goes in here>>>').then((response) => {
            console.log(response)
            this.setState({
                news: response.data
            });
        })
    }

    fetchBlogs() {
        axios('<<databse blogs>>').then((response) => {
            console.log(response)
            this.setState({
                blogs: response.data
            });
        })
    }  
    
    componentDidMount() {
        this.fetchTemp();
        this.fetchCarbonDioxide();
        this.fetchMethane();
        this.fetchPolarIce();
        this.fetchNitrousOxide();
        // this.fetchNews();
        // this.fetchBlogs();
    }
   
    render() {
        return (this.information )
    }
    
}



export default News;