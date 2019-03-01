import React, { Component } from 'react';
import Chart from 'chart.js';


class DamageGraph extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    render() {
        return (
            <canvas ref={this.canvasRef} height={"100em"}/>
        );
    }

    componentDidMount() {
        this.addGraph(this.canvasRef.current.getContext("2d"));
    }

    addGraph(ctx) {
        const data = [];
        const distances = this.props.stats.distances;
        const damages = this.props.stats.damages;
        if (distances && damages) {
            if (distances.length === damages.length) {
                data.push({
                    x: -100,
                    y: damages[0],
                });
                for (let i = 0; i < distances.length; i++) {
                    data.push({
                        x: distances[i],
                        y: damages[i]
                    })
                }
                data.push({
                    x: 200,
                    y: damages[damages.length - 1]
                });
            } else {
                console.error("Damage and distance lengths differ!");
            }
        }
        console.log(data[0]);
        // const distances = [0];
        // for (let i = 0; i < this.props.stats.distances.length; i++) {
        //     distances.push(this.props.stats.distances[i]);
        // }
        // distances.push(150);
        //
        // const damages = [this.props.stats.damages[0]];
        // for (let i = 0; i < this.props.stats.damages.length; i++) {
        //     damages.push(this.props.stats.damages[i]);
        // }
        // damages.push(this.props.stats.damages[this.props.stats.damages.length - 1]);

        this.chart = new Chart(ctx, {
            type: 'line',

            // data: data,
            data: {
                labels: distances,
                datasets: [
                    // {
                    //     label: "",
                    //     // backgroundColor: 'white',
                    //     borderColor: 'white',
                    //     borderWidth: 1,
                    //     data: damages,
                    //     // lineTension: 0
                    // },
                    {
                        label: '',
                        borderColor: 'white',
                        borderWidth: 1,
                        data: data
                    }
                ]
            },

            options: {
                title: {
                    display: false,
                    text:'Damage'
                },
                animation: {
                    duration: 0, // general animation time
                },
                hover: {
                    animationDuration: 0, // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0, // animation duration after a resize
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 100,
                            stepSize: 20
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "damage",
                            fontColor: 'rgba(255, 255, 255, .6)'
                        },
                        type: 'linear',
                        gridLines: {
                            color: 'rgba(255, 255, 255, .1)',
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            min: 0,
                            max: 100,
                            stepSize: 10
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "meters",
                            fontColor: 'rgba(255, 255, 255, .6)'
                        },
                        type: 'linear',
                        gridLines: {
                            color: 'rgba(255, 255, 255, .1)',
                        }
                        // color: 'red'
                    }]
                },
                legend: {display: false},
                tooltips: {
                    intersect: false,
                    callbacks: {
                        // label: (item, data) => {
                        //     console.log(item);
                        //     console.log(data);
                        //     return "butt";
                        // }
                    }
                }
            }
        });
    }
}

export default DamageGraph;