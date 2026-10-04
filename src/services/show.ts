import { z } from 'zod'
import { ApiError, InvalidResponseError } from '../errors'

const url = "https://api.tvmaze.com";
const cacheTtlSeconds = 3_600;

const showSchema = z.object({
  show: z.object({
    id: z.number(),
    name: z.string(),
    premiered: z.string().nullable(),
  }),
}).transform(({show}) => ({
  id: show.id,
  name: show.name,
  premiered: show.premiered || "TBD",
}))

const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  season: z.number(),
  number: z.number(),
  airstamp: z.string(),
  _links: z.object({
    show: z.object({
      name: z.string()
    })
  })
}).transform((episode) => ({
  id: episode.id,
  showName: episode._links.show.name,
  episodeName: episode.name,
  episode: `S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0')}`,
  airstamp: episode.airstamp,
}))

const episodeResultSchema = z.array(episodeSchema)

const searchResultSchema = z.array(showSchema)

export type showSearchResult = z.infer<typeof searchResultSchema>

export type episodeSchema = z.infer<typeof episodeResultSchema>

export async function searchShow(showName: string): Promise<showSearchResult> {
  const res = await fetch(`${url}/search/shows?q=${showName}`, { cf: {cacheTtl: cacheTtlSeconds}})

  if (!res.ok) throw new ApiError(`TV API error: ${res.status}`)

  const data = await res.json()

  const shows = searchResultSchema.safeParse(data)

  if (!shows.success) throw new InvalidResponseError()

  return shows.data
}

export async function getShowsEpisodes(showIds: string) {
  const ids = showIds.split(",")
  const uniqueIds = [...new Set(ids)]

  const data = await Promise.all(uniqueIds.map(async id => {
    const res = await fetch(`${url}/shows/${id}/episodes`, { cf: { cacheTtl: cacheTtlSeconds } })

    if (!res.ok) throw new ApiError(`TV API error: ${res.status}`)

    return await res.json()
  }))

  const episodes = episodeResultSchema.safeParse(data.flat())

  if(!episodes.success) throw new InvalidResponseError()

  return episodes.data
}
