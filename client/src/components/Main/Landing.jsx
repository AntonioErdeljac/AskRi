import React from 'react';

const Landing = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-lg-4 offset-lg-4 offset-md-3 col-12 c-heading">
        <h1 className="mt-3 text-center">AskRi</h1>
        <p className="text-white text-center">Anonimna pitanja Rijeka</p>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <input type="email" className="form-control c-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control c-input" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary form-control">Prijava</button>
              <small id="emailHelp" className="form-text text-muted">Nemate račun?</small>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
