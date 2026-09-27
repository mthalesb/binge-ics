import ical, { ICalCalendarMethod } from 'ical-generator';

import { episodeSchema } from './show';

const calendar = ical({ name: 'Tv shows' });

export function buildCalendar(episodes: episodeSchema): string{
  calendar.method(ICalCalendarMethod.REQUEST);

  episodes.forEach(episode => {
    const startTime = new Date(episode.airstamp);
    const endTime = new Date();
  
    endTime.setHours(startTime.getHours() + 1);
    calendar.createEvent({
        start: startTime,
        end: endTime,
        description: `${episode.showName} - ${episode.episode}`,
    });
  })

  return calendar.toString()
}