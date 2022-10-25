import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    constructor() {
        console.log('constructor');
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
    }

    async componentDidMount() {
        this.props.setProgress(40);
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        this.props.setProgress(60);
        let parsedData = await data.json();
        this.props.setProgress(90);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalresults: parsedData.totalresults,
            loading: false,
        });
        this.props.setProgress(100);
    }

    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page + 1
        });
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1
        });
    }

    render() {
        console.log("render");
        return (
            <>
                <div className='container my-3'>
                    <h1 className="text-center">News monkey - News App</h1>
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        // inverse={true} //
                        hasMore={this.state.articles.length !== this.state.articles.totalresults}
                        loader={<h4>Loading...</h4>}
                    // scrollableTarget="scrollableDiv"
                    >
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} image={element.urlToImage} url={element.url} />
                                </div>
                            })}
                        </div>
                    </InfiniteScroll>
                    <div className="d-flex justify-content-between border border-primary p-2">
                        <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" class="btn btn-primary">Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / 20)} onClick={this.handleNextClick} type="button" class="btn btn-primary">Next</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News
