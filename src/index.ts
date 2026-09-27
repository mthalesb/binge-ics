import { Hono } from 'hono'

const app = new Hono()

import { searchShow, getShowEpisodes } from './services/show'
import { buildCalendar } from './services/calendar'
import { ApiError, InvalidResponseError } from './errors'

app.get('/shows/:showName', async (c) => {
  const { showName } = c.req.param();

  const shows = await searchShow(showName)

  return c.json(shows)
})

app.get('/episodes/:episodeId', async(c) => {
  const { episodeId } = c.req.param();

  const episodes = await getShowEpisodes(episodeId);
  const calendar = buildCalendar(episodes)

  c.header('Content-Type', 'text/calendar; charset=utf-8')
  c.header('Content-Disposition', 'attachment; filename="calendar.ics"')
  
  return c.body(calendar)
})

app.onError((err, c) => {
  console.error(err)
  if (err instanceof ApiError || err instanceof InvalidResponseError) {
    return c.json({ error: err.message }, 502)
  }
  return c.json({ error: 'internal error' }, 500)
})

export default app