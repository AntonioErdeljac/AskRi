import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

class Feed extends React.Component {
  componentWillMount() {
    console.log(this.state);
  }
  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <img src="http://unmr-nl.science.uu.nl/sites/default/files/user_placeholder_man_0.jpg" height="50" width="50" className="nav-img mr-3" alt="" />
                  Riječanin <span className="text-muted">pita:</span>
                </h5>
                <p className="card-text">Kako si?</p>
                <h6 className="card-subtitle mb-2 text-muted mt-3">Prije 2 sata</h6>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">Odgovori</button>
                <button className="btn btn-danger mx-3">Ignoriraj</button>
                <i className="fa fa-star-o fa-2x  c-favorite float-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
