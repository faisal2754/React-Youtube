import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/searchBar'
import VideoDetail from './components/videoDetails'
import VideoList from './components/videoList'

const API_KEY = 'AIzaSyBufxbXUIZQMJfGvRULLkxNwk7jAFTqZTs'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { videos: [], selectedVideo: null }

        this.videoSearch('cat')
    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            })
        })
    }

    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 300)

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={(selectedVideo) =>
                        this.setState({ selectedVideo })
                    }
                    videos={this.state.videos}
                />
            </div>
        )
    }
}

if (typeof window !== 'undefined') {
    ReactDOM.render(<App />, document.querySelector('.container'))
}
