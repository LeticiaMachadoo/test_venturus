import { Injectable } from '@angular/core';

export enum WeekDay {
  SUN, MON, TUE, WED, THU, FRI, SAT,
}

@Injectable()
export class Days {
  public daysOfWeek: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];

  public getDaysOfWeekSelected(daysOfWeek: string[]): String {
    let weekDaysStr: String = '';
    daysOfWeek.sort(this.sort());
    daysOfWeek.forEach((dia: string) => {
      weekDaysStr !== '' ? weekDaysStr = weekDaysStr + ', ' + dia : weekDaysStr = dia ;
    });

    return weekDaysStr;
  }

  public hasWeekDays(daysOfWeek: string[]): boolean {
    const DAYS_OF_WEEK = 5;

    if (daysOfWeek.length <= DAYS_OF_WEEK) {
      const filteredList = daysOfWeek.filter((dayOfWeek: string) => {
        return [WeekDay[WeekDay.MON], WeekDay[WeekDay.TUE], WeekDay[WeekDay.WED],
          WeekDay[WeekDay.THU], WeekDay[WeekDay.FRI]].indexOf(dayOfWeek.toLocaleUpperCase()) > -1;
      });

      return filteredList.length === DAYS_OF_WEEK;
    }

    return false;
  }

  public hasWeekends(daysOfWeek: string[]): boolean {
    const DAYS_OF_WEEKEND = 2;

    if (daysOfWeek.length <= DAYS_OF_WEEKEND) {
      const filteredList = daysOfWeek
        .filter((dayOfWeekend: string) => {
          return [WeekDay[WeekDay.SAT], WeekDay[WeekDay.SUN]].indexOf(dayOfWeekend.toUpperCase()) > -1;
        });

      return filteredList.length === DAYS_OF_WEEKEND;
    }

    return false;
  }

  public sort() {
    return (dayOfWeek: string, anotherDayOfWeek: string): number => {
      if (WeekDay[dayOfWeek] === WeekDay[anotherDayOfWeek]) {
        return 0;
      }

      if (WeekDay[dayOfWeek] < WeekDay[anotherDayOfWeek]) {
        return -1;
      }

      return 1;
    };
  }
}
