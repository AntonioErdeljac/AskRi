import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchPage = (props) => {
  const { users } = props;
  if (users && users.length > 0) {
    return (
      <div>
        <div className="container mt-3">
          <div className="row mt-3">
            <div className="col-md-6 offset-md-3 col-12 mt-3">
              {users.map(user =>
                (
                  <div className="card mt-3">
                    <div className="card-body">
                      <h5 className="card-title">
                        <img src="http://unmr-nl.science.uu.nl/sites/default/files/user_placeholder_man_0.jpg" height="50" width="50" className="nav-img mr-3" alt="" />
                        {user.username} <Link to={`/${user.username}`} className="btn btn-primary float-right mt-3">Postavi pitanje</Link>
                      </h5>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!users) {
    return (
      <div className="container mt-3">
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3 col-12 mt-3 text-center">
            <h4 className="text-muted mt-3">Pretraži korisnika u navigacijskoj traci</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3 col-12 mt-3 text-center">
          <h4 className="text-muted mt-3">Nismo pronašli korisnika sa tim nazivom.</h4>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.search,
});

export default connect(mapStateToProps, null)(SearchPage);
