import { Component, input, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexFill,
  NgApexchartsModule,
  ApexYAxis,
  ApexXAxis,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
} from "ng-apexcharts";
import { lifeAreas } from 'src/app/data';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis,
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions
};


@Component({
  selector: 'app-life-wheel',
  templateUrl: './life-wheel.component.html',
  styleUrl: './life-wheel.component.scss',
  standalone: true,
  imports: [
    NgApexchartsModule
  ]
})
export class LifeWheelComponent implements OnInit {
  readonly lifeAreas = lifeAreas

  readonly config = input.required<number[]>();
  chartOptions: ChartOptions;

  ngOnInit(): void {
    const config = this.config();

    const chartLabels = this.lifeAreas.map((lifeArea) => lifeArea.name);
    const chartColors = config.map((rate) => {
      return this.setColor(rate);
    })
    const chartSeries = Array(this.lifeAreas.length).fill(null);

    chartSeries.forEach((_, idx) => {
      chartSeries[idx] = config[idx]
    })


    this.chartOptions = {
      chart: {
        type: "polarArea",
        toolbar: {
          show: true,
        },
        animations: {
          animateGradually: {
            enabled: false,
          },
        },
      },

      series: chartSeries,
      labels: chartLabels,
      fill: {
        colors: chartColors
      },

      yaxis: {
        max: 10,
      },
      xaxis: {
        labels: {
          style: {
            colors: chartColors,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (_: any, opt: any) => this.lifeAreas[opt.seriesIndex].name,
      },
      legend: { show: false },
      plotOptions: {
        radar: {
          polygons: {
            connectorColors: chartColors,
            fill: {
              colors: chartColors,
            }
          },
        },
      },
    };
  }

  setColor(rate: number): string {
    if (rate < 4) {
      return 'red'
    } else if (rate < 7) {
      return 'blue'
    } else if (rate < 10) {
      return 'green'
    }

    return 'gold'
  }

}
