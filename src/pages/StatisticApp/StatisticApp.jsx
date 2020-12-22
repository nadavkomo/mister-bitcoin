
import React, { Component } from 'react'
import bitcoinService from '../../services/bitcoinService.js'
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesNormalBand } from 'react-sparklines';
import './StatisticApp.scss'



class StatisticApp extends Component {
    state = {
        chart1Values: '',
        chart1Name: '',
        chart1Desc: '',
        chart2Values: '',
        chart2Name: '',
        chart2Desc: '',
    }
    async componentDidMount() {
        const marketPrice = await bitcoinService.getMarketPrice()
        const tradeVolume = await bitcoinService.getTradeVolume()
        this.setState({ chart1Values: marketPrice.values, chart1Name: marketPrice.name, chart1Desc: marketPrice.desc,
            chart2Values: tradeVolume.values, chart2Name: tradeVolume.name, chart2Desc: tradeVolume.desc }
        )
    }
    render() {
        const { chart1Values, chart1Name, chart1Desc, chart2Values, chart2Name, chart2Desc } = this.state
        if(chart1Values === '' || chart2Values === '') return <h1>Loading...</h1>
        return (
            <section className="charts flex column auto-center">
                <section className="chart">
                    <h1>{chart1Name}</h1>
                    <h3>{chart1Desc}</h3>
                    <Sparklines className="chart-marketPrice" data={chart1Values} width={800} height={300}>
                        <SparklinesLine style={{ stroke: "white", fill: "white"}} />
                        <SparklinesSpots />
                        <SparklinesNormalBand style={{ fill: "white", fillOpacity: .1}} />
                    </Sparklines>
                </section>
                <section className="chart">
                    <h1>{chart2Name}</h1>
                    <h3>{chart2Desc}</h3>
                    <Sparklines className="chart-tradeVolume" data={chart2Values} width={800} height={300}>
                        <SparklinesLine color="white"/>
                    </Sparklines>
                </section>
            </section>
        )
    }
}

export default StatisticApp

