import ical, { ICalCalendarMethod } from 'ical-generator';

import { episodeSchema } from './show';

const oneHourMs = 3_600_000

export function buildCalendar(episodes: episodeSchema): string{
  const calendar = ical({ name: 'Tv shows' });

  calendar.method(ICalCalendarMethod.REQUEST);

  episodes.forEach(episode => {
    const startTime = new Date(episode.airstamp);
    const endTime = new Date(startTime.getTime() + oneHourMs);

    calendar.createEvent({
        id: episode.id,
        start: startTime,
        end: endTime,
        description: `${episode.showName} - ${episode.episode}`,
    });
  })

  return calendar.toString()
}
