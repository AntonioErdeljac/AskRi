import React from 'react';

const Landing = () => (
  <div className="container">
    <div className="row">
      <div className="col-6 offset-3 c-heading">
        <h1 className="mt-3 text-center">AskRi</h1>
        <p className="text-white text-center">Anonimna pitanja Rijeka</p>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email adresa</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Lozinka</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary">Prijava</button>
              <small id="emailHelp" className="form-text text-muted">Nemate račun?</small>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
