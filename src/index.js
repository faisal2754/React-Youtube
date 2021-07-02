import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'

import SearchBar from './components/searchBar'
import VideoList from './components/videoList'
import VideoDetail from './components/videoDetails'

const API_KEY = 'AIzaSyACpZUR33RYWRgJaiGZGC510rAFjLeWvBI'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { videos: [], selectedVideo: null }

        YTSearch({ key: API_KEY, term: 'cat' }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            })
        })
    }

    render() {
        return (
            <div>
                <SearchBar />
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

ReactDOM.render(<App />, document.querySelector('.container'))
