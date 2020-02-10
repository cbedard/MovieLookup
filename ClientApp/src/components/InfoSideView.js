import React, { Component } from 'react';
import imdblogo from './imdbLogo.png';
import metacriticlogo from './metacriticLogo.png';
import './sideStyle.css'


export class InfoSideView extends Component {
    constructor() {
        super();

        this.state = {
            width: '0px',
            mediaObject: {}
        }
    }

    updateMedia(media) {
        this.setState({ mediaObject: media });
        this.setState({ width: '768px' });
    }

    handleClick(closedWidth) {
        this.setState({ width: closedWidth });
    }

    render() {

        return (
            <div id="mySidenav" class="sidenav" style={{ width: this.state.width }}>
                <div class="container">
                    <div class="row" style={{ paddingBottom: "15px", paddingLeft: "10px" }}>
                        <div class="float-left">
                            <button type="button" class="close btn btn-lg" aria-label="Close" onClick={this.handleClick.bind(this, '0px')}>✖
                            </button>
                        </div>
                    </div>

                    <div class="row" style={{ paddingLeft: "20px" }}>
                        <div class="col-sm-auto">
                            <img src={this.state.mediaObject.poster} alt="No Image for Title" style={{maxWidth:"500px", maxHeight:"500px", height:"auto", width:"auto"}}/>
                        </div>
                        <div class="col-sm">

                            <div class="container">
                                <div class="row" style={{ height: "80px" }}>
                                    <h4>{this.state.mediaObject.title + '  '} <small>({this.state.mediaObject.year})</small></h4>
                                    <br />
                                </div>
                                <div class="row" style={{height:"200px", fontSize:"16px"}}>
                                    <p>{this.state.mediaObject.plot}</p>
                                </div>
                                <div class="row">
                                   <p><b>Directed by: </b> {'\n' + this.state.mediaObject.director}</p>
                                </div>
                                <div class="row">
                                    <p><b>Written by: </b> {this.state.mediaObject.writer}</p>
                                </div>
                                <div class="row">
                                    <p><b>Starring: </b> {this.state.mediaObject.actors}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="row" style={{ paddingLeft: "20px", paddingTop: "30px" }}>
                        <div class="col-sm">
                            <p><b>Runtime: </b> {this.state.mediaObject.runtime}</p>
                            <p><b>Rated: </b> {this.state.mediaObject.rated}</p>
                            <p><b>Genre: </b> {this.state.mediaObject.genre}</p>
                            <p><b>Box Office: </b> {this.state.mediaObject.boxOffice}</p>
                            <p><b>Original Language: </b> {this.state.mediaObject.language}</p>
                        </div>
                        <div class="col-sm">
                            <div class="container">
                                <div class="row" style={{ paddingBottom:"10px"}}>
                                    <div class="col">
                                        <h6 class="text-center">Ratings</h6>
                                    </div>
                                </div>
                                <div class="row" style={{marginLeft:"15px"}}>
                                    <div class="col">
                                        <img src={imdblogo} alt="IMDB" height="32" style={{ paddingRight: "10px" }} />
                                        <span class="align-middle">{this.state.mediaObject.imdbRating}</span>
                                    </div>
                                    <div class="col">
                                        <img src={metacriticlogo} alt="Metascore" height="32" style={{ paddingRight: "10px" }} />
                                        <span class="align-middle">{this.state.mediaObject.metascore}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );

    }
    
}