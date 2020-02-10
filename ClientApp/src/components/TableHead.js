import React, { Component } from 'react';
import { Table } from './Table.js';
import { InfoSideView } from './InfoSideView.js';
import Helmet from 'react-helmet';

export class TableHead extends Component {
    static displayName = Table.name;

    constructor(props) {
        super(props);

        this.state = { search: '', type: 'Any', genre: 'Any', year1: 'Any', year2: 'Any', sortBy: 'Default', selectedMedia: {} };

        this.years = Array.from(new Array(129), (val, index) => index + 1894);

        this.tableData = React.createRef();
        this.sideviewMedia = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    //move search to alphanumeric only
    handleSubmit(event) {
        event.preventDefault();
        this.queryReq = this.state.search + '&' + this.state.type + '&' + this.state.genre + '&' + this.state.year1 + ':' + this.state.year2 + '&' + this.state.sortBy;
        this.tableData.current.populateWeatherData('./weatherforecast/' + this.queryReq); 
    }

    selectedMediaCallback = (mediaData) => {
        this.sideviewMedia.current.updateMedia(mediaData);
    };

    render() {

        return (
            <React.Fragment>
            <Helmet bodyAttributes={{ style: 'background-color : #1E1F21' }} />

            <table className='table table-bordered table-striped table-hover table-dark'>
                <thead class="border border-dark" style={{ backgroundColor:"#2B3035", marginTop:"0px"}}>
                    <div class="container">
                        <div class="row" style={{ paddingTop: "10px" }}>
                            <div class="col-sm-3">
                                <h5>Search</h5>
                            </div>
                            <div class="col-sm">
                                <b>Type</b>
                            </div>
                            <div class="col-sm-2">
                                <b>Genre</b>
                            </div>
                            <div class="col-sm-3 text-center">
                                <b>Year Range </b>
                            </div>
                            <div class="col-sm">
                                <b>Sort By</b>
                            </div>
                            <div class="col-sm-1" />
                        </div>

                        <form>
                        <div class="row" style={{ paddingBottom: "10px" }}>
                            
                            <div class="col-sm-3">

                                    <input type="text" name="search" class="form-control text-light bg-dark" placeholder="Title/Actor/Director" value={this.state.search} onChange={this.handleChange}/>
                              
                            </div>

                            <div class="col-sm">

                                <select name="type" value={this.state.type} onChange={this.handleChange} class="form-control text-light bg-dark">
                                    <option value="Any" selected>Any</option>
                                    <option value="movie">Movie</option>
                                    <option value="series">Series</option>
                                </select>

                            </div>

                            <div class="col-sm-2">

                                <select name="genre" value={this.state.genre} onChange={this.handleChange} class="form-control text-light bg-dark">
                                    <option value="Any" selected>Any</option>
                                    <option value="Action">Action</option>
                                    <option value="Adult">Adult</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Animation">Animation</option>
                                    <option value="Biography">Biography</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Documentary">Documentary</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Family">Family</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Film-Noir">Film-Noir</option>
                                    <option value="Game-Show">Game-Show</option>
                                    <option value="History">History</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Music">Music</option>
                                    <option value="Musical">Musical</option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="News">News</option>
                                    <option value="Reality-TV">Reality-TV</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="Short">Short</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Talk-Show">Talk-Show</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="War">War</option>
                                    <option value="Western">Western</option>
                                </select>

                            </div>

                            <div class="col-sm-3">
                                <div class="row no-gutters">
                                    <div class="col">
                                        <select name="year1" value={this.state.year1} onChange={this.handleChange} class="form-control text-light bg-dark" style={{overflow:"scroll"}}>
                                            <option value="Any" selected>Any</option>
                                            {
                                                this.years.map((year, index) => {
                                                    return <option key={`year${index}`} value={year}>{year}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select name="year2" value={this.state.year2} onChange={this.handleChange} class="form-control text-light bg-dark">
                                            <option value="Any" selected>Any</option>
                                            {
                                                this.years.map((year, index) => {
                                                    return <option key={`year${index}`} value={year}>{year}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm">

                                <select name="sortBy" value={this.state.sortBy} onChange={this.handleChange} class="form-control text-light bg-dark">
                                    <option value="Default" selected>Popularity</option>
                                    <option value="ImdbA">IMDB Score</option>
                                    <option value="MetascoreA">MetaScore</option>
                                    <option value="A2Z">A to Z</option>
                                    <option value="Z2A">Z to A</option>
                                </select>

                            </div>

                            <div class="col-sm-1">
                                <button class="btn btn-outline-success btn-block" onClick={ this.handleSubmit } >GO!</button>
                            </div>
                            
                        </div>
                        </form>

                    </div>

                </thead>

                    <Table ref={this.tableData} selectedMedia={this.selectedMediaCallback} />

            </table>

            <div>
                <InfoSideView ref={this.sideviewMedia} />
            </div>

            </React.Fragment>
        );
    }

}