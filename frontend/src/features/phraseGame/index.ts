import { type } from "@testing-library/user-event/dist/types/setup/directApi"
import episodesSlice from "./episodes.slice"
import EpisodeGridPage from "./pages/EpisodeGridPage"
import { 
    TranscriptWord,
    Transcript,
    AudioVariant,
    AudioBundle,
    MediaBundle,
    Word,
    Phrase,
    EpisodeMetadata,
    EpisodeData
    } from "./types"

export type {TranscriptWord,
            Transcript,
            AudioVariant,
            AudioBundle,
            MediaBundle,
            Word,
            Phrase,
            EpisodeMetadata,
            EpisodeData}  
export { episodesSlice }
export default EpisodeGridPage
