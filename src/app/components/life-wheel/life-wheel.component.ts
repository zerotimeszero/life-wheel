import { Component, input, OnInit, ViewChild } from '@angular/core';
import { LifeArea } from 'src/app/models/life-area..model';

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
  ChartComponent
} from "ng-apexcharts";

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
  private readonly lifeAreas: LifeArea[] = [
    {
      name: 'Финансы',
      description: 'Речь идет не о том, сколько у вас денег, а о том, как вы к ним относитесь. Среди миллионеров есть те, кто сильно переживает из-за денег и могут набрать низкий балл, а есть те, у кого достаточно средств, чтобы жить, и они идут по течению. Оценка 10 — это человек, который полностью спокоен по отношению к деньгам, а 1 — это человек, настолько обеспокоенный деньгами, что это создает сильный стресс и ограничивает его действия.',
    },
    {
      name: 'Личностный рост',
      description: 'Действительно успешные люди постоянно учатся и совершенствуют себя. Вы на уровне 10 — стремитесь узнать как можно больше о жизни? Вы регулярно открываете для себя новые возможности? Читаете ли вы книги, чтобы учиться и расти? Вы готовы развиваться и расширять свои границы? Тот факт, что вы читаете это, уже свидетельствует о вашем стремлении к саморазвитию, так что вы не на уровне 1 или даже 2.',
    },
    {
      name: 'Здоровье',
      description: 'Мы все воспринимаем здоровье как должное, пока оно нас не подводит. Как у вас дела со здоровьем? Заботитесь ли вы о себе? Правильно ли питаетесь? Регулярно ли занимаетесь спортом? Наличие хронической болезни не обязательно означает, что нужно ставить себе низкую оценку. Главное — делаете ли вы все возможное, чтобы улучшить или стабилизировать свое состояние.',
    },
    {
      name: 'Семья',
      description: 'Семейная жизнь очень важна. Хотя она должна быть любящей, заботливой и поддерживающей, часто это не так из-за разных причин, таких как плачущие дети, трудные подростки или постоянные споры и напряжение. Все это представляет собой серьезные вызовы и может повлиять на другие аспекты вашей жизни, такие как работа, учеба, отношения и т. д. Для вас семейная жизнь может означать как небольшую семью, так и более расширенный круг родственников. Дайте себе текущую оценку.',
    },
    {
      name: 'Отношения',
      description: 'Подумайте о своих ключевых отношениях, будь то парень/девушка, муж/жена, друг или член семьи. Как вы оцениваете эти отношения сейчас? Какими вы бы хотели их видеть?',
    },
    {
      name: 'Социальная жизнь',
      description: 'Речь может идти о качестве вашей социальной жизни, которая может быть низкой у людей с занятыми карьерами. Однако вы также можете оценить, насколько активно вы взаимодействуете с людьми. Насколько комфортно вам в социальных ситуациях? Кто-то может быть душой компании, любимым всеми и уверенным в себе, но при этом чувствительным, а кто-то избегает говорить в группах. Дайте себе оценку. Помните, что большинство, кто ставит себе 1, находятся в изоляции, поэтому этот уровень можно исключить.',
    },
    {
      name: 'Отношение',
      description: 'Отношение к жизни очень важно и может влиять на все аспекты вашей жизни. Ваш стакан наполовину полон или наполовину пуст? Вы позитивный человек, который замечает хорошие моменты и находит решения в сложных ситуациях, или вы всегда ожидаете худшего, и оно с вами случается?',
    },
    {
      name: 'Карьера',
      description: 'Как обстоят дела с вашей карьерой? Мы тратим много времени на работу, так как у вас с этим? Это вдохновляет вас? Есть ли у вас четкое представление о том, чего вы хотите достичь? Если вы не работаете, довольны ли вы тем, что знаете, чего хотите, и предпринимаете шаги к этому? Если вы на уровне 1 — чувствуете физическую тошноту перед тем, как идти на работу (и не из-за праздников), или вы на уровне 10 — готовы работать без оплаты просто потому, что любите свою работу?',
    }

  ]

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