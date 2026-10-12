import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono()

import { searchShow, getShowsEpisodes } from './services/show'
import { buildCalendar } from './services/calendar'
import { AppError, BadRequestError } from './errors'

app.use(logger())
app.use(cors())

app.get('/shows/:showName', async (c) => {
  const { showName } = c.req.param();

  const shows = await searchShow(showName)

  return c.json(shows)
})

app.get('/episodes.ics', async(c) => {
  const shows = c.req.query('shows')

  if(!shows) throw new BadRequestError("Query param 'shows' is required")

  const episodes = await getShowsEpisodes(shows);
  const calendar = buildCalendar(episodes)

  c.header('Content-Type', 'text/calendar; charset=utf-8')

  return c.body(calendar)
})

app.onError((err, c) => {
  if (err instanceof AppError) {
    return c.json({ error: err.message }, err.status)
  }
  return c.json({ error: 'internal error' }, 500)
})

export default app
