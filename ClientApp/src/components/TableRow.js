import React, { Component } from 'react';
import imdblogo from './imdbLogo.png';
import metacriticlogo from './metacriticLogo.png';

export class TableRow extends Component {

    render() {  

        return (

            <div class="media">
                <img class="mr-3" src={this.props.poster} alt="No Image for Title" height="128"></img>
                <div class="media-body">
                    <h5 class="mt-0">{this.props.title} <small>{'    (' + this.props.year + ')'}</small> </h5>
                    {this.props.plot}

                    <div class="container" style={{ paddingTop: "10px" }}>
                        <div class="row">
                            <div class="col-sm-3">
                                <span style={{ fontSize: "14px" }}><b> Directed by:</b> {this.props.director}</span>
                            </div>
                            <div class="col-sm-6">
                                <span style={{ fontSize: "14px" }}><b> Starring:</b> {this.props.actors}</span>
                            </div>
                            <div class="col-sm">

                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <img src={imdblogo} alt="IMDB" height="32" style={{ paddingRight: "10px" }} />
                                            <span class="align-middle">{this.props.imdbrating}</span>
                                        </div>
                                        <div class="col">
                                            <img src={metacriticlogo} alt="Metascore" height="32" style={{ paddingRight: "10px" }} />
                                            <span class="align-middle">{this.props.metascore}</span>
                                        </div>
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