import { Component, OnInit } from '@angular/core';
import {StatisticsService} from '../../service/statistics.service';
import {Statistics} from '../../model/statistics';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  public canvas: any;
  public ctx: any;
  public labelsW: string[] = [];
  public dataCasesW: number[] = [];
  public labelsM: string[] = [];
  public dataCasesM: number[] = [];
  public labelsY: string[] = [];
  public dataCasesY: number[] = [];
  statisticWeek: Statistics[] = [];
  statisticMonth: Statistics[] = [];
  statisticYear: Statistics[] = [];
  status = false;

  constructor(private statisticService: StatisticsService) { }

  ngOnInit(): void {
    this.getStatisticsWeek();
    this.getStatisticsMonth();
    this.getStatisticsYear();
    this.createLineChartWeek();
    this.createLineChartMonth();
    this.createLineChartYear();
  }

  getStatisticsWeek() {
    this.statisticService.getStatisticsWeek().subscribe((data: Statistics[]) => {
      console.log(data);
      this.statisticWeek = data;
      for (let i = 0; i < data.length; i++) {
        this.labelsW.push(data[i].name);
        this.dataCasesW.push(data[i].quantity);
      }
    });
  }

  getStatisticsMonth() {
    this.statisticService.getStatisticsMonth().subscribe((data: Statistics[]) => {
      this.statisticMonth = data;
      for (let i = 0; i < data.length; i++) {
        this.labelsM.push(data[i].name);
        this.dataCasesM.push(data[i].quantity);
      }
    });
  }

  getStatisticsYear() {
    this.statisticService.getStatisticsYear().subscribe((data: Statistics[]) => {
      this.statisticYear = data;
      for (let i = 0; i < data.length; i++) {
        this.labelsY.push(data[i].name);
        this.dataCasesY.push(data[i].quantity);
      }
    });
  }

  private createLineChartWeek() {
    this.canvas = document.getElementById('myChartW');
    this.ctx = this.canvas.getContext('2d');

    const chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labelsW,
        datasets: [{
          label: 'Tuần',
          data: this.dataCasesW,
          backgroundColor: '#297b9a',
          borderColor: '#297b9a',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        title: {
          display: true,
          text: ''
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },

      }
    });
  }

  private createLineChartMonth() {
    this.canvas = document.getElementById('myChartM');
    this.ctx = this.canvas.getContext('2d');

    const chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labelsM,
        datasets: [{
          label: 'Tháng',
          data: this.dataCasesM,
          backgroundColor: '#3aa885',
          borderColor: '#3aa885',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        title: {
          display: true,
          text: ''
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },

      }
    });
  }

  private createLineChartYear() {
    this.canvas = document.getElementById('myChartY');
    this.ctx = this.canvas.getContext('2d');

    const chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labelsY,
        datasets: [{
          label: 'Năm',
          data: this.dataCasesY,
          backgroundColor: '#4a9217',
          borderColor: '#4a9217',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        title: {
          display: true,
          text: ''
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },

      }
    });
  }

  selectType(value: any) {
    switch (value) {
      case 'week':
        // @ts-ignore
        $('#week').show();
        // @ts-ignore
        $('#month').hide();
        // @ts-ignore
        $('#year').hide();
        break;
      case 'month':
        // @ts-ignore
        $('#week').hide();
        // @ts-ignore
        $('#month').show();
        // @ts-ignore
        $('#year').hide();
        break;
      case 'year':
        // @ts-ignore
        $('#week').hide();
        // @ts-ignore
        $('#month').hide();
        // @ts-ignore
        $('#year').show();
        break;
    }
  }
}
