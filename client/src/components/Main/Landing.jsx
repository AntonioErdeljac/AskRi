import React from 'react';

import { Input } from '../common';

const Landing = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-lg-4 offset-lg-4 offset-md-3 col-12 c-heading">
        <h1 className="mt-3 text-center">AskRi</h1>
        <p className="text-white text-center">Anonimna pitanja Rijeka</p>
        <div className="card">
          <div className="card-body">
            <form>
              <Input
                hideLabel
                type="email"
                placeholder="Vaša Email Adresa"
                name="email"
              />
              <Input
                hideLabel
                type="password"
                placeholder="Vaša Lozinka"
                name="password"
              />
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
