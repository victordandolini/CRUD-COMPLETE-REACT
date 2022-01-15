import React, { useState } from "react";

const Repositories = ({ repositories, onDelete, onNewRepo }) => {
  const [newRepo, setNewrepo] = useState(" ");
  return (
    <div className="repositories">
      <h2 className="title">Repositórios</h2>

      <ul className="list">
        {repositories.map((repository) => (
          <li className="item" key={repository._id}>
            <div className="info">
              <div className="owner">
                  {repository.name.substring(0, repository.name.indexOf("/"))}</div>
              <div className="name">
                  {repository.name.substring(repository.name.indexOf("/") + 1)}</div>
            </div>

            <button onClick={() => onDelete(repository)}>Apagar</button>
          </li>
        ))
        }
      </ul>

      <div className="new">
        <label htmlFor="new-repo">Novo Repositorio:</label>
        <input
          type="url"
          name="new-repo"
          id="new-repo"
          value={newRepo}
          onChange={(e) => setNewrepo(e.target.value)}
        ></input>
        <button onClick={() => onNewRepo(newRepo)}>Adicionar</button>
      </div>
    </div>
  );
};
export default Repositories;
